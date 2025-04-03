import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";
import albumRoutes from './routes/albumRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '90mb' })); // เพิ่มขนาดรับข้อมูลสำหรับรูปภาพ

// Routes
app.use('/api/albums', albumRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));