import React, { useState } from 'react';
import { IoCheckmarkCircle } from "react-icons/io5";
import { ContractTemplate } from './ContractTemplate';

const ContractTerms = ({ onClose, onAccept, booking }) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [contractData, setContractData] = useState({
    customerName: booking.customerName || '',
    vehicleModel: booking.vehicleModel || '',
    vehicleLicense: booking.vehicleLicense || '',
    startDate: new Date(booking.startDate).toLocaleDateString('vi-VN'),
    endDate: new Date(booking.endDate).toLocaleDateString('vi-VN'),
    totalAmount: booking.totalAmount,
    ownerPhone: booking.ownerPhone || '',
    customerPhone: booking.customerPhone || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'ownerPhone') {
      const sanitizedValue = value.replace(/[^\d]/g, '').slice(0, 10);
      setContractData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
    } else {
      setContractData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const isPhoneValid = contractData.ownerPhone.length === 10 && contractData.ownerPhone.startsWith('0');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 transform transition-all my-8"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}
      >
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              Điều khoản hợp đồng cho thuê xe
            </h3>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số Điện Thoại Chủ Xe
              </label>
              <input
                type="text"
                name="ownerPhone"
                value={contractData.ownerPhone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại của bạn"
                className={`w-full px-3 py-2 border rounded-md ${
                  contractData.ownerPhone && !isPhoneValid 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                }`}
              />
              {contractData.ownerPhone && !isPhoneValid && (
                <p className="text-red-500 text-xs mt-1">
                  Số điện thoại phải bắt đầu bằng số 0 và đủ 10 chữ số
                </p>
              )}
            </div>
          </div>

          <div className="whitespace-pre-wrap font-mono text-sm">
            {ContractTemplate({ contractData })}
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
              Hủy bỏ
            </button>
            <button
              onClick={onAccept}
              disabled={!isAgreed || !isPhoneValid}
              className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center
                ${(!isAgreed || !isPhoneValid) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <IoCheckmarkCircle size={16} className="mr-1.5" />
              Xác nhận chấp nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractTerms;