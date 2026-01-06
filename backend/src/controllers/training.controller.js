import TrainingModule from "../models/TrainingModule.js";
import TrainingProgress from "../models/TrainingProgress.js";
import { uploadToS3 } from "../utils/s3Upload.js";
import mongoose from "mongoose";

/**
 * Admin creates module and uploads files
 * (Kept for future use – safe to keep)
 */
export const createModule = async (req, res) => {
  try {
    const { title, description } = req.body;
    const files = req.files || [];

    const uploadedFiles = [];

    for (const file of files) {
      const s3Result = await uploadToS3(file);

      uploadedFiles.push({
        fileId: `${Date.now()}-${file.originalname}`,
        fileName: file.originalname,
        fileUrl: s3Result.Location
      });
    }

    const module = await TrainingModule.create({
      title,
      description,
      files: uploadedFiles
    });

    res.json(module);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Module creation failed" });
  }
};

/**
 * GET all training modules
 */
export const getModules = async (req, res) => {
  try {
    const modules = await TrainingModule.find();
    res.json(modules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch modules" });
  }
};

/**
 * Listener previews a training file
 */
export const previewFile = async (req, res) => {
  try {
    const listenerId = req.user.id;
    const { moduleId, fileId } = req.body;

    if (!moduleId || !fileId) {
      return res.status(400).json({
        message: "moduleId and fileId are required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({
        message: "Invalid moduleId format"
      });
    }

    const module = await TrainingModule.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    const totalFiles = module.files.length;
    if (totalFiles === 0) {
      return res.json({ progress: 0 });
    }

    let progressDoc = await TrainingProgress.findOne({
      listenerId,
      moduleId
    });

    // First preview
    if (!progressDoc) {
      progressDoc = await TrainingProgress.create({
        listenerId,
        moduleId,
        previewedFiles: [fileId],
        progress: Math.round((1 / totalFiles) * 100)
      });
    }
    // Same file opened again
    else if (progressDoc.previewedFiles.includes(fileId)) {
      return res.json({
        progress: progressDoc.progress,
        message: "File already previewed"
      });
    }
    // New file previewed
    else {
      progressDoc.previewedFiles.push(fileId);
      progressDoc.progress = Math.round(
        (progressDoc.previewedFiles.length / totalFiles) * 100
      );
      await progressDoc.save();
    }

    res.json({
      progress: progressDoc.progress,
      totalFiles,
      previewed: progressDoc.previewedFiles.length
    });
  } catch (err) {
    console.error("Preview error:", err);
    res.status(500).json({ message: "Preview update failed" });
  }
};

/**
 * Get listener progress for a module
 */
export const getProgress = async (req, res) => {
  try {
    const listenerId = req.user.id;
    const { moduleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ message: "Invalid moduleId format" });
    }

    const progressDoc = await TrainingProgress.findOne({
      listenerId,
      moduleId
    });

    res.json({
      progress: progressDoc ? progressDoc.progress : 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch progress" });
  }
};
