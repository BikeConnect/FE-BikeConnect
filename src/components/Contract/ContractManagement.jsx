import React, { useState, useEffect } from 'react';
import './ContractManagement.css';

const ContractManagement = ({ role }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch contracts from API
    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const response = await fetch('localhost:8080/api/contracts');
                const data = await response.json();
                setContracts(data);
            } catch (error) {
                console.error('Error fetching contracts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContracts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDeleteContract = async (id) => {
        try {
            const response = await fetch(`localhost:8080/api/delete-contract/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Hợp đồng đã được xóa thành công.');
                setContracts((prev) => prev.filter((contract) => contract.id !== id));
            } else {
                console.error('Failed to delete contract');
            }
        } catch (error) {
            console.error('Error deleting contract:', error);
        }
    };

    const handleConfirmContract = async (id) => {
        try {
            const response = await fetch(`localhost:8080/api/confirm-contract/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    isConfirmed: true,
                    rejectReason: '',
                    ownerId: '6728c93321be3569095c4d9a',
                    customerId: '6734c11856ad8e46e382283b',
                    userType: role,
                }),
            });
            if (response.ok) {
                alert('Hợp đồng đã được xác nhận thành công.');
                setContracts((prev) =>
                    prev.map((contract) =>
                        contract.id === id ? { ...contract, status: 'Confirmed' } : contract
                    )
                );
            } else {
                console.error('Failed to confirm contract');
            }
        } catch (error) {
            console.error('Error confirming contract:', error);
        }
    };

    const filteredContracts = contracts.filter(
        (contract) =>
            contract.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                <td>{contract.ownerName}</td>
                                <td>{contract.customerName}</td>
                                <td>{contract.startDate}</td>
                                <td>{contract.endDate}</td>
                                <td>{contract.status}</td>
                                <td>
                                    {role === 'owner' ? (
                                        <>
                                            <button
                                                className="action-btn view-btn"
                                                onClick={() => console.log('Xem hợp đồng', contract.id)}
                                            >
                                                Xem
                                            </button>
                                            <button
                                                className="action-btn delete-btn"
                                                onClick={() => handleDeleteContract(contract.id)}
                                            >
                                                Xóa
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="action-btn confirm-btn"
                                            onClick={() => handleConfirmContract(contract.id)}
                                        >
                                            Xác nhận
                                        </button>
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
