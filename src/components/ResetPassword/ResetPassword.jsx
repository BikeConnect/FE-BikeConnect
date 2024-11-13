import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './ResetPassword.css';

const ResetPassword = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      onClose();
    } else {
      alert("Mật khẩu ko khớp nhau");
    }
  };

  return (
    <div className="reset-password-overlay">
      <div className="reset-password-container">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="reset-password-title">Đặt mật khẩu mới</h2>
        <p>Tạo mật khẩu mới. Đảm bảo mật khẩu mới khác với mật khẩu trước đó để bảo mật.</p>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNewPassword" className="mb-3" style={{ width: '100%' }}>
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={handlePasswordChange}
              required
              className="form-control" // Ensures styling from CSS file
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3" style={{ width: '100%' }}>
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="form-control" // Ensures styling from CSS file
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-primary w-100">
            Cập nhật mật khẩu
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
