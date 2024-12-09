import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import api from '../../api/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-hot-toast';
import './styles/OwnerListVehicles.css';
import { MdWarning } from 'react-icons/md';

const OwnerListVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [showDateModal, setShowDateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
    hasNextPage: false,
    hasPrevPage: false
  });

  const fetchVehicles = async (page) => {
    try {
      setLoading(true);
      const response = await api.get(`/owner/get-owner-vehicles?page=${page}`);
      setVehicles(response.data.metadata);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Không thể tải danh sách xe');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage]);

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

  const handleEditDates = (vehicle) => {
    setEditingVehicle(vehicle);
    setSelectedDates(vehicle.availableDates.map(date => new Date(date)));
    setShowDateModal(true);
  };

  const handleUpdateVehicle = async () => {
    try {
      const updateData = {
        startDate: editingVehicle.startDate,
        endDate: editingVehicle.endDate,
        availableDates: selectedDates.map(date => date.toISOString()),
        availability_status: 'available'
      };

      await api.put(`/owner/update-vehicle-status/${editingVehicle._id}`, updateData);
      
      toast.success('Cập nhật thông tin xe thành công');
      setShowDateModal(false);
      setEditingVehicle(null);
      fetchVehicles(currentPage); 
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Không thể cập nhật thông tin xe');
    }
  };

  const handleDateSelect = (date) => {
    const newDate = new Date(date.setHours(0, 0, 0, 0));
    
    if (selectedDates.some(d => d.getTime() === newDate.getTime())) {
      setSelectedDates(selectedDates.filter(d => d.getTime() !== newDate.getTime()));
    } else {
      setSelectedDates([...selectedDates, newDate]);
    }
  };

  const isVehicleExpired = (endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    return end < today;
  };

  if (loading) {
    return <div className="text-center py-4">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Danh sách xe của bạn</h2>

      {vehicles.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-gray-500 text-lg mb-2">
            Bạn chưa có xe nào được đăng ký
          </div>
          <div className="text-sm text-gray-400">
            Các xe của bạn sẽ xuất hiện tại đây
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thương hiệu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại xe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Biển số
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá thuê/ngày
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
              {vehicles.map((vehicle) => (
                <tr key={vehicle._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.license}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.price.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(vehicle.startDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(vehicle.endDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vehicle.availability_status === 'available' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {vehicle.availability_status === 'available' ? 'Có sẵn' : 'Đang cho thuê'}
                      </span>
                      {isVehicleExpired(vehicle.endDate) && (
                        <span className="text-red-500 flex items-center gap-1" title="Xe đã hết hạn cho thuê">
                          <MdWarning className="text-lg" />
                          <span className="text-xs">Hết hạn</span>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditDates(vehicle)}
                      className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                      title="Chỉnh sửa"
                    >
                      <FaEdit size={16} className="mr-1.5" />
                      <span>Chỉnh sửa</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {vehicles.length > 0 && (
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

      {showDateModal && editingVehicle && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-xl font-semibold mb-4">Chỉnh sửa thời gian cho thuê</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Ngày bắt đầu:</label>
              <input
                type="date"
                value={editingVehicle.startDate}
                onChange={(e) => setEditingVehicle({
                  ...editingVehicle,
                  startDate: e.target.value
                })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Ngày kết thúc:</label>
              <input
                type="date"
                value={editingVehicle.endDate}
                onChange={(e) => setEditingVehicle({
                  ...editingVehicle,
                  endDate: e.target.value
                })}
                className="w-full p-2 border rounded"
              />
            </div>

            {editingVehicle.startDate && editingVehicle.endDate && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Chọn ngày cho thuê:</label>
                <DatePicker
                  inline
                  minDate={new Date(editingVehicle.startDate)}
                  maxDate={new Date(editingVehicle.endDate)}
                  selected={null}
                  onChange={handleDateSelect}
                  highlightDates={selectedDates}
                  dateFormat="dd/MM/yyyy"
                  calendarClassName="custom-calendar"
                  dayClassName={date =>
                    selectedDates.some(d => d.getTime() === date.getTime())
                      ? "selected-day"
                      : undefined
                  }
                />
                <div className="mt-2 text-sm text-gray-600">
                  Đã chọn: {selectedDates.length} ngày
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDateModal(false);
                  setEditingVehicle(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center"
                >
                Hủy
              </button>
              <button
                onClick={handleUpdateVehicle}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerListVehicles;