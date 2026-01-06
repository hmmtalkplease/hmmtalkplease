import { s3 } from "../config/s3.js";

export const uploadToS3 = async (file) => {
  return s3.upload({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `training/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype
  }).promise();
};
