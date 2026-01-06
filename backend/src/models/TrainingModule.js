import mongoose from "mongoose";

const TrainingModuleSchema = new mongoose.Schema({
  title: String,
  description: String,

  // Admin uploaded text/pdf files
  files: [
    {
      fileId: String,
      fileName: String,
      fileUrl: String // S3 URL
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("TrainingModule", TrainingModuleSchema);
