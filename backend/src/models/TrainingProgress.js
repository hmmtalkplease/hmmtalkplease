import mongoose from "mongoose";

const trainingProgressSchema = new mongoose.Schema({
  listenerId: {
    type: String,
    required: true
  },
  moduleId: {
    type: String,
    required: true
  },
  previewedFiles: {
    type: [String],
    default: []       
  },
  progress: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("TrainingProgress", trainingProgressSchema);
