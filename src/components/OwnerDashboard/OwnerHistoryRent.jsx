import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import BookingDetail from "./RequestBooking/BookingDetail";
import api from "./../../api/api";
import { toast } from "react-hot-toast";

const OwnerHistoryRent = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [show, setshow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
    hasNextPage: false,
    hasPrevPage: false
  });

  const fetchBookingHistory = async (page) => {
    try {
      setLoading(true);
      const response = await api.get(`/owner/get-owner-all-bookings-history?page=${page}`);
      setBookingHistory(response.data.bookings);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingHistory(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (bookingHistory.length === 0 && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [bookingHistory]);

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setshow(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Đang thuê";
      case "completed":
        return "Đã hoàn thành";
      case "cancelled":
        return "Đã từ chối";
      case "pending":
        return "Đang chờ";
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="text-center py-4">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Lịch sử cho thuê xe</h2>

      {bookingHistory.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-gray-500 text-lg mb-2">
            Chưa có lịch sử cho thuê xe nào
          </div>
          <div className="text-sm text-gray-400">
            Lịch sử cho thuê xe sẽ xuất hiện tại đây
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại xe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày bắt đầu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày kết thúc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookingHistory.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.vehicleModel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(booking.startDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(booking.endDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.totalAmount.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        booking.status
                      )}`}
                    >
                      {getStatusText(booking.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(booking)}
                      className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                      title="Xem chi tiết"
                    >
                      <FaEye size={16} className="mr-1.5" />
                      <span>Chi tiết</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {bookingHistory.length > 0 && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={!pagination.hasPrevPage}
            className={`px-4 py-2 rounded-md ${
              pagination.hasPrevPage
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Trang trước
          </button>
          
          <span className="text-gray-600">
            Trang {pagination.currentPage} / {pagination.totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            disabled={!pagination.hasNextPage}
            className={`px-4 py-2 rounded-md ${
              pagination.hasNextPage
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Trang sau
          </button>
        </div>
      )}

      {show && (
        <BookingDetail
          booking={selectedBooking}
          onClose={() => {
            setshow(false);
            setSelectedBooking(null);
          }}
          rejectionReason={selectedBooking?.status === "cancelled" ? selectedBooking.ownerConfirmed?.rejectionReason : null}
        />
      )}
    </div>
  );
};

export default OwnerHistoryRent;