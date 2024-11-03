import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ManageOwner.css';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';
import { useCustomer } from '../CustomerContext';

const ManageOwner = () => {
    const { setOwnerCount } = useCustomer();
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10); // Số lượng hiển thị mỗi trang
    const [currentPage, setCurrentPage] = useState(1);

    const owners = Array.from({ length: 40 }, (_, index) => ({
        id: index + 1,
        email: `owner${index + 1}@example.com`,
        password: `password${index + 1}`,
        registrationDate: `2024-0${(index % 12) + 1}-01`,
        displayName: `Chủ xe ${index + 1}`,
        status: 'Còn hoạt động',
    }));

    const [filteredOwners, setFilteredOwners] = useState(owners);
    const [showModal, setShowModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [selectedOwner, setSelectedOwner] = useState(null);

    useEffect(() => {
        setOwnerCount(owners.length);
        setFilteredOwners(owners);
    }, [owners, setOwnerCount]);

    const handleSearch = (e) => {
        const term = e.target.value; // Giữ nguyên giá trị tìm kiếm
        setSearchTerm(term);
        setCurrentPage(1); // Reset trang khi tìm kiếm
        setFilteredOwners(owners.filter(owner =>
            owner.email.includes(term) ||
            owner.displayName.includes(term)
        ));
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1); // Reset trang khi thay đổi số lượng hiển thị
    };

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };

    const handleEdit = (owner) => {
        setSelectedOwner(owner);
        setConfirmAction('edit');
        setShowModal(true);
    };

    const handleDelete = (owner) => {
        setSelectedOwner(owner);
        setConfirmAction('delete');
        setShowModal(true);
    };

    const handleConfirm = () => {
        if (confirmAction === 'edit') {
            const updatedStatus = selectedOwner.status === 'Còn hoạt động' ? 'Hết hoạt động' : 'Còn hoạt động';
            selectedOwner.status = updatedStatus;
        } else if (confirmAction === 'delete') {
            alert(`Đã xóa tài khoản chủ xe với ID: ${selectedOwner.id}`);
        }
        setShowModal(false);
        setConfirmAction(null);
        setSelectedOwner(null);
    };

    // Xác định danh sách chủ xe hiện tại dựa trên trang và số lượng
    const indexOfLastOwner = currentPage * itemsPerPage;
    const indexOfFirstOwner = indexOfLastOwner - itemsPerPage;
    const currentOwners = filteredOwners.slice(indexOfFirstOwner, indexOfLastOwner);

    const totalPages = Math.ceil(filteredOwners.length / itemsPerPage);

    return (
        <div>
            <NavbarDashboard />
            <div className="manage-owner-container">
                <h1>Quản lý tài khoản chủ xe</h1>
                <input
                    type="text"
                    placeholder="Tìm kiếm chủ xe..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <div className="pagination-container">
                    <span>Hiện </span>
                    <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="items-per-page-select">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </select>
                    <span> chủ xe</span>
                </div>
                <table className="owner-table">
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
                        {currentOwners.map((owner, index) => (
                            <tr key={owner.id}>
                                <td>{index + 1 + indexOfFirstOwner}</td>
                                <td>{owner.displayName}</td>
                                <td>{owner.email}</td>
                                <td>{owner.password.replace(/.(?=.{4})/g, '*')}</td>
                                <td>{owner.registrationDate}</td>
                                <td>
                                    <span className={`status ${owner.status === 'Còn hoạt động' ? 'active' : 'inactive'}`}>
                                        {owner.status}
                                    </span>
                                </td>
                                <td>
                                    <FaEdit className="icon" onClick={() => handleEdit(owner)} />
                                    <FaTrash className="icon" onClick={() => handleDelete(owner)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                    <div className="confirmation-modal">
                        <p>
                            {confirmAction === 'edit'
                                ? `Bạn có muốn thay đổi Tình trạng người dùng thành ${selectedOwner.status === 'Còn hoạt động' ? 'Hết hoạt động' : 'Còn hoạt động'} không?`
                                : 'Bạn có chắc xóa tài khoản khách hàng này?'}
                        </p>
                        <button onClick={handleConfirm}>Xác nhận</button>
                        <button onClick={() => setShowModal(false)}>Hủy</button>
                    </div>
                )}

                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePaginationClick(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageOwner;
