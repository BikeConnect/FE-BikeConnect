import React, { useState } from 'react';
import logo from '../../assets/images/8.png';
import './HeaderNoLogin.css';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

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
                            <a href="#" className="menu-link">Trang chủ</a>
                            <a href="#" className="menu-link">Cho thuê xe</a>
                            <a href="#" className="menu-link">Hướng dẫn</a>
                            <a href="#" className="menu-link">Chính sách</a>
                            <a href="#" className="menu-link">Hỗ trợ</a>
                        </div>
                        <div className="auth-buttons">
                            <button className="btn-register" onClick={handleRegisterClick}>Đăng ký</button>
                            <button className="btn-login" onClick={handleLoginClick}>Đăng nhập</button>
                        </div>
                    </nav>
                </div>
            </header>
            <Login
                show={showLogin}
                onClose={handleCloseModals}
                onRegisterClick={handleRegisterClick}
            />
            <Register
                show={showRegister}
                onClose={handleCloseModals}
            />
        </>
    );
};

export default Header;