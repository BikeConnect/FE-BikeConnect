import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ManageCustomer.css';
import { useCustomer } from '../../CustomerContext';

const getRandomName = () => {
    const names = [
        'Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C',
        'Phạm Minh D', 'Nguyễn Thị E', 'Vũ Văn F',
        'Đặng Thị G', 'Bùi Văn H', 'Hoàng Thị I',
        'Ngô Văn J',
    ];
    return names[Math.floor(Math.random() * names.length)];
};

const ManageCustomer = () => {
    const { setCustomerCount } = useCustomer();
    const [searchTerm, setSearchTerm] = useState('');
    const [customersPerPage, setCustomersPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [customers, setCustomers] = useState(
        Array.from({ length: 50 }, (_, index) => ({
            id: index + 1,
            email: `customer${index + 1}@example.com`,
            password: `password${index + 1}`,
            registrationDate: `2024-0${(index % 12) + 1}-01`,
            displayName: getRandomName(),
            status: index % 3 === 0 ? 'Chưa kích hoạt' : 'Đã kích hoạt',
        }))
    );

    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [activeCustomerId, setActiveCustomerId] = useState(null);

    useEffect(() => {
        setCustomerCount(customers.length);
    }, [customers, setCustomerCount]);

    const handleActivateClick = (id) => {
        setActiveCustomerId(id);
        setConfirmationMessage('Bạn có muốn kích hoạt tài khoản này không?');
    };

    const confirmActivate = () => {
        setCustomers(customers.map(customer =>
            customer.id === activeCustomerId
                ? { ...customer, status: 'Đã kích hoạt' }
                : customer
        ));
        setConfirmationMessage('');
        setActiveCustomerId(null);
    };

    const handleDeleteClick = (id) => {
        setActiveCustomerId(id);
        setConfirmationMessage('Bạn có chắc xóa tài khoản khách hàng này?');
    };

    const confirmDelete = () => {
        setCustomers(customers.filter(customer => customer.id !== activeCustomerId));
        setConfirmationMessage('');
        setActiveCustomerId(null);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    return (
        <div>
            <div className="manage-customer-container">
                <h1>Quản lý tài khoản khách hàng</h1>
                <div className="search-sort-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm khách hàng"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <label className="sort-label">Hiện</label>
                    <select
                        value={customersPerPage}
                        onChange={(e) => {
                            setCustomersPerPage(Number(e.target.value));
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
                    <label className="sort-label">khách hàng</label>
                </div>
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên hiển thị</th>
                            <th>Email</th>
                            <th>Mật khẩu</th>
                            <th>Ngày đăng ký</th>
                            <th>Tình trạng</th>
                            <th>Tính năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCustomers.map((customer, index) => (
                            <tr key={customer.id}>
                                <td>{index + 1 + indexOfFirstCustomer}</td>
                                <td>{customer.displayName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.password.replace(/.(?=.{4})/g, '*')}</td>
                                <td>{customer.registrationDate}</td>
                                <td>
                                    <span className={`status ${customer.status === 'Đã kích hoạt' ? 'active' : 'inactive'}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td>
                                    {customer.status === 'Chưa kích hoạt' && (
                                        <>
                                            <FaEdit className="icon" onClick={() => handleActivateClick(customer.id)} />
                                            <FaTrash className="icon" onClick={() => handleDeleteClick(customer.id)} />
                                        </>

                                    )}
                                    {customer.status === 'Đã kích hoạt' && (
                                        <FaTrash className="icon" onClick={() => handleDeleteClick(customer.id)} />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                {confirmationMessage && (
                    <div className="confirmation-modal">
                        <p>{confirmationMessage}</p>
                        <button onClick={activeCustomerId !== null && confirmationMessage.includes('kích hoạt') ? confirmActivate : confirmDelete}>
                            Xác nhận
                        </button>
                        <button onClick={() => setConfirmationMessage('')}>Hủy</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageCustomer;
