import React, { useEffect, useState } from "react";
import "./Notification.css";
import api from "../../api/api";
import ava from "../../assets/images/avatar_user1.jpg"; // Import default avatar

const Notification = ({ show, onClose }) => {
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
      const response = await api.get("/all-notifications");

      console.log("API Response:", response.data);

      if (response.data?.metadata?.notifications) {
        const sortedNotifications = response.data.metadata.notifications.sort(
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

  const markAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/${notificationId}/mark-read`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
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
    <div className="notification-modal" onMouseLeave={onClose}>
      <div className="notification-header">
        <h2 className="notification-title">Thông báo</h2>
      </div>
      <div className="notification-content">
        {loading ? (
          <div className="notification-loading">Đang tải...</div>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`notification-item ${
                notification.isRead ? "read" : "unread"
              }`}
              onClick={() =>
                !notification.isRead && markAsRead(notification._id)
              }
            >
              <img
                src={notification.sender?.avatar || ava} // Use imported default avatar
                alt="avatar"
                className="notification-avatar"
              />
              <div className="notification-details">
                <div className="notification-name">
                  {notification.sender?.name || "Người dùng"}
                </div>
                <div className="notification-text">{notification.content}</div>
                <div className="notification-time">
                  {new Date(notification.createdAt).toLocaleString("vi-VN")}
                </div>
              </div>
              {!notification.isRead && <span className="unread-dot">•</span>}
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
