import React, { useState } from 'react';
import './Register.css';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import VerifyEmail from '../VerifyEmail/VerifyEmail';

const Register = ({ show, onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        displayName: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        role: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isVerifyEmailVisible, setIsVerifyEmailVisible] = useState(false); // Toggle registration form or verify email

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRoleSelect = (role) => {
        setFormData({
            ...formData,
            role: role,
        });
        setIsVerifyEmailVisible(true); // Show VerifyEmail instead of registration form
    };

    if (!show) {
        return null;
    }

    return (
        <div className="register-overlay" onClick={onClose}>
            <div className="register-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                {!isVerifyEmailVisible ? (
                    <div>
                        <h2 className="register-title">Đăng kí</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                            <input
                                type="text"
                                name="displayName"
                                placeholder="Tên hiển thị"
                                value={formData.displayName}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                            <div className="password-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Mật khẩu"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <div className="password-container">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Xác nhận mật khẩu"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                                <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="agreeTerms">Tôi đã đọc và chấp thuận với <a href="#">Chính sách và Quy định</a> của Bike Connect</label>
                            </div>

                            <div className="role-buttons">
                                <button
                                    type="button"
                                    className="role-btn"
                                    onClick={() => handleRoleSelect('renter')}
                                >
                                    Đăng kí cho người đi thuê xe
                                </button>
                                <button
                                    type="button"
                                    className="role-btn"
                                    onClick={() => handleRoleSelect('owner')}
                                >
                                    Đăng kí để trở thành chủ thuê xe
                                </button>
                            </div>
                        </form>
                        <div className="social-login">
                            <button className="google-btn">
                                <FaGoogle /> Google
                            </button>
                            <button className="facebook-btn">
                                <FaFacebook /> Facebook
                            </button>
                        </div>
                    </div>
                ) : (
                    <VerifyEmail /> // Show VerifyEmail component when isVerifyEmailVisible is true
                )}
            </div>
        </div>
    );
};

export default Register;
