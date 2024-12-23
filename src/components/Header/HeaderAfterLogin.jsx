import React, { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/8.png";
import "./HeaderAfterLogin.css";
import ava from "../../assets/images/avatar_user1.jpg";
import Support from "../Support/Support";
import Notification from "../Notification/Notification";
import { useSelector } from "react-redux";
import api from "../../api/api";
import { io } from "socket.io-client";

const HeaderAfterLogin = ({ onLogout, userRole }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);

  const fetchUnreadCount = async () => {
    try {
      const endpoint =
        (userRole || localStorage.getItem("userRole")) === "owner"
          ? "/notify/owner/notifications"
          : "/notify/customer/notifications";

      const response = await api.get(endpoint);
      if (response.data?.unreadCount) {
        setUnreadCount(response.data.unreadCount);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, [showNotification]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    if (userInfo?._id) {
      const role = userRole || localStorage.getItem("userRole");
      newSocket.emit("join_notifications", userInfo._id, role);

      newSocket.on("new_notification", (notification) => {
        console.log("Received notification:", notification);
        setUnreadCount((prev) => prev + 1);
        fetchUnreadCount();
      });
    }

    return () => {
      newSocket.disconnect();
    };
  }, [userInfo._id, userRole]);

  const handleMouseEnter = () => {
    setShowProfile(true);
  };

  const handleNavigateToProfile = () => {
    navigate("/user-dashboard");
    setShowProfile(false);
  };

  const handleCloseModals = () => {
    setShowSupport(false);
    setShowNotification(false);
  };

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userData");

      onLogout();
      navigate("/");
      setShowProfile(false);
      setShowNotification(false);
    } else {
      console.error("onLogout is not a function");
    }
  };

  const handleSupportClick = () => {
    setShowSupport(true);
  };

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleHideNotification = () => {
    setShowNotification(false);
  };

  const handleContainerMouseLeave = (e) => {
    const container = e.currentTarget;
    const { left, right, top, bottom } = container.getBoundingClientRect();
    const { clientX, clientY } = e;

    if (
      clientX < left ||
      clientX > right ||
      clientY < top ||
      clientY > bottom
    ) {
      handleHideNotification();
      setShowProfile(false);
    }
  };

  return (
    <>
      <header className="header-after-login">
        <div className="header-container">
          <nav className="nav">
            <div className="logo">
              <NavLink to="/homepage">
                <img src={logo} alt="Bike Connect Logo" className="logo-img" />
              </NavLink>
            </div>
            <div className="menu-items">
              <NavLink to="/homepage" className="menu-link">
                Trang chủ
              </NavLink>
              {(userRole || localStorage.getItem("userRole")) === "owner" ? (
                <>
                  <NavLink to="/post" className="menu-link">
                    Đăng bài thuê xe
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/CarRentalList" className="menu-link">
                    Thuê xe
                  </NavLink>
                </>
              )}
              <NavLink to="/guide" className="menu-link">
                Hướng dẫn
              </NavLink>
              <NavLink to="/policies" className="menu-link">
                Chính sách
              </NavLink>
              <button
                className="menu-link support-button"
                onClick={handleSupportClick}
              >
                Hỗ trợ
              </button>
            </div>
            <div className="auth-buttons">
              <div
                className="notification-container"
                onMouseLeave={handleContainerMouseLeave}
              >
                <div
                  className="notification-icon"
                  onMouseEnter={handleShowNotification}
                >
                  <FaBell className="bell-icon" />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </div>
                <Notification
                  show={showNotification}
                  onClose={handleHideNotification}
                  onNotificationRead={fetchUnreadCount}
                />
              </div>
              <div
                className="profile-container"
                onMouseLeave={handleContainerMouseLeave}
              >
                <div className="user-avatar" onMouseEnter={handleMouseEnter}>
                  <img
                    src={userInfo.image || ava}
                    alt="User Avatar"
                    className="avatar-img"
                  />
                  {showProfile && (
                    <div
                      className="profile-dropdown"
                      onMouseEnter={() => setShowProfile(true)}
                    >
                      <button
                        onClick={handleNavigateToProfile}
                        className="dropdown-button"
                      >
                        Xem Hồ Sơ
                      </button>
                      <button
                        onClick={handleLogout}
                        className="dropdown-button"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <Support show={showSupport} onClose={handleCloseModals} />
    </>
  );
};

export default HeaderAfterLogin;
