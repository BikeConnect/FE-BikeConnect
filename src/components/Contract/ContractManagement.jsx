import React, { useState } from 'react';
import './ContractManagement.css';

const ContractManagement = ({ role }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Dữ liệu giả lập hợp đồng
    const contracts = [
        { id: 1, owner: 'Nguyễn Văn A', customer: 'Trần Thị B', startDate: '2024-01-01', endDate: '2024-01-10', status: 'Active' },
        { id: 2, owner: 'Lê Văn C', customer: 'Hoàng Minh D', startDate: '2024-02-01', endDate: '2024-02-15', status: 'Pending' },
        { id: 3, owner: 'Phạm Quốc E', customer: 'Nguyễn Thị F', startDate: '2024-03-05', endDate: '2024-03-12', status: 'Completed' },
    ];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredContracts = contracts.filter(
        (contract) =>
            contract.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="contract-management">
            <h1 className="title">Quản lý hợp đồng ({role === 'owner' ? 'Chủ xe' : 'Người thuê'})</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Tìm kiếm hợp đồng..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <table className="contract-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Chủ xe</th>
                        <th>Người thuê</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContracts.length > 0 ? (
                        filteredContracts.map((contract) => (
                            <tr key={contract.id}>
                                <td>{contract.id}</td>
                                <td>{contract.owner}</td>
                                <td>{contract.customer}</td>
                                <td>{contract.startDate}</td>
                                <td>{contract.endDate}</td>
                                <td>{contract.status}</td>
                                <td>
                                    {role === 'owner' ? (
                                        <>
                                            <button className="action-btn view-btn">Xem</button>
                                            <button className="action-btn edit-btn">Sửa</button>
                                            <button className="action-btn delete-btn">Xóa</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="action-btn view-btn">Xem</button>
                                            <button className="action-btn dispute-btn">Tranh chấp</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="no-data">Không tìm thấy hợp đồng</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ContractManagement;
