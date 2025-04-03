import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    album_name: {
        type: String,
        required: [true, 'กรุณากรอกชื่ออัลบั้ม'],
        maxlength: [100, 'ชื่ออัลบั้มต้องไม่เกิน 100 ตัวอักษร']
    },
    album_cover: {
        type: String,
        required: [true, 'กรุณาอัปโหลดภาพปกอัลบั้ม']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'กรุณาเลือกหมวดหมู่']
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Album', albumSchema);