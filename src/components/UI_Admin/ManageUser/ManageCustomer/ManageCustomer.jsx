import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";
import { useCustomer } from "../../CustomerContext";

const ManageCustomer = () => {
  const { setCustomerCount } = useCustomer();
  const [searchTerm, setSearchTerm] = useState("");
  const [customersPerPage, setCustomersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState(
    Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      email: `customer${index + 1}@example.com`,
      registrationDate: `2024-0${(index % 12) + 1}-01`,
      displayName: `Khách hàng ${index + 1}`,
      status: index % 3 === 0 ? "Chưa kích hoạt" : "Đã kích hoạt",
    }))
  );

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [activeCustomerId, setActiveCustomerId] = useState(null);
  const [showDocuments, setShowDocuments] = useState(false);
  const [selectedCustomerDocs, setSelectedCustomerDocs] = useState(null);

  useEffect(() => {
    setCustomerCount(customers.length);
  }, [customers, setCustomerCount]);

  const handleActivateClick = (id) => {
    setActiveCustomerId(id);
    setConfirmationMessage("Bạn có muốn kích hoạt tài khoản này không?");
  };

  const confirmActivate = () => {
    setCustomers(
      customers.map((customer) =>
        customer.id === activeCustomerId
          ? { ...customer, status: "Đã kích hoạt" }
          : customer
      )
    );
    setConfirmationMessage("");
    setActiveCustomerId(null);
  };

  const handleDeleteClick = (id) => {
    setActiveCustomerId(id);
    setConfirmationMessage("Bạn có chắc xóa tài khoản khách hàng này?");
  };

  const confirmDelete = () => {
    setCustomers(
      customers.filter((customer) => customer.id !== activeCustomerId)
    );
    setConfirmationMessage("");
    setActiveCustomerId(null);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handleViewDocuments = (customer) => {
    setSelectedCustomerDocs({
      frontImage:
        "https://dichthuatsaigon.vn/wp-content/uploads/2022/10/dich-thuat-can-cuoc-cong-dan.jpeg",
      backImage:
        "https://media.vov.vn/sites/default/files/styles/large/public/2021-10/Can%20cuoc.jpg",
      driverLicenseImage:
        "https://media.vov.vn/sites/default/files/styles/large/public/2021-10/Can%20cuoc.jpg", // Thêm URL ảnh bằng lái xe
      customerName: customer.displayName,
    });
    setShowDocuments(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Tìm kiếm khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-600 whitespace-nowrap">Hiển thị:</span>
          <select
            value={customersPerPage}
            onChange={(e) => {
              setCustomersPerPage(Number(e.target.value));
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
          <span className="text-gray-600 whitespace-nowrap">khách hàng</span>
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
                Ngày đăng ký
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tình trạng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giấy tờ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tính năng
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCustomers.map((customer, index) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1 + indexOfFirstCustomer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {customer.displayName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.registrationDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                        ${
                                          customer.status === "Đã kích hoạt"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewDocuments(customer)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaFileAlt className="mr-2" />
                    Xem giấy tờ
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleActivateClick(customer.id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 transition-all duration-200"
                      title="Kích hoạt"
                    >
                      <FaEdit className="w-4 h-4 text-emerald-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(customer.id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100 hover:bg-rose-200 transition-all duration-200"
                      title="Xóa"
                    >
                      <FaTrash className="w-4 h-4 text-rose-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {showDocuments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6">
            <h2 className="text-2xl font-bold mb-6">
              Giấy tờ của {selectedCustomerDocs.customerName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Mặt trước CCCD</h3>
                <img
                  src={selectedCustomerDocs.frontImage}
                  alt="CCCD mặt trước"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Mặt sau CCCD</h3>
                <img
                  src={selectedCustomerDocs.backImage}
                  alt="CCCD mặt sau"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDocuments(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmationMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <p className="text-lg mb-4">{confirmationMessage}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmationMessage("")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Hủy
              </button>
              <button
                onClick={
                  confirmationMessage.includes("kích hoạt")
                    ? confirmActivate
                    : confirmDelete
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCustomer;
