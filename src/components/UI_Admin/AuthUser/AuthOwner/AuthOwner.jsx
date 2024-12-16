import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaFileAlt } from 'react-icons/fa';
import { useCustomer } from '../../CustomerContext';

const AuthOwner = () => {
    const { postRequestCount, setPostRequestCount } = useCustomer();
    const [searchTerm, setSearchTerm] = useState('');
    const [requestsPerPage, setRequestsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDocuments, setShowDocuments] = useState(false);
    const [selectedOwnerDocs, setSelectedOwnerDocs] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [activeOwnerId, setActiveOwnerId] = useState(null);

    const [requests, setRequests] = useState(
        Array.from({ length: 50 }, (_, index) => ({
            id: index + 1,
            email: `owner${index + 1}@example.com`,
            displayName: `Chủ xe ${index + 1}`,
            requestDate: `2024-0${(index % 12) + 1}-01`,
            status: index % 2 === 0 ? 'Đã xác thực' : 'Chưa xác thực',
        }))
    );

    useEffect(() => {
        setPostRequestCount(requests.length);
    }, [requests, setPostRequestCount]);

    const handleApproveClick = (id) => {
        setActiveOwnerId(id);
        setConfirmationMessage('Bạn có chắc chắn đồng ý yêu cầu xác thực này không?');
    };

    const confirmApprove = () => {
        setRequests(requests.map(request =>
            request.id === activeOwnerId
                ? { ...request, status: 'Đã xác thực' }
                : request
        ));
        setConfirmationMessage('');
        setActiveOwnerId(null);
    };

    const handleDeleteClick = (id) => {
        setActiveOwnerId(id);
        setConfirmationMessage('Bạn có chắc chắn xóa yêu cầu này không?');
    };

    const confirmDelete = () => {
        setRequests(requests.filter(request => request.id !== activeOwnerId));
        setConfirmationMessage('');
        setActiveOwnerId(null);
    };

    const handleViewDocuments = (owner) => {
        setSelectedOwnerDocs({
            registrationImage: "https://example.com/path/to/vehicle-registration.jpg",
            bikeImage: "https://example.com/path/to/bike-image.jpg",
            ownerName: owner.displayName
        });
        setShowDocuments(true);
    };

    const filteredRequests = requests.filter(request =>
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

    return (
        <div className="space-y-6">
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
                        {[10, 20, 30, 40, 50].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <span className="text-gray-600 whitespace-nowrap">yêu cầu</span>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên hiển thị</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày yêu cầu</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giấy tờ</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tính năng</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentRequests.map((request, index) => (
                            <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {index + 1 + indexOfFirstRequest}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{request.displayName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{request.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {request.requestDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                        ${request.status === 'Đã xác thực' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'}`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleViewDocuments(request)}
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <FaFileAlt className="mr-2 h-4 w-4" />
                                        Xem giấy tờ
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => handleApproveClick(request.id)}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 transition-all duration-200"
                                            title="Xác thực"
                                        >
                                            <FaEdit className="w-4 h-4 text-emerald-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(request.id)}
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
                                ${currentPage === i + 1
                                    ? 'z-10 bg-blue-600 border-blue-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }
                                ${i === 0 ? 'rounded-l-md' : ''}
                                ${i === totalPages - 1 ? 'rounded-r-md' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </nav>
            </div>

            {confirmationMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <p className="text-lg mb-4">{confirmationMessage}</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setConfirmationMessage('')}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={confirmationMessage.includes('xác thực') ? confirmApprove : confirmDelete}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDocuments && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
                        <h2 className="text-2xl font-bold mb-6">
                            Giấy tờ và hình ảnh xe của {selectedOwnerDocs.ownerName}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Giấy tờ đăng ký xe</h3>
                                <img
                                    src={selectedOwnerDocs.registrationImage}
                                    alt="Giấy tờ đăng ký xe"
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Hình ảnh xe</h3>
                                <img
                                    src={selectedOwnerDocs.bikeImage}
                                    alt="Hình ảnh xe"
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowDocuments(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthOwner;
