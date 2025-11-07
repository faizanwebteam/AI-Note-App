import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

// Use (req, res) instead of (c)
export const registerUser = async (req, res) => {
  try {
    // Get body from req.body
    const body = req.body;
    const data = registerSchema.parse(body);

    const existingUser = await User.findOne({ email: data.email });
    // Use res.status().json()
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Use res.json()
    return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    // Use res.status().json()
    return res.status(400).json({ error: error.message });
  }
};

// Use (req, res) instead of (c)
export const loginUser = async (req, res) => {
  try {
    // Get body from req.body
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // Use res.status().json()
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Use res.json()
    return res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    // Use res.status().json()
    return res.status(500).json({ error: "Server error" });
  }
};