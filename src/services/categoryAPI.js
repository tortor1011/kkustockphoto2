import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/categories',
});

export const fetchCategories = () => API.get('/');
export const createCategory = (name) => API.post('/', { name });
export const updateCategory = (id, name) => API.put(`/${id}`, { name });
export const deleteCategory = (id) => API.delete(`/${id}`);