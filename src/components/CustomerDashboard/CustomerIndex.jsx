import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import logo  from "../../assets/images/avatar_user1.jpg";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  customer_upload_profile_image,
  customer_update_profile_info,
} from "../../store/Reducers/authReducer";

const CustomerIndex = () => {
  const dispatch = useDispatch();
  const { userInfo, loader } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentAddress: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        phone: userInfo?.phone || "",
        currentAddress: userInfo?.currentAddress || "",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phoneRegex = /^[0][0-9]*$/;
      if (value === "" || phoneRegex.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[0][0-9]{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert(
        "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại bắt đầu bằng số 0 và có 10 chữ số"
      );
      return;
    }

    const updateData = {
      name: formData.name,
      phone: formData.phone,
      currentAddress: formData.currentAddress,
    };

    try {
      await dispatch(customer_update_profile_info(updateData));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(customer_upload_profile_image(formData));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Thông tin cá nhân
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Avatar section */}
        <div className="flex justify-center md:col-span-2 mb-6">
          <div className="relative">
            {userInfo?.image ? (
              <label htmlFor="img" className="relative cursor-pointer">
                <img
                  src={userInfo?.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                {loader && (
                  <div className="absolute top-0 left-0 w-full h-full bg-[#00000080] flex items-center justify-center rounded-full">
                    <FadeLoader color="#ffffff" />
                  </div>
                )}
              </label>
            ) : (
              <label htmlFor="img" className="relative cursor-pointer">
                <img
                  src={logo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                {loader && (
                  <div className="absolute top-0 left-0 w-full h-full bg-[#00000080] flex items-center justify-center rounded-full">
                    <FadeLoader color="#ffffff" />
                  </div>
                )}
              </label>
            )}
            <label
              htmlFor="img"
              className="absolute bottom-0 right-0 bg-[#472cb2] text-white p-2 rounded-full hover:bg-[#472cb2] cursor-pointer"
            >
              <FaEdit />
              <input
                onChange={add_image}
                type="file"
                className="hidden"
                id="img"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <FaUser className="text-[#472cb2]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:border-[#472cb2]"
                />
              </div>

              <div className="flex items-center space-x-4">
                <FaPhone className="text-[#472cb2]" />
                <div className="relative w-full">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    maxLength="10"
                    className="w-full p-2 border rounded focus:outline-none focus:border-[#472cb2]"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-[#472cb2]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>

              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-[#472cb2]" />
                <input
                  type="text"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:border-[#472cb2]"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#472cb2] text-white rounded-md hover:bg-[#472cb2]"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        ) : (
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4">
                <FaUser className="text-[#472cb2]" />
                <span className="text-gray-800">{userInfo?.name}</span>
              </div>

              <div className="flex items-center space-x-4">
                <FaPhone className="text-[#472cb2]" />
                <span className="text-gray-800">
                  {userInfo?.phone || "Chưa cập nhật"}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-[#472cb2]" />
                <span className="text-gray-800">{userInfo?.email}</span>
                {userInfo?.isVerified && (
                  <MdVerified className="text-blue-500" title="Đã xác thực" />
                )}
              </div>

              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-[#472cb2]" />
                <span className="text-gray-800">
                  {userInfo?.currentAddress || "Chưa cập nhật"}
                </span>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-[#472cb2] text-white rounded-md hover:bg-[#472cb2]"
              >
                Chỉnh sửa thông tin
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerIndex;
