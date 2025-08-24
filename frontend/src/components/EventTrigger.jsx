import { useState } from "react";
import { postEvent } from "../api";

export default function EventTrigger({ mockSourceUserId, targetUserId, fetchNotifications }) {
  const [type, setType] = useState("like");
  const [sourceUser, setSourceUser] = useState("Aisha");
  const [sourceUserId, setSourceUserId] = useState(mockSourceUserId);
  const [postId, setPostId] = useState("demo-post-1");
  const [comment, setComment] = useState("Great work!");
  const [postTitle, setPostTitle] = useState("A New Facade Study");
  const [loading, setLoading] = useState(false);

  const trigger = async () => {
    if (!sourceUserId || !targetUserId) {
      alert("⚠️ Please provide both source and target user IDs.");
      return;
    }

    setLoading(true);
    try {
      await postEvent({
        senderId: sourceUserId,
        receiverId: targetUserId,
        type,
        message: `New ${type} from ${sourceUser}`,
        postId,
        comment: type === "comment" ? comment : undefined,
        postTitle: type === "post" ? postTitle : undefined,
      });

      alert("✅ Event sent successfully!");
      if (fetchNotifications) fetchNotifications(); // ✅ refresh
    } catch (err) {
      console.error("❌ Failed to send event", err);
      alert("Failed to send event. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Simulate Event</h3>

      <label>Event Type: </label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="like">Like</option>
        <option value="comment">Comment</option>
        <option value="follow">Follow</option>
        <option value="post">Post</option>
      </select>

      <div>
        <input value={sourceUser} onChange={(e) => setSourceUser(e.target.value)} placeholder="Source Username" />
        <input value={sourceUserId} onChange={(e) => setSourceUserId(e.target.value)} placeholder="Source User ID" />
        <input value={targetUserId} readOnly placeholder="Target User ID" />
        <input value={postId} onChange={(e) => setPostId(e.target.value)} placeholder="Post ID" />

        {type === "comment" && (
          <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment Text" />
        )}
        {type === "post" && (
          <input value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="Post Title" />
        )}
      </div>

      <button onClick={trigger} disabled={loading}>
        {loading ? "Sending..." : "Trigger Event"}
      </button>
    </div>
  );
}
