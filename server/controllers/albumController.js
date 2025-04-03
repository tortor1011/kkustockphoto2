import Album from '../models/Album.js';

// สร้างอัลบั้มใหม่
export const createAlbum = async (req, res) => {
    try {
        const { album_name, album_cover, category } = req.body;

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!album_name || !album_cover || !category) {
            return res.status(400).json({ message: 'ข้อมูลไม่ครบถ้วน' });
        }

        const newAlbum = new Album({ album_name, album_cover, category });
        await newAlbum.save();

        res.status(201).json({ message: 'สร้างอัลบั้มสำเร็จ', album: newAlbum });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ดึงอัลบั้มทั้งหมด
export const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find()
            .populate('category', 'name')
            .sort({ created_at: -1 });
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};