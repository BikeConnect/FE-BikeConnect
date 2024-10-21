import React, { useState } from 'react';
import './Register.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const Register = ({ show, onClose }) => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        displayName: '',
        password: '',
        confirmPassword: '',
        userType: 'Người cho thuê', // Giá trị mặc định
    });

    if (!show) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic xử lý khi submit form
        console.log(formData);
    };

    return (
        <div className="register-overlay" onClick={onClose}>
            <div className="register-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Số điện thoại"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="displayName"
                        placeholder="Tên hiển thị"
                        value={formData.displayName}
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
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                    >
                        <option value="Người cho thuê">Người cho thuê</option>
                        <option value="Người thuê">Người thuê</option>
                    </select>
                    <div className="checkbox-container">
                        <input type="checkbox" id="agree" required />
                        <label htmlFor="agree">
                            Tôi đã đọc và chấp thuận với <a href="#">Chính sách và Quy định</a> của Bike Connect
                        </label>
                    </div>
                    <button type="submit" className="register-btn">Đăng ký</button>
                </form>
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

export default Register;
