import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ show, onClose, onRegisterClick, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    matKhau: "",
    ghiNhoMatKhau: false,
  });

  const [hienMatKhau, setHienMatKhau] = useState(false);
  const [thongBaoLoi, setThongBaoLoi] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setThongBaoLoi("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setThongBaoLoi("");

    try {
      const ownerResponse = await fetch('http://localhost:8080/api/auth/owner-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.matKhau
        }),
      });
      console.log('ownerResponse:', ownerResponse);
      if (ownerResponse.ok) {
        const data = await ownerResponse.json();
        console.log('Đăng nhập chủ xe thành công:', data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('userRole', 'owner');
        localStorage.setItem('userData', JSON.stringify(data.accessToken));
        onLoginSuccess("owner");
        onClose();
        navigate("/homepage");
        return;
      }

      const customerResponse = await fetch('http://localhost:8080/api/customer/customer-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.matKhau
        }),
      });

      if (customerResponse.ok) {
        const data = await customerResponse.json();
        console.log('Đăng nhập khách hàng thành công:', data);
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('userRole', 'customer');
        localStorage.setItem('userData', JSON.stringify(data));
        onLoginSuccess("customer");
        onClose();
        navigate("/homepage");
        return;
      }

      setThongBaoLoi("Email hoặc mật khẩu không chính xác!");

    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      setThongBaoLoi("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau!");
    }
  };

  const toggleMatKhau = () => {
    setHienMatKhau(!hienMatKhau);
  };

  const handleForgotPasswordClick = () => {
    navigate("/ForgotPassword"); // Navigate to ForgotPassword component
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div className="login-overlay" onClick={onClose}>
        <div className="login-container" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
          <h2 className="login-title">Đăng nhập</h2>
          {thongBaoLoi && <p className="error-message">{thongBaoLoi}</p>}
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
            <div className="password-container">
              <input
                type={hienMatKhau ? "text" : "password"}
                name="matKhau"
                placeholder="Nhập mật khẩu"
                value={formData.matKhau}
                onChange={handleChange}
                required
                className="input-field"
              />
              <span
                className="password-toggle"
                onClick={toggleMatKhau}
              >
                {hienMatKhau ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="ghiNhoMatKhau"
                checked={formData.ghiNhoMatKhau}
                onChange={handleChange}
              />
              <label>Ghi nhớ mật khẩu</label>
              <a
                href="#"
                className="forgot-password"
                onClick={handleForgotPasswordClick}
              >
                Quên mật khẩu
              </a>
            </div>

            <button type="submit" className="login-btn">
              Đăng nhập
            </button>
          </form>
          <div className="additional-options">
            <p>
              Bạn chưa có tài khoản?{" "}
              <a href="#" className="register-link" onClick={onRegisterClick}>
                Đăng ký ngay
              </a>
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
    </>
  );
};

export default Login;
