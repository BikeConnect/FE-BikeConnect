import React, { useState } from 'react';
import './Login.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const Login = ({ show, onClose, onRegisterClick }) => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: '',
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="login-overlay" onClick={onClose}>
            <div className="login-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit} >
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Số điện thoại"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        <label htmlFor="rememberMe">Ghi nhớ mật khẩu</label>
                    </div>

                    <button type="submit" className="login-btn">Đăng nhập</button>
                </form>
                <div className="additional-options">
                    <a href="#" className="forgot-password">Quên mật khẩu?</a>
                    <p>
                        Bạn chưa có tài khoản? <a href="#" className="register-link" onClick={onRegisterClick}>Đăng ký ngay</a>
                    </p>
                </div>
                <div className="social-login">
                    <button className="google-btn">
                        <FaGoogle />Google
                    </button>
                    <button className="facebook-btn">
                        <FaFacebook />Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
