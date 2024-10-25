import React from 'react';
import { FaBell } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/8.png';
import './HeaderAfterLogin.css';
import ava from '../../assets/images/avatar_user1.png'

const HeaderAfterLogin = () => {
    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <div className="logo">
                        <img src={logo} alt="Bike Connect Logo" className="logo-img" />
                    </div>
                    <div className="menu-items">
                        <NavLink to="/" className="menu-link">Trang chủ</NavLink>
                        <NavLink to="/rentals" className="menu-link">Cho thuê xe</NavLink>
                        <NavLink to="/guide" className="menu-link">Hướng dẫn</NavLink>
                        <NavLink to="/policies" className="menu-link">Chính sách</NavLink>
                        <NavLink to="/support" className="menu-link">Hỗ trợ</NavLink>
                    </div>
                    <div className="user-actions">
                        <div className="notification-icon">
                            <FaBell className="bell-icon" />
                        </div>
                        <div className="user-avatar">
                            <img src={ava} alt="User Avatar" className="avatar-img" />
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default HeaderAfterLogin;