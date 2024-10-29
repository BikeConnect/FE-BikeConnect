import React, { useState } from 'react';
import './Login.css';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ show, onClose, onRegisterClick, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        phoneNumber: '12345',
        password: '123',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            // Tại đây bạn sẽ thêm logic gọi API đăng nhập
            // Giả lập đăng nhập thành công
            if (formData.phoneNumber && formData.password) {
                // Gọi callback để thông báo đăng nhập thành công
                onLoginSuccess();
            } else {
                setError('Vui lòng nhập đầy đủ thông tin');
            }
        } catch (err) {
            setError('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (!show) return null;

    return (
        <div className="login-overlay" onClick={onClose}>
            <div className="login-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 className="login-title">Đăng nhập</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Nhập số điện thoại"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field"
                        />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            id="rememberMe"
                        />
                        <label htmlFor="rememberMe">Ghi nhớ mật khẩu</label>
                        <a href="#" className="forgot-password">Quên mật khẩu</a>
                    </div>

                    <button type="submit" className="login-btn">Đăng nhập</button>
                </form>
                <div className="additional-options">
                    <p>
                        Bạn chưa có tài khoản? <a href="#" className="register-link" onClick={(e) => {
                            e.preventDefault();
                            onRegisterClick();
                        }}>Đăng ký ngay</a>
                    </p>
                </div>
                <div className="separator">Đăng nhập với</div>
                <div className="social-login">
                    <button className="google-btn" type="button">
                        <FaGoogle /> Google
                    </button>
                    <button className="facebook-btn" type="button">
                        <FaFacebook /> Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;