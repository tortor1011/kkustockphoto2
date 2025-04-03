import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    tier: { type: Number, required: true }
});

export default mongoose.model("Role", RoleSchema);
