import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/albums',
});

// สร้างอัลบั้ม
export const createAlbum = async (albumData) => {
    try {
        const response = await API.post('/', albumData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// ดึงอัลบั้มทั้งหมด
export const getAlbums = async () => {
    try {
        const response = await API.get('/');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};