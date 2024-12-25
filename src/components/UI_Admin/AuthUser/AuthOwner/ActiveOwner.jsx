import React, { useState, useEffect } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import api from "../../../../api/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ava from "../../../../assets/images/avatar_user1.jpg";
import {
  get_active_owner,
  owner_update_status,
} from "../../../../store/Reducers/ownerReducer";

const ActiveOwner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [requestsPerPage, setRequestsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOwnerDetail, setShowOwnerDetail] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [activeOwners, setActiveOwners] = useState([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const dispatch = useDispatch();
  const { owners, totalOwner } = useSelector((state) => state.owner);

  useEffect(() => {
    dispatch(get_active_owner());
  }, []);

  const handleViewDetail = (owner) => {
    setSelectedOwner(owner);
    setShowOwnerDetail(true);
  };

  const filteredOwners = activeOwners.filter(
    (owner) =>
      owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentOwners = filteredOwners.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const totalPages = Math.ceil(filteredOwners.length / requestsPerPage);

  const handleStatusUpdate = async (ownerId, newStatus) => {
    try {
      await dispatch(
        owner_update_status({
          ownerId,
          status: newStatus,
        })
      ).unwrap();

      toast.success("Cập nhật trạng thái thành công");
      setShowStatusModal(false);
      dispatch(get_active_owner());
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Không thể cập nhật trạng thái");
    }
  };

  return (
    <div className="ml-[150px] space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Tìm kiếm tài khoản..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-600 whitespace-nowrap">Hiển thị:</span>
          <select
            value={requestsPerPage}
            onChange={(e) => {
              setRequestsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[10, 20, 30, 40, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="text-gray-600 whitespace-nowrap">chủ xe</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên hiển thị
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hình ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tính năng
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {owners.map((owner, index) => (
              <tr
                key={owner._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1 + indexOfFirstRequest}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {owner.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{owner.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {moment(owner.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Đã xác thực
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={owner.image || ava}
                      alt={`Avatar of ${owner.name}`}
                      className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleViewDetail(owner)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 hover:bg-indigo-200 transition-all duration-200"
                      title="Xem chi tiết"
                    >
                      <FaEye className="w-4 h-4 text-indigo-600" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOwner(owner);
                        setSelectedStatus(owner.status);
                        setShowStatusModal(true);
                      }}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition-all duration-200"
                      title="Cập nhật trạng thái"
                    >
                      <FaEdit className="w-4 h-4 text-yellow-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showOwnerDetail && selectedOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">
              Thông tin chi tiết chủ xe
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Họ và tên:</p>
                  <p className="font-medium">{selectedOwner.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email:</p>
                  <p className="font-medium">{selectedOwner.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Số điện thoại:</p>
                  <p className="font-medium">
                    {selectedOwner.phone || "Chưa cập nhật"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Trạng thái:</p>
                  <p className="font-medium">Đã xác thực</p>
                </div>
                <div>
                  <p className="text-gray-600">Ngày tạo:</p>
                  <p className="font-medium">
                    {moment(selectedOwner.createdAt).format("DD/MM/YYYY")}
                  </p>
                </div>
                {selectedOwner.subInfo && (
                  <>
                    <div>
                      <p className="text-gray-600">Địa chỉ:</p>
                      <p className="font-medium">
                        {selectedOwner.subInfo.address || "Chưa cập nhật"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Quận/Huyện:</p>
                      <p className="font-medium">
                        {selectedOwner.subInfo.district || "Chưa cập nhật"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Thành phố:</p>
                      <p className="font-medium">
                        {selectedOwner.subInfo.city || "Chưa cập nhật"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowOwnerDetail(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && selectedOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              Cập nhật trạng thái chủ xe
            </h2>

            <div className="mb-4">
              <p className="text-gray-600 mb-2">Chủ xe: {selectedOwner.name}</p>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Hoạt động</option>
                <option value="deactivate">Ngưng hoạt động</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Hủy
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(selectedOwner._id, selectedStatus)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${
                  currentPage === i + 1
                    ? "z-10 bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }
                ${i === 0 ? "rounded-l-md" : ""}
                ${i === totalPages - 1 ? "rounded-r-md" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ActiveOwner;
