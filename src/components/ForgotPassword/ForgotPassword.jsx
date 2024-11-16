import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css'; // Make sure this CSS file existsil
import VerifyEmail from '../VerifyEmail/VerifyEmail';

const ForgotPassword = () => {
  const [showVerifyEmail, setShowVerifyEmail] = useState(false); // State to show VerifyEmail
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setShowVerifyEmail(true); // Show VerifyEmail component
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="close-btn" onClick={() => navigate("/VerifyEmail")}>
          ×
        </button>
        <h2 className="login-title">Quên mật khẩu</h2>

        {showVerifyEmail ? (
          <VerifyEmail onClose={() => setShowVerifyEmail(false)} /> // Show VerifyEmail
        ) : (
          <form onSubmit={handleResetPassword}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Nhập email"
              required
              className="input-field"
            />
            <button type="submit" className="login-btn">
              Đặt lại mật khẩu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;