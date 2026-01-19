import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error:", err.message);
  }
};
