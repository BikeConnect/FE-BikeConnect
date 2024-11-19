import React, { useState, useEffect } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import './AuthOwner.css';
import { useCustomer } from '../../CustomerContext';

const AuthOwner = () => {
    const { postRequestCount, setPostRequestCount } = useCustomer();
    const [searchTerm, setSearchTerm] = useState('');
    const [requestsPerPage, setRequestsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
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
        setRequests(requests.map(request =>
            request.id === id ? { ...request, status: 'Đã xác thực' } : request
        ));
    };

    const handleDeleteClick = (id) => {
        setRequests(requests.filter(request => request.id !== id));
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
        <div className="auth-owner-container">
            <h1>Quản lý yêu cầu đăng bài của chủ xe</h1>
            <div className="search-sort-container">
                <input
                    type="text"
                    placeholder="Tìm kiếm yêu cầu"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <label className="sort-label">Hiện</label>
                <select
                    value={requestsPerPage}
                    onChange={(e) => {
                        setRequestsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="sort-select"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <table className="request-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên hiển thị</th>
                        <th>Email</th>
                        <th>Ngày yêu cầu</th>
                        <th>Trạng thái</th>
                        <th>Tính năng</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRequests.map((request, index) => (
                        <tr key={request.id}>
                            <td>{index + 1 + indexOfFirstRequest}</td>
                            <td>{request.displayName}</td>
                            <td>{request.email}</td>
                            <td>{request.requestDate}</td>
                            <td>
                                <span className={`status ${request.status === 'Đã xác thực' ? 'approved' : 'pending'}`}>
                                    {request.status}
                                </span>
                            </td>
                            <td>
                                {request.status === 'Chưa xác thực' && (
                                    <FaCheck className="icon approve" onClick={() => handleApproveClick(request.id)} />
                                )}
                                <FaTrash className="icon delete" onClick={() => handleDeleteClick(request.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AuthOwner;
