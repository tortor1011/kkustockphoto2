import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const getDefaultRole = async () => {
    const response = await axios.get(`${API_URL}/roles/default`);
    return response.data.roleId;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};
