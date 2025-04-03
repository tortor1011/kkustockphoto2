import Image from '../models/Image.js';
import sharp from 'sharp'; // สำหรับปรับขนาดรูปภาพ
import exif from 'exif-reader'; // อ่านข้อมูล EXIF

export const uploadImage = async (req, res) => {
    try {
        const { album_id, tags, title } = req.body;
        const fullsizeImage = req.body.image; // Base64 string
        const user = req.user; // จากระบบ Authentication

        // อ่านข้อมูล EXIF
        const exifData = await extractExif(fullsizeImage);

        // สร้าง thumbnail
        const thumbnail = await generateThumbnail(fullsizeImage);

        const newImage = new Image({
            title,
            fullsize: fullsizeImage,
            thumbnail,
            photographer: user._id,
            tags: tags.split(',').slice(0, 5),
            album_id,
            date_taken: exifData?.exif?.DateTimeOriginal || new Date()
        });

        await newImage.save();
        res.status(201).json(newImage);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ฟังก์ชันช่วยเหลือ
const generateThumbnail = async (base64Image) => {
    const buffer = Buffer.from(base64Image.split(',')[1], 'base64');
    const resized = await sharp(buffer)
        .resize(700)
        .jpeg({ quality: 80 })
        .toBuffer();
    return `data:image/jpeg;base64,${resized.toString('base64')}`;
};

const extractExif = async (base64Image) => {
    try {
        const buffer = Buffer.from(base64Image.split(',')[1], 'base64');
        const { exif } = await sharp(buffer).metadata();
        return exif ? exif(exif) : null;
    } catch (error) {
        return null;
    }
};