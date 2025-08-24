import { useState, useEffect } from 'react';
import NotificationList from './components/NotificationList';
import EventTrigger from './components/EventTrigger';
import { fetchNotifications as apiFetchNotifications } from './api';

export default function App() {
  const [targetUserId, setTargetUserId] = useState('66c1234567890abcdef0123');
  const [sourceUserId, setSourceUserId] = useState('66cabcdef01234567890abcd');
  const [notifications, setNotifications] = useState([]);

  // function to refresh notifications
  const fetchNotifications = async () => {
    try {
      const data = await apiFetchNotifications(targetUserId);
      setNotifications(data);
    } catch (err) {
      console.error("❌ Failed to fetch notifications", err);
    }
  };

  // load on mount and when target user changes
  useEffect(() => {
    fetchNotifications();
  }, [targetUserId]);

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: 16 }}>
      <h1>Insyd Notifications (POC)</h1>
      <p>Polling-based in-app notifications (no auth). Use the simulator to generate events and see notifications arrive.</p>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <EventTrigger
            mockSourceUserId={sourceUserId}
            targetUserId={targetUserId}
            fetchNotifications={fetchNotifications}  // ✅ pass callback
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 8, marginBottom: 16 }}>
            <h3>Mock IDs</h3>
            <div>
              <label>Target (recipient) userId: </label>
              <input value={targetUserId} onChange={(e) => setTargetUserId(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label>Source (actor) userId: </label>
              <input value={sourceUserId} onChange={(e) => setSourceUserId(e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>
          <NotificationList notifications={notifications} /> {/* ✅ from state */}
        </div>
      </div>
    </div>
  );
}
