import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";
import api from "./../../api/api";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole") || "customer";
  console.log("userRole::::", userRole);
  const isOwner = userRole === "owner";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp nhau");
      return;
    }
    try {
      const endpoint = isOwner
        ? `/auth/owner-reset-password/${token}`
        : `/customer/reset-password/${token}`;
      const response = await api.post(endpoint, {
        password: password,
        accessToken: token,
      });
      console.log("response::::", response);
      if (response.status === 200) {
        setSuccess("Đặt lại mật khẩu thành công");
        setTimeout(() => {
          localStorage.removeItem("accessToken");
          navigate("/", {
            message: "Mật khẩu đã được đặt lại thành công",
            state: { userRole: isOwner ? "owner" : "customer" },
          });
        }, 2000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <h2 className="text-2xl font-bold text-center mb-4">
          Đặt lại mật khẩu
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {success && (
          <div className="text-green-500 text-center mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;