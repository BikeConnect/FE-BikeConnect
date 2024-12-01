import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  customer_login,
  get_user_info,
  owner_login,
} from "../../store/Reducers/authReducer";

const Login = ({ show, onClose, onRegisterClick, onLoginSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    matKhau: "",
    ghiNhoMatKhau: false,
  });
  const [selectedRole, setSelectedRole] = useState("customer");
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

    const loginData = {
      email: formData.email,
      password: formData.matKhau,
    };
    try {
      await dispatch(
        selectedRole === "owner"
          ? owner_login(loginData)
          : customer_login(loginData)
      ).unwrap();
      await dispatch(get_user_info());
      onLoginSuccess(selectedRole);
      onClose();
      navigate("/");
    } catch (error) {
      setThongBaoLoi(error.error || "Email hoặc mật khẩu không chính xác!");
    }
  };

  const toggleMatKhau = () => {
    setHienMatKhau(!hienMatKhau);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    if (onClose) onClose();

    navigate("/forgot-password", {
      state: { userRole: selectedRole },
    });
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    localStorage.setItem("userRole", role);
    setThongBaoLoi("");
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
          <div className="flex justify-center space-x-4 mb-6">
            <button
              type="button"
              onClick={() => handleRoleChange("customer")}
              className={`px-4 py-2 rounded-md ${
                selectedRole === "customer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } transition-colors duration-200`}
            >
              Người thuê
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("owner")}
              className={`px-4 py-2 rounded-md ${
                selectedRole === "owner"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } transition-colors duration-200`}
            >
              Người cho thuê
            </button>
          </div>
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
              <span className="password-toggle" onClick={toggleMatKhau}>
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
                className="text-blue-600 hover:text-blue-800 text-sm ml-auto transition-colors duration-200"
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
              Bạn chưa có tài khoản?
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
