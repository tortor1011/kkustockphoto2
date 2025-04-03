import { createContext, useState, useEffect } from "react";
import { login } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setUser(storedUser);
        }
    }, []);

    const handleLogin = async (email, password) => {
        try {
            setError(null);
            const data = await login(email, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
            return true;
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
            return false;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, error, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
