import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

app.use(express.json());

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/kkustockphoto', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// สร้าง Schema สำหรับอัลบั้ม
const AlbumSchema = new mongoose.Schema({
    album_name: String,
    album_cover: {
        data: Buffer,
        contentType: String
    },
    category: [String],
    created_at: { type: Date, default: Date.now }
});

// สร้าง Schema สำหรับรูปภาพ
const ImageSchema = new mongoose.Schema({
    title: String,
    thumbnail: {
        data: Buffer,
        contentType: String
    },
    fullsize: {
        data: Buffer,
        contentType: String
    },
    photographer: String,
    tags: [String],
    album_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    uploaded_at: { type: Date, default: Date.now }
});

const Album = mongoose.model('Album', AlbumSchema);
const Image = mongoose.model('Image', ImageSchema);

// สร้าง API เพื่อดึงอัลบั้มล่าสุด 1 อัลบั้มและอัลบั้มต่อไปอีก 4 อัลบั้ม
app.get('/albums/latest-with-images', async (req, res) => {
    try {
        const latestAlbum = await Album.findOne().sort({ created_at: -1 });

        if (!latestAlbum) {
            return res.status(404).json({ error: 'No albums found' });
        }

        // นับจำนวนรูปภาพทั้งหมดในอัลบั้มล่าสุด
        const totalImagesInLatestAlbum = await Image.countDocuments({ album_id: latestAlbum._id });

        // ดึงอัลบั้มอื่นๆ ที่ไม่ใช่ล่าสุด พร้อมคำนวณจำนวนรูปภาพ
        const nextAlbums = await Album.aggregate([
            { $match: { _id: { $ne: latestAlbum._id } } },
            { $lookup: { from: 'images', localField: '_id', foreignField: 'album_id', as: 'images' } },
            { $addFields: { image_count: { $size: '$images' } } },
            { $project: { images: 0 } }, // ไม่ต้องคืนค่ารูปภาพ
            { $sort: { created_at: -1 } },
            { $limit: 4 }
        ]);

        // ดึงรูปภาพตัวอย่างจากอัลบั้มล่าสุด (แค่ 5 รูปสำหรับ preview)
        const imagesFromLatestAlbum = await Image.find({ album_id: latestAlbum._id }).limit(5);

        // แปลง `album_cover` เป็น Base64 และเพิ่มข้อมูล `total_images`
        const latestAlbumData = {
            ...latestAlbum.toObject(),
            total_images: totalImagesInLatestAlbum, // จำนวนรูปทั้งหมดในอัลบั้มล่าสุด
            album_cover: latestAlbum.album_cover
                ? `data:${latestAlbum.album_cover.contentType};base64,${latestAlbum.album_cover.data.toString('base64')}`
                : null
        };

        // แปลง `album_cover` และ `image_count` ของอัลบั้มอื่นๆ
        const nextAlbumsData = nextAlbums.map(album => ({
            ...album,
            album_cover: album.album_cover
                ? `data:${album.album_cover.contentType};base64,${album.album_cover.data.toString('base64')}`
                : null
        }));

        // แปลงรูปภาพของอัลบั้มล่าสุดเป็น Base64
        const imagesBase64 = imagesFromLatestAlbum.map(image => ({
            ...image.toObject(),
            thumbnail: image.thumbnail?.data
                ? `data:${image.thumbnail.contentType};base64,${image.thumbnail.data.toString('base64')}`
                : null,
            fullsize: image.fullsize?.data
                ? `data:${image.fullsize.contentType};base64,${image.fullsize.data.toString('base64')}`
                : null
        }));


        res.json({
            latestAlbum: latestAlbumData,
            imagesFromLatestAlbum: imagesBase64,
            nextAlbums: nextAlbumsData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// API ดึงรูปภาพขนาดเต็มจาก ID
app.get('/image/:id/fullsize', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) return res.status(404).send('Image not found');

        res.json({
            image: image.fullsize?.data
                ? `data:${image.fullsize.contentType};base64,${image.fullsize.data.toString('base64')}`
                : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching image');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
