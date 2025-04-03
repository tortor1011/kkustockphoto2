import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'กรุณากรอกชื่อภาพ']
    },
    thumbnail: {
        type: String,
        required: true
    },
    fullsize: {
        type: String,
        required: true
    },
    photographer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    tags: {
        type: [String],
        validate: {
            validator: tags => tags.length <= 5,
            message: 'ไม่สามารถเพิ่มแท็กเกิน 5 ตัว'
        }
    },
    album_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    downloads: {
        type: Number,
        default: 0
    },
    uploaded_at: {
        type: Date,
        default: Date.now
    },
    date_taken: Date
});

export default mongoose.model('Image', imageSchema);