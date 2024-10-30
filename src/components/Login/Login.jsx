import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ show, onClose, onRegisterClick, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: '',
        rememberMe: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        setErrorMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.phoneNumber === '012345' && formData.password === '123') {
            onLoginSuccess();
            setErrorMessage('');
            onClose();
            navigate('/homepage');
        } else {
            setErrorMessage('Số điện thoại hoặc mật khẩu không chính xác !');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="login-overlay" onClick={onClose}>
            <div className="login-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 className="login-title">Đăng nhập</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Nhập số điện thoại"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                            required
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
                        />
                        <label htmlFor="rememberMe">Ghi nhớ mật khẩu</label>
                        <a href="#" className="forgot-password">Quên mật khẩu</a>
                    </div>

                    <button type="submit" className="login-btn">Đăng nhập</button>
                </form>
                <div className="additional-options">
                    <p>
                        Bạn chưa có tài khoản? <a href="#" className="register-link" onClick={onRegisterClick}>Đăng ký ngay</a>
                    </p>
                </div>
                <div className="separator">Đăng nhập với</div>
                <div className="social-login">
                    <button className="google-btn">
                        <FaGoogle /> Google
                    </button>
                    <button className="facebook-btn">
                        <FaFacebook /> Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;