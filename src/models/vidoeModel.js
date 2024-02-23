import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    filename: { type: String, required: true },
    s3Key: { type: String, required: true }, // The key (path) where the video is stored in S3
    s3Bucket: { type: String, required: true }, // The name of the S3 bucket where the video is stored
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
  });

const Video = mongoose.models.videos || mongoose.model("videos", videoSchema);