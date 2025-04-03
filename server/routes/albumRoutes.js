import express from 'express';
import { createAlbum, getAlbums } from '../controllers/albumController.js';

const router = express.Router();

// สร้างอัลบั้ม
router.post('/', createAlbum);
// ดึงอัลบั้มทั้งหมด
router.get('/', getAlbums);

export default router;