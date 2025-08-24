import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function fetchNotifications(userId, opts = {}) {
  const params = new URLSearchParams();
  if (opts.status) params.set('status', opts.status);
  if (opts.after) params.set('after', opts.after);
  const qs = params.toString();
  const url = `${API_BASE}/notifications/${userId}${qs ? `?${qs}` : ''}`;
  const { data } = await axios.get(url);
  return data;
}


export const postEvent = async (event) => {
  return axios.post(`${API_BASE}/events`, event, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};


export async function markRead(notificationId) {
  const { data } = await axios.patch(`${API_BASE}/notifications/${notificationId}/read`);
  return data;
}
