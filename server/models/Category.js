import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'กรุณากรอกชื่อหมวดหมู่'],
        unique: true,
        maxlength: [60, 'ชื่อหมวดหมู่ต้องไม่เกิน 60 ตัวอักษร']
    }
});

export default mongoose.model('Category', categorySchema);