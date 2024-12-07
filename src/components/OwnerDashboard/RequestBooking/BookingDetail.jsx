import React from "react";

const BookingDetail = ({ booking, onClose }) => {
  if (!booking) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Chi tiết Thông Tin
            </h2>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Thông tin khách hàng
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-32">Họ và tên:</span>
                  <span>{booking.customerName}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-32">Email:</span>
                  <span>{booking.customerEmail}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-32">Số điện thoại:</span>
                  <span>{booking.customerPhone}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
                  />
                </svg>
                Thông tin xe
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-32">Hãng xe:</span>
                  <span>{booking.vehicleBrand}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-32">Model:</span>
                  <span>{booking.vehicleModel}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-32">Giá thuê:</span>
                  <span className="text-green-600 font-medium">
                    {booking.vehiclePrice.toLocaleString("vi-VN")}đ/ngày
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Chi tiết thuê xe
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-32">Ngày bắt đầu:</span>
                  <span>
                    {new Date(booking.startDate).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-32">Ngày kết thúc:</span>
                  <span>
                    {new Date(booking.endDate).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-32">Số ngày thuê:</span>
                  <span className="font-medium text-purple-600">
                    {booking.rentalDays} ngày
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium w-32">Tổng tiền:</span>
                  <span className="font-medium text-purple-600">
                    {booking.totalAmount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
