import { User } from "../models/User.js";
import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export const createUser = async ({ username, name, email, password }) => {
    const salt = randomBytes(16).toString("hex");
    const passwordHash = (await scrypt(password, salt, 64)).toString("hex");

    return User.create({
        username,
        name,
        email,
        password: `scrypt:${salt}:${passwordHash}`
    });
};

export const findUser = async (username) => {
    return User.findOne({ username });
};

export const findUsers = async (name) => {
    return User.find({ name }).sort({ name: 1 });
};
