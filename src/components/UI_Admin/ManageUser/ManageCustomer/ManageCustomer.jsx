import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaFileAlt } from 'react-icons/fa';
import './ManageCustomer.css';
import { useCustomer } from '../../CustomerContext';

const getRandomName = () => {
    const names = [
        'Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C',
        'Phạm Minh D', 'Nguyễn Thị E', 'Vũ Văn F',
        'Đặng Thị G', 'Bùi Văn H', 'Hoàng Thị I',
        'Ngô Văn Jack97-vì sao tinh tú',
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
    const [showDocuments, setShowDocuments] = useState(false);
    const [selectedCustomerDocs, setSelectedCustomerDocs] = useState(null);

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
    
    const handleViewDocuments = (customer) => {
        setSelectedCustomerDocs({
            frontImage: "https://dichthuatsaigon.vn/wp-content/uploads/2022/10/dich-thuat-can-cuoc-cong-dan.jpeg",
            backImage: "https://media.vov.vn/sites/default/files/styles/large/public/2021-10/Can%20cuoc.jpg",
            driverLicenseImage: "https://media.vov.vn/sites/default/files/styles/large/public/2021-10/Can%20cuoc.jpg", // Thêm URL ảnh bằng lái xe
            customerName: customer.displayName
        });
        setShowDocuments(true);
    };
    
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
                            <th>Giấy tờ</th>
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
    <button 
        className="view-docs-button"
        onClick={() => handleViewDocuments(customer)}
    >
        <FaFileAlt style={{ marginRight: '8px' }} />
        Xem giấy tờ
    </button>
</td>
                                <td>
                                    <div className="icons">
                                        {customer.status === 'Chưa kích hoạt' && (
                                            <>
                                                <FaEdit
                                                    className="icon-edit"
                                                    onClick={() => handleActivateClick(customer.id)}
                                                />
                                                <FaTrash
                                                    className="icon-delete"
                                                    onClick={() => handleDeleteClick(customer.id)}
                                                />
                                            </>
                                        )}
                                        {customer.status === 'Đã kích hoạt' && (
                                            <FaTrash
                                                className="icon-deletee"
                                                onClick={() => handleDeleteClick(customer.id)}
                                            />
                                        )}
                                    </div>
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

{showDocuments && (
    <div className="document-modal">
        <div className="document-modal-content">
            <h2>Giấy tờ của {selectedCustomerDocs.customerName}</h2>
            <div className="document-images">
                {/* Hiển thị ảnh mặt trước và mặt sau CCCD ngang hàng */}
                <div className="document-cccd">
                    <div className="document-front">
                        <h3>Mặt trước CCCD</h3>
                        <img 
                            src={selectedCustomerDocs.frontImage} 
                            alt="CCCD mặt trước" 
                            className="document-image"
                        />
                    </div>
                    <div className="document-back">
                        <h3>Mặt sau CCCD</h3>
                        <img 
                            src={selectedCustomerDocs.backImage} 
                            alt="CCCD mặt sau" 
                            className="document-image"
                        />
                    </div>
                </div>
                {/* Hiển thị ảnh bằng lái xe ở dưới */}
                <div className="document-driver-license">
                    <h3>Bằng lái xe</h3>
                    <img 
                        src={selectedCustomerDocs.driverLicenseImage} 
                        alt="Bằng lái xe" 
                        className="document-image"
                    />
                </div>
            </div>
            <button 
                className="close-document-modal"
                onClick={() => setShowDocuments(false)}
            >
                Đóng
            </button>
        </div>
    </div>
)}


            </div>
        </div>
    );
};

export default ManageCustomer;
