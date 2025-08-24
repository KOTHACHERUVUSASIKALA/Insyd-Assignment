import express from "express";
import { enqueue } from "../queue/memoryQueue.js";

const router = express.Router();

// ✅ enqueue event instead of saving directly
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, type, message, postId, comment, postTitle } = req.body;

    if (!senderId || !receiverId || !type || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // enqueue event for processor
    enqueue({ senderId, receiverId, type, message, postId, comment, postTitle });

    console.log("✅ Event enqueued:", { senderId, receiverId, type });
    res.status(202).json({ success: true, queued: true });
  } catch (err) {
    console.error("❌ Error enqueuing event:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
