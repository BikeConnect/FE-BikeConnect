import React, { useEffect, useState } from "react";

import {
  Clock,
  Store,
  MessageCircle,
  Star,
  Check,
  X,
  RotateCcw,
} from "lucide-react";
import "./RentalStatusTabs.css";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/images_homePage/v994_8600.png";
import api from "../../api/api";

const RentalStatusTabs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [motorcycles, setMotorcycles] = useState({
    all: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("accessToken");
      console.log("Current token:", token);

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      console.log("Request headers:", Object.fromEntries(myHeaders.entries()));

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        setIsLoading(true);
        setError(null);
        console.log("Token before fetch:", token);
        console.log("Headers:", {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });
        const response = await fetch(
          "http://localhost:8080/api/all-bookings",
          requestOptions
        );
        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", {
            status: response.status,
            statusText: response.statusText,
            body: errorText,
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result);
        console.log("Raw API Response:", result);

        if (result.data?.bookings) {
          const formattedBookings = result.data.bookings.map((booking) => {
            console.log("Processing booking:", booking);
            const formatted = {
              id: booking._id,
              name: booking.vehicle.brand,
              model: booking.vehicle.model,
              status: getStatusText(booking.bookingDetails.status),
              statusType: getStatusType(booking.bookingDetails.status),
              price: `${booking.bookingDetails.totalPrice.toLocaleString(
                "vi-VN"
              )}đ/ngày`,
              owner: booking.vehicle.owner.name,
              date: new Date(booking.bookingDetails.startDate).toLocaleString(
                "vi-VN",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              ),
              dateLabel: getDateLabel(booking.bookingDetails.status),
              image: booking.vehicle.images?.[0]?.url || image,
            };
            console.log("Formatted booking:", formatted);
            return formatted;
          });

          console.log("Setting motorcycles state:", formattedBookings);
          setMotorcycles({ all: formattedBookings });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const getStatusType = (status) => {
    const statusLower = status.toLowerCase();

    const statusMap = {
      pending: "pending-confirm",    // Chờ xác nhận
      accepted: "receiving",         // Nhận xe
      rejected: "returning",         // Trả xe (fixed from pending-confirm)
      completed: "rating",          // Đánh giá
      cancelled: "cancelled",       // Đã hủy
    };

    console.log("Mapping status:", status, "to:", statusMap[statusLower]);
    return statusMap[statusLower] || "pending-confirm";
  };

  const getStatusText = (status) => {
    const statusTextMap = {
      pending: "Chờ xác nhận",
      accepted: "Nhận xe",
      rejected: "Trả xe",
      completed: "Đánh giá",
      cancelled: "Đã hủy"
    };
    return statusTextMap[status] || status;
  };

  const getDateLabel = (status) => {
    const labelMap = {
      PENDING: "Ngày yêu cầu",
      ACCEPTED: "Ngày xác nhận yêu cầu",
      REJECTED: "Ngày trả xe",
      COMPLETED: "Ngày trả xe",
      CANCELLED: "Ngày hủy",
    };
    return labelMap[status] || "Ngày thuê";
  };

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "pending-confirm", label: "Chờ xác nhận" },
    { id: "receiving", label: "Nhận xe" },
    { id: "returning", label: "Trả xe" },
    { id: "rating", label: "Đánh giá" },
    { id: "cancelled", label: "Đã hủy" },
  ];

  const handleCancelBooking = (motorcycleId) => {
    setMotorcycles((prevState) => {
      const updatedMotorcycles = prevState.all.map((motorcycle) => {
        if (motorcycle.id === motorcycleId) {
          return {
            ...motorcycle,
            status: "Đã hủy",
            statusType: "cancelled",
            dateLabel: "Ngày hủy",
            date: new Date().toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        }
        return motorcycle;
      });
      return { all: updatedMotorcycles };
    });
  };

  const handleRebookMotorcycle = (motorcycleId) => {
    setMotorcycles((prevState) => {
      const updatedMotorcycles = prevState.all.map((motorcycle) => {
        if (motorcycle.id === motorcycleId) {
          return {
            ...motorcycle,
            status: "Chờ xác nhận yêu cầu",
            statusType: "pending-confirm",
            dateLabel: "Ngày yêu cầu",
            date: new Date().toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        }
        return motorcycle;
      });
      return { all: updatedMotorcycles };
    });
  };

  const statusTransitions = {
    "pending-confirm": "receiving",
    receiving: "returning",
    returning: "rating",
    rating: "all",
    cancelled: "all",
  };

  const statusMappings = {
    "pending-confirm": {
      status: "Đang trong quá trình nhận xe",
      statusType: "receiving",
      dateLabel: "Ngày yêu cầu",
    },
    receiving: {
      status: "Đang trả xe",
      statusType: "returning",
      dateLabel: "Ngày nhận xe",
    },
    returning: {
      status: "Đang chờ đánh giá",
      statusType: "rating",
      dateLabel: "Ngày trả xe",
    },
    rating: {
      status: "Hoàn thành",
      statusType: "completed",
      dateLabel: "Ngày đánh giá",
    },
  };

  const handleStatusConfirmation = (motorcycleId) => {
    setMotorcycles((prevState) => {
      const updatedMotorcycles = prevState.all.map((motorcycle) => {
        if (motorcycle.id === motorcycleId) {
          const nextStatus = statusTransitions[motorcycle.statusType];
          const newStatusDetails = statusMappings[motorcycle.statusType] || {};

          return {
            ...motorcycle,
            ...newStatusDetails,
            date: new Date().toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        }
        return motorcycle;
      });
      return { all: updatedMotorcycles };
    });
  };

  const getStatusActions = (statusType, motorcycleId) => {
    const isReviewed =
      localStorage.getItem(`reviewed_${motorcycleId}`) === "true";

    const actions = {
      completed: [
        {
          label: "Xem cửa hàng",
          icon: <Store size={20} />,
          variant: "outlinee",
        },
        {
          label: "Liên hệ chủ xe",
          icon: <MessageCircle size={20} />,
          variant: "outlinee",
        },
        {
          label: "Đặt lại xe",
          icon: <RotateCcw size={20} />,
          variant: "primary",
          onClick: () => handleRebookMotorcycle(motorcycleId),
        },
      ],

      "pending-confirm": [
        {
          label: "Xem cửa hàng",
          icon: <Store size={20} />,
          variant: "outlinee",
        },
        {
          label: "Liên hệ chủ xe",
          icon: <MessageCircle size={20} />,
          variant: "outlinee",
        },
        {
          label: "Hủy đặt xe",
          icon: <X size={20} />,
          variant: "primary",
          onClick: () => handleCancelBooking(motorcycleId),
        },
      ],
      receiving: [
        {
          label: "Xem cửa hàng",
          icon: <Store size={20} />,
          variant: "outlinee",
        },
        {
          label: "Liên hệ chủ xe",
          icon: <MessageCircle size={20} />,
          variant: "outlinee",
        },
        {
          label: "Xác nhận nhận xe",
          icon: <Check size={20} />,
          variant: "success",
          onClick: () => handleStatusConfirmation(motorcycleId),
        },
      ],
      returning: [
        {
          label: "Xem cửa hàng",
          icon: <Store size={20} />,
          variant: "outlinee",
        },
        {
          label: "Liên hệ chủ xe",
          icon: <MessageCircle size={20} />,
          variant: "outlinee",
        },
        {
          label: "Xác nhận trả xe",
          icon: <Check size={20} />,
          variant: "primary",
          onClick: () => handleStatusConfirmation(motorcycleId),
        },
      ],
      rating: [
        {
          label: "Xem cửa hàng",
          icon: <Store size={20} />,
          variant: "outlinee",
        },
        {
          label: "Liên hệ chủ xe",
          icon: <MessageCircle size={20} />,
          variant: "outlinee",
        },
        {
          label: isReviewed ? "Hoàn thành đánh giá" : "Đánh giá ngay",
          icon: <Star size={20} />,
          variant: isReviewed ? "success" : "primary",
          onClick: () => {
            if (!isReviewed) {
              const motorcycle = motorcycles.all.find((m) => m.id === motorcycleId);
              console.log("motorcycle1/23", motorcycle)
              navigate("/motorbikereview", {
                state: {
                  motorcycleData: {
                    id: motorcycle.id,
                    name: motorcycle.name,
                    model: motorcycle.model,
                    price: motorcycle.price,
                    owner: motorcycle.owner,
                    date: motorcycle.date,
                    image: motorcycle.image
                  }
                }
              });
            }
          },
        },
      ],
      cancelled: [
        {
          label: "Xem cửa hàng",
          icon: <Store size={20} />,
          variant: "outlinee",
        },
        {
          label: "Liên hệ chủ xe",
          icon: <MessageCircle size={20} />,
          variant: "outlinee",
        },
        {
          label: "Đặt lại xe",
          icon: <RotateCcw size={20} />,
          variant: "primary",
          onClick: () => handleRebookMotorcycle(motorcycleId),
        },
      ],
    };
    return actions[statusType] || [];
  };

  const filteredMotorcycles = {
    all: motorcycles.all,
    "pending-confirm": motorcycles.all.filter(
      (m) => m.statusType === "pending-confirm"
    ),
    receiving: motorcycles.all.filter((m) => m.statusType === "receiving"),
    returning: motorcycles.all.filter((m) => m.statusType === "returning"),
    rating: motorcycles.all.filter((m) => m.statusType === "rating"),
    cancelled: motorcycles.all.filter((m) => m.statusType === "cancelled"),
  };

  const updateTabCounts = () => {
    return tabs.map((tab) => ({
      ...tab,
      count: filteredMotorcycles[tab.id]?.length || 0,
    }));
  };

  console.log("Filtered motorcycles:", filteredMotorcycles);

  console.log("Active tab:", activeTab);
  console.log("Rendering motorcycles:", filteredMotorcycles[activeTab]);

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="rental-status-container">
      <div className="tabs-wrapper">
        <ul className="nav nav-tabs">
          {updateTabCounts().map((tab) => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {tab.count > 0 && <span className="badge">{tab.count}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="motorcycle-list">
        {filteredMotorcycles[activeTab]?.map((motorcycle) => (
          <div key={motorcycle.id} className="motorcycle-card">
            <div className="card-content">
              <div className="motorcycle-grid">
                <div className="image-container">
                  <img
                    src={motorcycle.image}
                    alt={motorcycle.name}
                    className="motorcycle-image"
                  />
                </div>
                <div className="info-container">
                  <div className="header-section">
                    <div>
                      <h3 className="motorcycle-name">
                        {motorcycle.name} {motorcycle.model}
                      </h3>
                      <p className="motorcycle-price">{motorcycle.price}</p>
                    </div>
                    <span className={`status-badge ${motorcycle.statusType}`}>
                      {motorcycle.status}
                    </span>
                  </div>

                  <div className="info-section">
                    <p className="info-item">
                      <Store className="icon" size={20} />
                      <span>Chủ xe: {motorcycle.owner}</span>
                    </p>
                    <p className="info-item">
                      <Clock className="icon" size={20} />
                      <span>
                        {motorcycle.dateLabel}: {motorcycle.date}
                      </span>
                    </p>
                  </div>

                  <div className="action-buttons">
                    {getStatusActions(motorcycle.statusType, motorcycle.id).map(
                      (action, index) => (
                        <button
                          key={index}
                          className={`action-button ${action.variant}`}
                          onClick={action.onClick}
                        >
                          {action.icon}
                          <span>{action.label}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalStatusTabs;
