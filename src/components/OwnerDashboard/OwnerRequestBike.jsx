import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import BookingDetail from "./RequestBooking/BookingDetail";
import RejectModal from "./RequestBooking/RejectModal";
import api from "./../../api/api";
import { toast } from "react-hot-toast";
import ContractTerms from "./RequestBooking/ContractTerms";

const OwnerRequestBike = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedContractId, setSelectedContractId] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [selectedContractForTerms, setSelectedContractForTerms] =
    useState(null);

  const fetchBookingRequests = async () => {
    try {
      const response = await api.get("/owner/get-customer-booking-request");
      setBookingRequests(response.data.bookings);
      setLoading(false);
      console.log(response.data.bookings);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingRequests();
  }, []);

  const handleAccept = async () => {
    try {
      await api.put(`/confirm-contract/${selectedContractForTerms._id}`, {
        isConfirmed: true,
      });
      const response = await api.get("/owner/get-customer-booking-request");
      setBookingRequests(response.data.bookings);
      setShowTermsModal(false);
      setSelectedContractForTerms(null);
      toast.success("Đã chấp nhận yêu cầu thuê xe thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi chấp nhận yêu cầu!");
    }
  };

  const handleReject = (contractId) => {
    setSelectedContractId(contractId);
    setShowRejectModal(true);
  };

  const handleConfirmReject = async () => {
    try {
      await api.put(`/confirm-contract/${selectedContractId}`, {
        isConfirmed: false,
        rejectReason: rejectReason,
      });
      const response = await api.get("/owner/get-customer-booking-request");
      setBookingRequests(response.data.bookings);
      toast.success("Đã từ chối yêu cầu thuê xe!");
      setShowRejectModal(false);
      setRejectReason("");
      setSelectedContractId(null);
    } catch (error) {
      console.error("Error rejecting contract:", error);
      toast.error("Có lỗi xảy ra khi từ chối yêu cầu!");
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleAcceptClick = (booking) => {
    setSelectedContractForTerms(booking);
    console.log("Selected booking for terms:", booking);
    setShowTermsModal(true);
  };

  if (loading) {
    return <div className="text-center py-4">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Yêu cầu thuê xe</h2>

      {bookingRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-gray-500 text-lg mb-2">
            Hiện tại bạn không có yêu cầu thuê xe nào
          </div>
          <div className="text-sm text-gray-400">
            Các yêu cầu thuê xe mới sẽ xuất hiện tại đây
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
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookingRequests.map((booking) => (
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
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Đang đợi
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                        title="Xem chi tiết"
                      >
                        <FaEye size={16} className="mr-1.5" />
                        <span>Chi tiết</span>
                      </button>
                      <button
                        onClick={() => handleAcceptClick(booking)}
                        className="flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200"
                        title="Chấp nhận"
                      >
                        <IoCheckmarkCircle size={16} className="mr-1.5" />
                        <span>Chấp nhận</span>
                      </button>
                      <button
                        onClick={() => handleReject(booking._id)}
                        className="flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                        title="Từ chối"
                      >
                        <IoCloseCircle size={16} className="mr-1.5" />
                        <span>Từ chối</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <BookingDetail
          booking={selectedBooking}
          onClose={() => {
            setShowModal(false);
            setSelectedBooking(null);
          }}
        />
      )}

      {showRejectModal && (
        <RejectModal
          rejectReason={rejectReason}
          setRejectReason={setRejectReason}
          onClose={() => {
            setShowRejectModal(false);
            setRejectReason("");
            setSelectedContractId(null);
          }}
          onConfirm={handleConfirmReject}
        />
      )}

      {showTermsModal && (
        <ContractTerms
          booking={selectedContractForTerms}
          onClose={() => {
            setShowTermsModal(false);
            setSelectedContractForTerms(null);
          }}
          onAccept={handleAccept}
        />
      )}
    </div>
  );
};

export default OwnerRequestBike;
