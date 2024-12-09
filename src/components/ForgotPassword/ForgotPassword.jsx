import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/api";

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const isOwner = location.state?.userRole === "owner";
  console.log("isOwner::::", isOwner);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      console.log("User Role:", isOwner ? "owner" : "customer");

      const endpoint = isOwner
        ? `/auth/owner-forgot-password`
        : `/customer/forgot-password`;

      const response = await api.post(endpoint, {
        email: email,
      });
      console.log("response::::", response);
      if (response.status === 200) {
        setSuccess("Vui lòng kiểm tra email để đặt lại mật khẩu");
        setEmail("");
      } else {
        setError("Email không tồn tại");
      }
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg p-8 max-w-md mx-4">
        <button
          onClick={() =>
            navigate("/", {
              state: { userRole: isOwner ? "owner" : "customer" },
            })
          }
          className="absolute top-4 right-4 text-white hover:text-gray-700 text-2xl font-bold"
        >
          x
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">Quên mật khẩu</h2>
        <p className="text-gray-600 mb-6 text-center">
          Nhập email của bạn để nhận link đặt lại mật khẩu
        </p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {success && (
          <div className="text-green-500 text-center mb-4">{success}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Gửi yêu cầu đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;