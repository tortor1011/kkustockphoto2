import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Get default role
export const getDefaultRole = async (req, res) => {
    try {
        const role = await Role.findOne({ role: 'user' });
        if (!role) {
            return res.status(404).json({ message: "Default role not found" });
        }
        res.json({ roleId: role._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Register
export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role, faculty } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ firstname, lastname, email, password: hashedPassword, role, faculty });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate("role");
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, user: { firstname: user.firstname, lastname: user.lastname, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
