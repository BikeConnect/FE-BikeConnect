import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ show, onClose, notifications = [] }) => {
    const [sortedNotifications, setSortedNotifications] = useState([]);

    useEffect(() => {
        const sorted = notifications.slice().sort((a, b) => new Date(b.time) - new Date(a.time));
        setSortedNotifications(sorted);
    }, [notifications]);

    const markAsRead = (index) => {
        const updatedNotifications = sortedNotifications.map((notification, i) =>
            i === index ? { ...notification, isRead: true } : notification
        );
        setSortedNotifications(updatedNotifications);
    };

    if (!show) return null;

    return (
        <div className="notification-modal">
            <div className="notification-header">
                <h2>Thông báo</h2>
                <button className="close-button" onClick={onClose}>✖</button>
            </div>
            <div className="notification-content">
                {sortedNotifications.length > 0 ? (
                    sortedNotifications.map((notification, index) => (
                        <div
                            key={index}
                            className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
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
