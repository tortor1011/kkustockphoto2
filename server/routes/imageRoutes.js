import express from 'express';
import { uploadImage } from '../controllers/imageController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, uploadImage);

export default router;