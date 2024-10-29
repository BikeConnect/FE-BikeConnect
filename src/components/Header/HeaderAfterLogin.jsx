import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/8.png';
import './HeaderAfterLogin.css';
import ava from '../../assets/images/avatar_user1.png';

const HeaderAfterLogin = ({ onLogout }) => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    const handleAvatarClick = () => {
        setShowProfile(!showProfile);
    };

    const handleNavigateToProfile = () => {
        navigate("/customerprofiles");
        setShowProfile(false);
    };

    const handleLogout = () => {
        onLogout();
        navigate("/");
        setShowProfile(false);
    };

    return (
        <>
            <header className="header-after-login">
                <div className="header-container">
                    <nav className="nav">
                        <div className="logo">
                            <img src={logo} alt="Bike Connect Logo" className="logo-img" />
                        </div>
                        <div className="menu-items">
                            <NavLink to="/homepage" className="menu-link">Trang chủ</NavLink>
                            <NavLink to="/rentals" className="menu-link">Cho thuê xe</NavLink>
                            <NavLink to="/guide" className="menu-link">Hướng dẫn</NavLink>
                            <NavLink to="/policies" className="menu-link">Chính sách</NavLink>
                            <NavLink to="/support" className="menu-link">Hỗ trợ</NavLink>
                        </div>
                        <div className="user-actions">
                            <div className="notification-icon">
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
                        <button className="close-button" onClick={() => setShowProfile(false)}>✖</button>
                    </div>
                    <button onClick={handleNavigateToProfile} className="dropdown-button">Xem Hồ Sơ</button>
                    <button onClick={handleLogout} className="dropdown-button">Đăng xuất</button>
                </div>
            )}
        </>
    );
};

export default HeaderAfterLogin;
