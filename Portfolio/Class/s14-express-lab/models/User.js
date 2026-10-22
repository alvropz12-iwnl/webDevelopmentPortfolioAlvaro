import mongoose from "mongoose";

const USR_ROLES = ["User", "Admin", "SuperUser"];

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        name: { type: String, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: USR_ROLES, default: "User" },
    },
    { timestamps: true, strict: true }
);

export const User = mongoose.model("User", UserSchema);
