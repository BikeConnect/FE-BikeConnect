import React, { useState } from 'react';
import { IoCheckmarkCircle } from "react-icons/io5";
import { CustomerContractTemplate } from './CustomerContractTemplate';

const CustomerContractTerms = ({ onClose, onAccept, booking, bikeData }) => {    
  const [isAgreed, setIsAgreed] = useState(false);
  const [useExistingPhone, setUseExistingPhone] = useState(true);
  const [contractData, setContractData] = useState({
    customerName: booking.customerName || '',
    vehicleModel: booking.vehicleModel || '',
    vehicleLicense: booking.vehicleLicense || '',
    startDate: booking.startDate,
    endDate: booking.endDate,
    totalAmount: booking.totalAmount,
    customerPhone: booking.customerPhone || '',
    ownerPhone: booking.ownerPhone || '',
    location: booking.location || '',
    contractPhone: null,
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'customerPhone') {
      const validatedPhone = value.replace(/[^\d]/g, '').slice(0, 10);
      setContractData(prev => ({
        ...prev,
        customerPhone: validatedPhone,
        contractPhone: validatedPhone
      }));
    } else {
      setContractData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePhoneOptionChange = (e) => {
    const useExisting = e.target.value === 'existing';
    setUseExistingPhone(useExisting);
    if (useExisting) {
      setContractData(prev => ({
        ...prev,
        customerPhone: booking.customerPhone || '',
        contractPhone: null
      }));
    } else {
      setContractData(prev => ({
        ...prev,
        customerPhone: '',
        contractPhone: ''
      }));
    }
  };

  const isPhoneValid = (phone) => {
    return phone && phone.length === 10 && phone.startsWith('0');
  };

  const isFormValid = () => {
    if (useExistingPhone) {
      return isAgreed;
    } else {
      return isAgreed && isPhoneValid(contractData.customerPhone);
    }
  };

  const handleAccept = () => {
    const finalData = {
      ...contractData,
      customerPhone: useExistingPhone ? booking.customerPhone : contractData.customerPhone,
      contractPhone: useExistingPhone ? null : contractData.customerPhone
    };
    onAccept(finalData);
  };

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
              Điều khoản hợp đồng thuê xe
            </h3>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="mb-6">
            {booking.customerPhone && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn số điện thoại
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="existing-phone"
                      name="phone-option"
                      value="existing"
                      checked={useExistingPhone}
                      onChange={handlePhoneOptionChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="existing-phone" className="ml-2 text-sm text-gray-700">
                      Sử dụng số điện thoại hiện tại ({booking.customerPhone})
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="new-phone"
                      name="phone-option"
                      value="new"
                      checked={!useExistingPhone}
                      onChange={handlePhoneOptionChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="new-phone" className="ml-2 text-sm text-gray-700">
                      Sử dụng số điện thoại khác
                    </label>
                  </div>
                </div>
              </div>
            )}

            {(!booking.customerPhone || !useExistingPhone) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số Điện Thoại
                </label>
                <input
                  type="text"
                  name="customerPhone"
                  value={contractData.customerPhone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại của bạn"
                  className={`w-full px-3 py-2 border rounded-md ${
                    contractData.customerPhone && !isPhoneValid(contractData.customerPhone) 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                />
                {contractData.customerPhone && !isPhoneValid(contractData.customerPhone) && (
                  <p className="text-red-500 text-xs mt-1">
                    Số điện thoại phải bắt đầu bằng số 0 và đủ 10 chữ số
                  </p>
                )}
              </div>
            )}
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
              Hủy bỏ
            </button>
            <button
              onClick={handleAccept}
              disabled={!isFormValid()}
              className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center
                ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <IoCheckmarkCircle size={16} className="mr-1.5" />
              Xác nhận thuê xe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerContractTerms;