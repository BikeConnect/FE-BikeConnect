import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { CustomerContractTemplate } from "./CustomerContractTemplate";
import api from "../../../api/api";
import moment from "moment";
import CustomerRejectModal from "./CustomerRejectModal";
import { toast } from "react-hot-toast";

const CustomerContractTerms = ({ onClose, onAccept, booking, bikeData }) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [contractData, setContractData] = useState({
    customerName: booking.customerName || "",
    vehicleModel: booking.vehicleModel || "",
    vehicleLicense: booking.vehicleLicense || "",
    startDate: moment(booking.startDate).format("DD/MM/YYYY"),
    endDate: moment(booking.endDate).format("DD/MM/YYYY"),
    totalAmount: booking.totalAmount,
    customerPhone: booking.customerPhone || "",
    customerIdentityCard: booking.customerIdentityCard || "",
    location: booking.location || "",
  });
  const [showRejectModal, setShowRejectModal] = useState(false);

  console.log("bookingId:::", booking._id);

  useEffect(() => {
    const fetchIdentityCard = async () => {
      try {
        const response = await api.get("/customer/analyze-identity-card");
        console.log("response identity card:::", response);
        if (response.status === 200 && response.data.results) {
          const idNumber = response.data.results[0]?.details?.idNumber;
          if (idNumber) {
            setContractData((prev) => ({
              ...prev,
              customerIdentityCard: idNumber,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching identity card:", error);
      }
    };

    if (!contractData.customerIdentityCard) {
      fetchIdentityCard();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContractData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isIdentityCardValid = contractData.customerIdentityCard.trim() !== "";

  const handleAccept = async () => {
    try {
      const finalData = {
        ...contractData,
        customerPhone: contractData.customerPhone,
      };

      const response = await api.put(`/confirm-contract/${booking._id}`, {
        isConfirmed: true,
        ...finalData,
      });

      if (response.status === 200) {
        toast.success("Xác nhận thuê xe thành công!");
        onAccept(finalData);
      }
    } catch (error) {
      console.error("Error accepting contract:", error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi xác nhận thuê xe"
      );
    }
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const handleConfirmReject = async (rejectReason) => {
    try {
      const response = await api.put(`/confirm-contract/${booking._id}`, {
        isConfirmed: false,
        rejectReason: rejectReason,
      });

      if (response.status === 200) {
        toast.success("Đã hủy thuê xe thành công!");
        onClose();
      }
    } catch (error) {
      console.error("Error rejecting contract:", error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi hủy thuê xe"
      );
    } finally {
      setShowRejectModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      onClick={onClose}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 transform transition-all my-8"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "calc(100vh - 4rem)", overflowY: "auto" }}
      >
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              Điều khoản hợp đồng thuê xe
            </h3>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CMND/CCCD <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="customerIdentityCard"
                value={contractData.customerIdentityCard}
                onChange={handleInputChange}
                placeholder="Nhập số CMND/CCCD của bạn"
                className={`w-full px-3 py-2 border rounded-md ${
                  !isIdentityCardValid &&
                  contractData.customerIdentityCard.trim() === ""
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {!isIdentityCardValid &&
                contractData.customerIdentityCard.trim() === "" && (
                  <p className="text-red-500 text-xs mt-1">
                    Vui lòng nhập CMND/CCCD
                  </p>
                )}
            </div>
          </div>

          <div className="whitespace-pre-wrap font-mono text-sm">
            {CustomerContractTemplate({ contractData, bikeData })}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 rounded-b-xl z-10">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="agree-terms"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="agree-terms" className="ml-2 text-sm text-gray-700">
              Tôi đã đọc và đồng ý với các điều khoản trên
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Đóng
            </button>
            <button
              onClick={handleRejectClick}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Hủy thuê xe
            </button>
            <button
              onClick={handleAccept}
              disabled={!isAgreed || !isIdentityCardValid}
              className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center
                ${
                  !isAgreed || !isIdentityCardValid
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
            >
              <IoCheckmarkCircle size={16} className="mr-1.5" />
              Xác nhận thuê xe
            </button>
          </div>
        </div>
      </div>

      {showRejectModal && (
        <CustomerRejectModal
          onClose={() => setShowRejectModal(false)}
          onConfirm={handleConfirmReject}
        />
      )}
    </div>
  );
};

export default CustomerContractTerms;
