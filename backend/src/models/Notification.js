import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  type: { type: String, enum: ["like", "comment", "follow", "post"], required: true },
  title: { type: String }, // ✅ added for processor
  message: { type: String, required: true },
  postId: { type: String },
  comment: { type: String },
  postTitle: { type: String },
  read: { type: Boolean, default: false }, // ✅ added read flag
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", notificationSchema);
