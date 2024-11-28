import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash,FaFileAlt } from 'react-icons/fa';
import './ManageOwner.css';
import { useCustomer } from '../../CustomerContext';



const ManageOwner = () => {
    const { setOwnerCount } = useCustomer();
    const [searchTerm, setSearchTerm] = useState('');
    const [ownersPerPage, setOwnersPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [owners, setOwners] = useState(
        Array.from({ length: 100 }, (_, index) => ({
            id: index + 1,
            email: `owner${index + 1}@example.com`,
            registrationDate: `2024-0${(index % 12) + 1}-01`,
            displayName: `Chủ xe ${index + 1}`,
            status: index % 2 === 0 ? 'Chưa kích hoạt' : 'Đã kích hoạt',
        }))
    );

    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [activeOwnerId, setActiveOwnerId] = useState(null);
    const [showDocuments, setShowDocuments] = useState(false);
    const [selectedOwnerDocs, setSelectedOwnerDocs] = useState(null);

    useEffect(() => {
        setOwnerCount(owners.length);
    }, [owners, setOwnerCount]);

    const handleActivateClick = (id) => {
        setActiveOwnerId(id);
        setConfirmationMessage('Bạn có muốn kích hoạt tài khoản này không?');
    };

    const confirmActivate = () => {
        setOwners(owners.map(owner =>
            owner.id === activeOwnerId
                ? { ...owner, status: 'Đã kích hoạt' }
                : owner
        ));
        setConfirmationMessage('');
        setActiveOwnerId(null);
    };

    const handleDeleteClick = (id) => {
        setActiveOwnerId(id);
        setConfirmationMessage('Bạn có chắc muốn xóa tài khoản này?');
    };

    const confirmDelete = () => {
        setOwners(owners.filter(owner => owner.id !== activeOwnerId));
        setConfirmationMessage('');
        setActiveOwnerId(null);
    };

    const filteredOwners = owners.filter(owner =>
        owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastOwner = currentPage * ownersPerPage;
    const indexOfFirstOwner = indexOfLastOwner - ownersPerPage;
    const currentOwners = filteredOwners.slice(indexOfFirstOwner, indexOfLastOwner);
    const totalPages = Math.ceil(filteredOwners.length / ownersPerPage);

    const handleViewDocuments = (owner) => {
        setSelectedOwnerDocs({
            frontImage: "https://dichthuatsaigon.vn/wp-content/uploads/2022/10/dich-thuat-can-cuoc-cong-dan.jpeg",
            backImage: "https://media.vov.vn/sites/default/files/styles/large/public/2021-10/Can%20cuoc.jpg",
            ownerName: owner.displayName
        });
        setShowDocuments(true);
    };

    return (
        <div>
            <div className="manage-owner-container">
                <h1>Quản lý chủ xe</h1>
                <div className="search-sort-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm chủ xe"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <label className="sort-label">Hiện</label>
                    <select
                        value={ownersPerPage}
                        onChange={(e) => {
                            setOwnersPerPage(Number(e.target.value));
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
                    <label className="sort-label">chủ xe</label>
                </div>
                <table className="owner-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên hiển thị</th>
                            <th>Email</th>
                            <th>Ngày đăng ký</th>
                            <th>Tình trạng</th>
                            <th>Giấy tờ</th>
                            <th>Tính năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOwners.map((owner, index) => (
                            <tr key={owner.id}>
                                <td>{index + 1 + indexOfFirstOwner}</td>
                                <td>{owner.displayName}</td>
                                <td>{owner.email}</td>
                                <td>{owner.registrationDate}</td>
                                <td>
                                    <span className={`status ${owner.status === 'Đã kích hoạt' ? 'active' : 'inactive'}`}>
                                        {owner.status}
                                    </span>
                                </td>
                                <td>
    <button 
        className="view-docs-button"
        onClick={() => handleViewDocuments(owner)}
    >
        <FaFileAlt style={{ marginRight: '8px' }} />
        Xem giấy tờ
    </button>
</td>

<td>
    <div className="icons">
        {owner.status === 'Chưa kích hoạt' && (
            <>
                <FaEdit
                    className="icon-edit"
                    onClick={() => handleActivateClick(owner.id)}
                />
                <FaTrash
                    className="icon-delete"
                    onClick={() => handleDeleteClick(owner.id)}
                />
            </>
        )}
        {owner.status === 'Đã kích hoạt' && (
            <FaTrash
                className="icon-delete"
                onClick={() => handleDeleteClick(owner.id)}
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
                        <button onClick={activeOwnerId !== null && confirmationMessage.includes('kích hoạt') ? confirmActivate : confirmDelete}>
                            Xác nhận
                        </button>
                        <button onClick={() => setConfirmationMessage('')}>Hủy</button>
                    </div>
                )}
                {showDocuments && (
                    <div className="document-modal">
                        <div className="document-modal-content">
                            <h2>Giấy tờ của {selectedOwnerDocs.ownerName}</h2>
                            <div className="document-images">
                                <div className="document-front">
                                    <h3>Mặt trước CCCD</h3>
                                    <img
                                        src={selectedOwnerDocs.frontImage}
                                        alt="CCCD mặt trước"
                                        className="document-image"
                                    />
                                </div>
                                <div className="document-back">
                                    <h3>Mặt sau CCCD</h3>
                                    <img
                                        src={selectedOwnerDocs.backImage}
                                        alt="CCCD mặt sau"
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

export default ManageOwner;
