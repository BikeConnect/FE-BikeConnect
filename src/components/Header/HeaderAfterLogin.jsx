import React, { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/8.png";
import "./HeaderAfterLogin.css";
import ava from "../../assets/images/avatar_user1.jpg";
import ava2 from "../../assets/images/avatar_user2.jpg";
import ava3 from "../../assets/images/avatar_user3.jpg";
import Support from "../Support/Support";
import Notification from "../Notification/Notification";
import { useSelector } from "react-redux";

const HeaderAfterLogin = ({ onLogout, userRole }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

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

  const handleMouseEnter = () => {
    setShowProfile(true);
  };

  const handleMouseLeave = () => {
    setShowProfile(false);
  };

  const handleDropdownMouseLeave = () => {
    setShowProfile(false);
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
                className="notification-container"
                onMouseLeave={handleContainerMouseLeave}
              >
                <div
                  className="notification-icon"
                  onMouseEnter={handleShowNotification}
                >
                  <FaBell className="bell-icon" />
                </div>
                <Notification
                  show={showNotification}
                  onClose={handleHideNotification}
                  notifications={fakeNotifications}
                />
              </div>
              <div
                className="profile-container"
                onMouseLeave={handleContainerMouseLeave}
              >
                <div className="user-avatar" onMouseEnter={handleMouseEnter}>
                  <img src={ava} alt="User Avatar" className="avatar-img" />
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
