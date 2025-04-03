import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from '../models/Role.js';

dotenv.config();

const createDefaultRole = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if default role exists
        const existingRole = await Role.findOne({ role: 'user' });
        if (existingRole) {
            console.log('Default role already exists');
            process.exit(0);
        }

        // Create default role
        const defaultRole = new Role({
            role: 'user',
            description: 'Regular user',
            tier: 1
        });

        await defaultRole.save();
        console.log('Default role created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createDefaultRole(); 