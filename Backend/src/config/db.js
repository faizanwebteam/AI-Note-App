// db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected");
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log("✅ MongoDB Disconnected");
};
