import React, { useState } from 'react';
import './Register.css';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
    const [showVerifyEmail, setShowVerifyEmail] = useState(false);
    const [verificationCode, setVerificationCode] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async () => {
        if (formData.password.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        if (!formData.agreeTerms) {
            alert('Bạn phải đồng ý với Chính sách và Quy định của Bike Connect');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }

        const endpoint = formData.role === 'owner'
            ? 'http://localhost:8080/api/auth/owner-register'
            : 'http://localhost:8080/api/customer/customer-register';

        const payload = {
            name: formData.displayName,
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Đăng ký thành công:', data);
                setVerificationCode(data.verificationCode);
                setShowVerifyEmail(true); // Hiển thị modal xác thực email
            } else {
                const errorData = await response.json();
                console.error('Đăng ký thất bại:', errorData);
                alert(`Đăng ký thất bại: ${errorData.message || 'Lỗi không xác định'}`);
            }
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Đã xảy ra lỗi khi kết nối với server');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRoleSelectAndSubmit = (role) => {
        setFormData({
            ...formData,
            role: role,
        });
        handleSubmit();
    };

    if (!show) {
        return null;
    }

    return (
        <>
            <div className="register-overlay" onClick={onClose}>
                <div className="register-container" onClick={(e) => e.stopPropagation()}>
                    <h2 className="register-title">Đăng kí</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                    <form onSubmit={(e) => e.preventDefault()}>
                        {/* Các trường nhập liệu */}
                        <input
                            type="text"
                            name="displayName"
                            placeholder="Tên hiển thị"
                            value={formData.displayName}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
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
                            <label htmlFor="agreeTerms">
                                Tôi đã đọc và chấp thuận với <Link to="/policies">Chính sách và Quy định</Link> của Bike Connect
                            </label>
                        </div>

                        <div className="role-buttons">
                            <button
                                type="button"
                                className="role-btn"
                                onClick={() => handleRoleSelectAndSubmit('customer')}
                            >
                                Đăng kí cho người đi thuê xe
                            </button>
                            <button
                                type="button"
                                className="role-btn"
                                onClick={() => handleRoleSelectAndSubmit('owner')}
                            >
                                Đăng kí để trở thành chủ thuê xe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showVerifyEmail && (
                <VerifyEmail role={formData.role} onClose={() => setShowVerifyEmail(false)} />
            )}
        </>
    );
};

export default Register;
