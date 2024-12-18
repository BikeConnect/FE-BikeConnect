import React, { useState, useEffect } from "react";
import "./RentalHistory.css";
import api from "../../api/api";

const RentalHistory = () => {
  const [rentalData, setRentalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentalHistory = async () => {
      try {
        const userRole = localStorage.getItem("userRole");
        const endpoint =
          userRole === "owner"
            ? "/owner/vehicle-history"
            : "/customer/vehicle-history";

        const response = await api.get(endpoint);
        console.log("Raw API response:", response);

        if (!response.data || !response.data.bookings) {
          console.log("Invalid response structure:", response.data);
          throw new Error("Dữ liệu không đúng định dạng");
        }

        const transformedData = response.data.bookings.map((item) => {
          console.log("Processing item:", item);
          return {
            id: item._id,
            licensePlate: item.vehicleInfo?.license || "N/A",
            vehicleName:
              `${item.vehicleInfo?.brand || ""} ${
                item.vehicleInfo?.model || ""
              }`.trim() || "N/A",
            vehicleType: getStatusText(item.bookingStatus),
            date: formatDateRange(item.startDate, item.endDate),
            notes: formatPrice(item.totalPrice),
          };
        });

        console.log("Transformed data:", transformedData);
        setRentalData(transformedData);
      } catch (error) {
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalHistory();
  }, []);

  const getStatusText = (status) => {
    const statusMap = {
      pending: "Đang chờ xác nhận",
      accepted: "Đã xác nhận",
      completed: "Đã trả",
      cancelled: "Đã hủy",
      rejected: "Đã từ chối",
    };
    return statusMap[status.toLowerCase()] || status;
  };

  const formatDateRange = (startDate, endDate) => {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("vi-VN");
    };
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const formatPrice = (amount) => {
    return `${amount?.toLocaleString("vi-VN")} VND`;
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <div className="rental-history">
        <h2>Lịch sử thuê xe</h2>
        <table>
          <thead>
            <tr>
              <th>Số thứ tự</th>
              <th>Biển số</th>
              <th>Tên xe</th>
              <th>Trạng thái</th>
              <th>Ngày</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {rentalData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.licensePlate}</td>
                <td>{item.vehicleName}</td>
                <td>{item.vehicleType}</td>
                <td>{item.date}</td>
                <td>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalHistory;
