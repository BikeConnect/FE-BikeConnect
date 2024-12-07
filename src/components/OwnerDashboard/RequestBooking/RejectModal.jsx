import React, { useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";

const RejectModal = ({ onClose, setRejectReason, onConfirm }) => {
    const [localReason, setLocalReason] = useState("");

    const handleChange = (e) => {
      const value = e.target.value;
      setLocalReason(value);
    };

    const handleConfirm = () => {
      setRejectReason(localReason);
      onConfirm();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Xác nhận lý do từ chối
              </h3>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                rows="4"
                placeholder="Vui lòng nhập lý do từ chối yêu cầu..."
                value={localReason}
                onChange={handleChange}
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
            </div>

            <div className="text-sm text-gray-500 mb-6">
              <p>* Vui lòng cung cấp lý do từ chối để khách hàng có thể hiểu rõ.</p>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleConfirm}
              disabled={!localReason.trim()}
              className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center
                ${!localReason.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <IoCloseCircle size={16} className="mr-1.5" />
              Xác nhận từ chối
            </button>
          </div>
        </div>
      </div>
    );
  };

export default RejectModal