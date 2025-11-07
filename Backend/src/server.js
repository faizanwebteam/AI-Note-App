import 'dotenv/config'; // Load environment variables first

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { swaggerDocs } from "./swagger/swaggerConfig.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Swagger Docs
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));