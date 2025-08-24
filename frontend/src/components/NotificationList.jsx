import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationList = ({ notifications }) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div>
        <h3>Notifications</h3>
        <p>No notifications</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((n) => (
          <li key={n._id}>
            <strong>{n.type?.toUpperCase()}</strong>: {n.title} - {n.message}{" "}
            <em>({n.read ? "Read" : "Unread"})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
