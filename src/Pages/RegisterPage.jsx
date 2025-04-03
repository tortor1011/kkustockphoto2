import { useState, useEffect } from "react";
import { register, getDefaultRole } from "../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "",
        faculty: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDefaultRole = async () => {
            try {
                const roleId = await getDefaultRole();
                setFormData(prev => ({ ...prev, role: roleId }));
            } catch (err) {
                setError("Failed to load registration data. Please try again later.");
            }
        };
        fetchDefaultRole();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    name="faculty"
                    placeholder="Faculty"
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
