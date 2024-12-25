import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaUpload,
  FaTimes,
  FaIdCard,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import logo from "../../assets/images/avatar_user1.jpg";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  customer_upload_profile_image,
  customer_update_profile_info,
} from "../../store/Reducers/authReducer";
import Toast from "../Toast/Toast";

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
  const [savedIdentityCards, setSavedIdentityCards] = useState({
    front: null,
    back: null,
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        phone: userInfo?.phone || "",
        currentAddress: userInfo?.currentAddress || "",
        identityCard: userInfo?.identityCard || "",
      });
    }
  }, [userInfo]);

  useEffect(() => {
    console.log("userInfo:", userInfo); // Log the entire userInfo object

    if (userInfo?.identityCard && userInfo.identityCard.length > 0) {
      setSavedIdentityCards({
        front: userInfo.identityCard[0]?.url || null,
        back: userInfo.identityCard[1]?.url || null,
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

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleIdentityCardUpload = async (side, file) => {
    try {
      console.log("Starting upload for side:", side); // Log the side being uploaded
      console.log("File details:", file); // Log the file details

      // Upload ảnh
      const formData = new FormData();
      formData.append("identityCard", file);
      formData.append("side", side);

      const token = localStorage.getItem("accessToken");
      console.log("Access token:", token); // Log the access token

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: formData,
        credentials: "include",
      };

      const response = await fetch(
        "http://localhost:8080/api/customer/upload-identity-card",
        requestOptions
      );

      console.log("Upload response status:", response.status); // Log the response status

      if (response.ok) {
        const data = await response.json();
        console.log("Upload response data:", data); // Log the response data

        const tempImageUrl = URL.createObjectURL(file);
        setSavedIdentityCards((prev) => ({
          ...prev,
          [side]: tempImageUrl,
        }));

        // Phân tích ảnh CCCD
        const analyzeHeaders = new Headers();
        analyzeHeaders.append("Cookie", `accessToken=${token}`);

        const analyzeOptions = {
          method: "GET",
          headers: analyzeHeaders,
          credentials: "include",
        };

        const analyzeResponse = await fetch(
          "http://localhost:8080/api/customer/analyze-identity-card",
          analyzeOptions
        );

        console.log("Analyze response status:", analyzeResponse.status); // Log the analyze response status

        if (analyzeResponse.ok) {
          const analyzeResult = await analyzeResponse.json();
          console.log("Analyze Result:", analyzeResult); // Log the analyze result
          console.log("Analyze Result:", analyzeResult.summary.hasValidIDCard);
          if (analyzeResult.summary.hasValidIDCard === false) {
            showToast(
              "Vui lòng tải lên ảnh CCCD gốc, không qua chỉnh sửa",
              "error"
            );
            setSavedIdentityCards((prev) => ({
              ...prev,
              [side]: null,
            }));
          } else {
            showToast("Tải lên và phân tích CCCD thành công!", "success");
            if (data.url) {
              setSavedIdentityCards((prev) => ({
                ...prev,
                [side]: data.url,
              }));
            }
          }
        } else {
          const errorData = await analyzeResponse.json();
          console.log("Analyze error data:", errorData); // Log the analyze error data
          showToast(
            errorData.message || "Có lỗi xảy ra khi phân tích CCCD",
            "error"
          );
          setSavedIdentityCards((prev) => ({
            ...prev,
            [side]: null,
          }));
        }
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error handling identity card:", error);
      showToast("Có lỗi xảy ra khi xử lý CCCD. Vui lòng thử lại", "error");
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

              <div className="flex md:col-span-2 mt-6">
                <h3 className="">
                  <FaIdCard className="inline-block mr-2 text-[#472cb2]" />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed ml-4 border-gray-300 rounded-lg p-4 text-center hover:border-[#472cb2] transition-colors">
                    {savedIdentityCards.front ? (
                      <div className="relative">
                        <img
                          src={savedIdentityCards.front}
                          alt="Mặt CCCD"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setSavedIdentityCards((prev) => ({
                              ...prev,
                              front: null,
                            }))
                          }
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) =>
                            handleIdentityCardUpload("front", e.target.files[0])
                          }
                        />
                        <div className="text-gray-500">
                          <FaUpload className="mx-auto h-12 w-12 mb-2 text-[#472cb2]" />
                          <p>Tải lên CCCD</p>
                        </div>
                      </label>
                    )}
                  </div>
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
            <div className="md:col-span-2 flex mt-6 mb-6">
              <h3 className="mb-4">
                <FaIdCard className="inline-block mr-2 text-[#472cb2]" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  {savedIdentityCards.front ? (
                    <img
                      src={savedIdentityCards.front}
                      alt="Ảnh CCCD"
                      className="w-full h-48 object-cover rounded-lg shadow-md ml-6"
                    />
                  ) : (
                    <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center w-72">
                      <span className="text-gray-500 ml-6">Chưa có ảnh</span>
                    </div>
                  )}
                </div>
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
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
};

export default CustomerIndex;
