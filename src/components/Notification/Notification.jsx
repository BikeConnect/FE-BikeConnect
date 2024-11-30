import React, { useEffect, useState } from "react";
import "./Notification.css";
import api from "../../api/api";

const Notification = ({ show, onClose }) => {
  const [sortedNotifications, setSortedNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchNotifications();
    }
  }, [show]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get("/notifications");
      if (response.data && response.data.metadata) {
        const sortedNotifications = response.data.metadata.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sortedNotifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sorted = notifications
      .slice()
      .sort((a, b) => new Date(b.time) - new Date(a.time));
    setSortedNotifications(sorted);
  }, [notifications]);

  const markAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/${notificationId}/mark-read`);
      // Update local state
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification._id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (!show) return null;

  return (
    <div
      className="notification-modal"
      onMouseEnter={() => show}
        onMouseLeave={onClose}
    >
      <div className="notification-header">
        <h2 className="notification-title">Thông báo</h2>
      </div>
      <div className="notification-content">
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((notification, index) => (
            <div
              key={index}
              className={`notification-item ${
                notification.isRead ? "read" : "unread"
              }`}
              onClick={() => !notification.isRead && markAsRead(index)}
            >
              <img
                src={notification.imageUrl}
                alt="avatar"
                className="notification-avatar"
              />
              <div className="notification-details">
                <div className="notification-name">{notification.name}</div>
                <div className="notification-text">{notification.content}</div>
                <div className="notification-time">{notification.time}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="notification-empty">Không có thông báo nào</div>
        )}
      </div>
    </div>
  );
};

export default Notification;
