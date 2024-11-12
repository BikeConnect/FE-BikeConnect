import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/8.png";
import "./HeaderAfterLogin.css";
import ava from "../../assets/images/avatar_user1.png";
import ava2 from "../../assets/images/avatar_user2.png";
import ava3 from "../../assets/images/avatar_user3.png";
import Support from "../Support/Support";
import Notification from "../Notification/Notification";

const HeaderAfterLogin = ({ onLogout, userRole }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleAvatarClick = () => {
    setShowProfile(!showProfile);
  };

  const handleNavigateToProfile = () => {
    navigate("/customerprofiles");
    setShowProfile(false);
  };

  const handleCloseModals = () => {
    setShowSupport(false);
    setShowNotification(false);
  };

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
      navigate("/");
      setShowProfile(false);
    } else {
      console.error("onLogout is not a function");
    }
  };

  const handleSupportClick = () => {
    setShowSupport(true);
  };

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  const fakeNotifications = [
    {
      name: "Nguyễn Văn A",
      content: "Yêu cầu thuê xe của bạn đã được chấp nhận.",
      time: "15 phút trước",
      imageUrl: ava,
      isRead: false,
    },
    {
      name: "Trần Thị B",
      content: "Giao dịch sắp tới của bạn sẽ diễn ra vào ngày mai.",
      time: "4 giờ trước",
      imageUrl: ava,
      isRead: true,
    },
    {
      name: "Lê Văn C",
      content: "Thông tin về giao dịch đã được cập nhật.",
      time: "4 giờ trước",
      imageUrl: ava,
      isRead: false,
    },
    {
      name: "Phạm Thị D",
      content: "Yêu cầu thuê xe mới đã được gửi tới bạn.",
      time: "4 giờ trước",
      imageUrl: ava2,
      isRead: false,
    },
    {
      name: "Hoàng Anh E",
      content: "Bạn có thông báo mới về giao dịch.",
      time: "5 ngày trước",
      imageUrl: ava3,
      isRead: true,
    },
  ];

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
              {userRole === "owner" ? (
                <>
                  <NavLink to="/post" className="menu-link">
                    Đăng bài thuê xe
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/rentals" className="menu-link">
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
                className="notification-icon"
                onClick={handleNotificationClick}
              >
                <FaBell className="bell-icon" />
              </div>
              <div className="user-avatar" onClick={handleAvatarClick}>
                <img src={ava} alt="User Avatar" className="avatar-img" />
              </div>
            </div>
          </nav>
        </div>
      </header>
      {showProfile && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <button
              className="close-button"
              onClick={() => setShowProfile(false)}
            >
              ✖
            </button>
          </div>
          <button onClick={handleNavigateToProfile} className="dropdown-button">
            Xem Hồ Sơ
          </button>
          <button onClick={handleLogout} className="dropdown-button">
            Đăng xuất
          </button>
        </div>
      )}
      <Support show={showSupport} onClose={handleCloseModals} />
      <Notification
        show={showNotification}
        onClose={handleCloseModals}
        notifications={fakeNotifications}
      />
    </>
  );
};

export default HeaderAfterLogin;