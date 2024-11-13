import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoginRedirect, setShowLoginRedirect] = useState(false); // State to show Login redirect
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      alert("Cập nhật mật khẩu thành công");
      setShowLoginRedirect(true); // Show the Login component
    } else {
      alert("Mật khẩu không khớp nhau");
    }
  };

  return (
    <div className="reset-password-overlay">
      <div className="reset-password-container">
        <button className="close-btn" onClick={() => navigate("/login")}>
          ×
        </button>
        <h2 className="reset-password-title">Đặt mật khẩu mới</h2>
        <p>Tạo mật khẩu mới. Đảm bảo mật khẩu mới khác với mật khẩu trước đó để bảo mật.</p>
        
        {showLoginRedirect ? (
          // Redirect to the Login page if password reset is successful
          navigate("/login")
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={handlePasswordChange}
              required
              className="input-field"
            />
            <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="input-field"
            />
            <button type="submit" className="login-btn">Cập nhật mật khẩu</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
