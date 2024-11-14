import React, { useState } from "react";
import logo from "../../assets/images/8.png";
import "./HeaderNoLogin.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { NavLink } from "react-router-dom";
import Support from "../Support/Support";

const HeaderNoLogin = ({ onLoginSuccess }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowSupport(false);
  };

  const handleLoginSuccess = (role) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
    onLoginSuccess(role);
    handleCloseModals();
  };

  const handleSupportClick = () => {
    setShowSupport(true);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <nav className="nav">
            <div className="logo">
              <img src={logo} alt="Bike Connect Logo" className="logo-img" />
            </div>
            <div className="menu-items">
              <NavLink to="/" className="menu-link">
                Trang chủ
              </NavLink>
              <NavLink to="/rentals" className="menu-link">
                Cho thuê xe
              </NavLink>
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
              <button className="btn-register" onClick={handleRegisterClick}>
                Đăng ký
              </button>
              <button className="btn-login" onClick={handleLoginClick}>
                Đăng nhập
              </button>
            </div>
          </nav>
        </div>
      </header>
      <Login
        show={showLogin}
        onClose={handleCloseModals}
        onRegisterClick={handleRegisterClick}
        onLoginSuccess={handleLoginSuccess}
      />
      <Register show={showRegister} onClose={handleCloseModals} />
      <Support show={showSupport} onClose={handleCloseModals} />
    </>
  );
};

export default HeaderNoLogin;
