import Certificate from "../models/Certificate.js";
import { uploadToS3 } from "../utils/s3Upload.js";

/**
 * POST /api/listener/certificates
 * Upload listener certificate (no approval flow)
 */
export const uploadCertificate = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const listenerId = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const s3Result = await uploadToS3(file);

    const certificate = await Certificate.create({
      listenerId,
      fileName: file.originalname,
      fileUrl: s3Result.Location
    });

    res.json(certificate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Certificate upload failed" });
  }
};

/**
 * GET /api/listener/certificates
 * Fetch listener certificates
 */
export const getCertificates = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const listenerId = req.user.id;

    const certificates = await Certificate.find({ listenerId });
    res.json(certificates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch certificates" });
  }
};
