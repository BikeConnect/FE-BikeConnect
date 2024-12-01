import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaShieldAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const CustomerChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#472cb2] to-[#3a249e] px-8 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-white/20 rounded-lg mb-3">
              <MdSecurity className="text-3xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Đổi mật khẩu</h2>
              <p className="text-white/80 mt-1">
                Chúng tôi khuyến khích bạn đổi mật khẩu 3 tháng một lần
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaLock className="text-[#472cb2]" />
                Mật khẩu hiện tại
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#472cb2] focus:ring-1 focus:ring-[#472cb2] outline-none transition-all"
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showOldPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaShieldAlt className="text-[#472cb2]" />
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#472cb2] focus:ring-1 focus:ring-[#472cb2] outline-none transition-all"
                  placeholder="Nhập mật khẩu mới"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaShieldAlt className="text-[#472cb2]" />
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#472cb2] focus:ring-1 focus:ring-[#472cb2] outline-none transition-all"
                  placeholder="Xác nhận mật khẩu mới"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#472cb2] to-[#3a249e] text-white py-3 px-6 rounded-lg font-medium 
                hover:from-[#3a249e] hover:to-[#472cb2] transform transition-all duration-300 
                active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <FaLock />
                <span>Cập nhật mật khẩu</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerChangePassword;
