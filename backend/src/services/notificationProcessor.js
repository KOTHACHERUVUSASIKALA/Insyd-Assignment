import Notification from "../models/Notification.js";
import { dequeue, size } from "../queue/memoryQueue.js";

function buildContent(evt) {
  switch (evt.type) {
    case "like":
      return { title: "New Like", message: `${evt.senderId} liked your post` };
    case "comment":
      return { title: "New Comment", message: `${evt.senderId} commented: ${evt.comment}` };
    case "follow":
      return { title: "New Follower", message: `${evt.senderId} started following you` };
    case "post":
      return { title: "New Post", message: `${evt.senderId} published: ${evt.postTitle}` };
    default:
      return { title: "New Activity", message: evt.message };
  }
}

export function startProcessor() {
  const INTERVAL_MS = 500;
  setInterval(async () => {
    try {
      if (size() === 0) return;
      const evt = dequeue();
      if (!evt) return;

      const { title, message } = buildContent(evt);

      await Notification.create({
        senderId: evt.senderId,
        receiverId: evt.receiverId,
        type: evt.type,
        title,
        message,
        postId: evt.postId,
        comment: evt.comment,
        postTitle: evt.postTitle,
      });

      console.log("✅ Notification saved for", evt.receiverId);
    } catch (e) {
      console.error("Processor error:", e);
    }
  }, INTERVAL_MS);
}
