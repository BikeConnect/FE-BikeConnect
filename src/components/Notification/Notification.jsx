import React, { useEffect, useState } from "react";
import "./Notification.css";
import api from "../../api/api";
import ava from "../../assets/images/8.png"; // Import default avatar
import CustomerContractTerms from "../VehicleRental/Contract/CustomerContractTerms";

const Notification = ({ show, onClose, onNotificationRead }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showContractTerms, setShowContractTerms] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (show) {
      fetchNotifications();
    }
  }, [show]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const endpoint =
        userRole === "owner"
          ? "/notify/owner/notifications"
          : "/notify/customer/notifications";

      const response = await api.get(endpoint);
      console.log("response:::", response);
      if (response.data?.notifications) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.patch(`/notify/notifications/${notificationId}/mark-read`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
      if (onNotificationRead) {
        onNotificationRead();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.isRead) {
        await markAsRead(notification._id);
      }

      onClose();

      if (
        userRole === "customer" &&
        notification.noti_type === "contract" &&
        notification.contractId &&
        notification.actionType !== "CONTRACT_REJECTED"
      ) {
        const booking = {
          _id: notification.contractId._id,
          customerName: notification.contractId.customerId.name,
          vehicleModel: `${notification.contractId.vehicleId.brand} ${notification.contractId.vehicleId.model}`,
          vehicleLicense: notification.contractId.vehicleId.license,
          startDate: notification.contractId.startDate,
          endDate: notification.contractId.endDate,
          totalAmount: notification.contractId.totalAmount,
          customerPhone: notification.contractId.customerId.phone,
          ownerPhone: notification.contractId.ownerId.phone,
          location: notification.contractId.location,
        };

        const bikeData = {
          brand: notification.contractId.vehicleId.brand,
          model: notification.contractId.vehicleId.model,
          images: notification.contractId.vehicleId.images,
          price: notification.contractId.vehicleId.price,
        };
        setSelectedBooking({ booking, bikeData });
        setShowContractTerms(true);
      }

      if (onNotificationRead) {
        onNotificationRead();
      }
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  return (
    <>
      {show && (
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
                  onClick={() => handleNotificationClick(notification)}
                >
                  <img
                    src={ava}
                    alt="avatar"
                    className="notification-avatar"
                  />
                  <div className="notification-details">
                    <div className="notification-name">
                      {notification.sender?.name || "Hệ thống thông báo"}
                    </div>
                    <div 
                      className="notification-text"
                    >
                      {notification.noti_content}
                    </div>
                    <div className="notification-time">
                      {new Date(notification.createdAt).toLocaleString("vi-VN")}
                    </div>
                  </div>
                  {!notification.isRead && (
                    <span className="unread-dot">•</span>
                  )}
                </div>
              ))
            ) : (
              <div className="notification-empty">Không có thông báo nào</div>
            )}
          </div>
        </div>
      )}

      {showContractTerms && selectedBooking && (
        <CustomerContractTerms
          onClose={() => {
            setShowContractTerms(false);
            setSelectedBooking(null);
          }}
          onAccept={(contractData) => {
            console.log("Contract accepted:", contractData);
            setShowContractTerms(false);
            setSelectedBooking(null);
          }}
          booking={selectedBooking.booking}
          bikeData={selectedBooking.bikeData}
        />
      )}
    </>
  );
};

export default Notification;
