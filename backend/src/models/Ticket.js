import mongoose from "mongoose";

export default mongoose.model("Ticket", new mongoose.Schema({
  userId: String,
  message: String,
  status: { type: String, default: "OPEN" }
}));
