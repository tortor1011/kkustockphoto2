import Category from '../models/Category.js';
import Album from '../models/Album.js';

// สร้างหมวดหมู่ใหม่
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ดึงทั้งหมด
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// อัปเดต
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ลบ
export const deleteCategory = async (req, res) => {
    try {
        const albumsUsingCategory = await Album.exists({ category: req.params.id });
        if (albumsUsingCategory) {
            return res.status(400).json({ message: 'ไม่สามารถลบได้เนื่องจากมีอัลบั้มใช้งานอยู่' });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'ลบหมวดหมู่สำเร็จ' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};