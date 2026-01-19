import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
  listenerId: {
    type: String,
    required: true
  },

  fileName: String,
  fileUrl: String, // S3 URL

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Certificate", CertificateSchema);
