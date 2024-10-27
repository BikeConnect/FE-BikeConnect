import React, { useState } from 'react';
import './ChangePassword.css';
import NavBar from '../NavBar/NavBar';
import HeaderAfterLogin from '../Header/HeaderAfterLogin';

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwords.newPassword === passwords.confirmPassword) {
            alert('Password changed successfully!');
        } else {
            alert('New password and confirmation do not match.');
        }
    };

    return (
        <div>
            <HeaderAfterLogin />
            <NavBar />
            <div className="change-password-container">
                <h2>Đổi Mật Khẩu</h2>
                <form onSubmit={handleSubmit} className="password-form">
                    <label>
                        Mật khẩu hiện tại:
                        <input
                            type="password"
                            name="currentPassword"
                            value={passwords.currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Mật khẩu mới:
                        <input
                            type="password"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Xác nhận mật khẩu mới:
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit" className="change-button">Xác nhận</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;