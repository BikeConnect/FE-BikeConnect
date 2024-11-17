import React, { useState } from 'react';
import './CreateContract.css';

const CreateContract = () => {
    const [role, setRole] = useState('owner');
    const [contractData, setContractData] = useState({
        ownerName: role === 'owner' ? 'Chủ xe (Bạn)' : '',
        customerName: role === 'customer' ? 'Người thuê (Bạn)' : '',
        startDate: '',
        endDate: '',
        vehicleDetails: '',
        terms: '',
    });
    const [fakeDatabase, setFakeDatabase] = useState([]);
    const [error, setError] = useState('');

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setContractData((prev) => ({
            ...prev,
            ownerName: newRole === 'owner' ? 'Chủ xe (Bạn)' : '',
            customerName: newRole === 'customer' ? 'Người thuê (Bạn)' : '',
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContractData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const today = new Date();
        const startDate = new Date(contractData.startDate);
        const endDate = new Date(contractData.endDate);

        if (startDate < today) {
            setError('Ngày bắt đầu không được là ngày trong quá khứ.');
            return;
        }

        if (endDate <= startDate) {
            setError('Ngày kết thúc phải sau ngày bắt đầu.');
            return;
        }

        console.log('Submitted contract:', contractData);
        setFakeDatabase((prev) => [...prev, contractData]);

        alert('Hợp đồng đã được tạo thành công!');
        console.log('Fake Database:', fakeDatabase);
        setError('');
    };

    return (
        <div className="create-contract-container">
            <div className="create-contract">
                <h1 className="title">Tạo Hợp Đồng ({role === 'owner' ? 'Chủ xe' : 'Người thuê'})</h1>
                <form onSubmit={handleSubmit} className="contract-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Chủ xe:</label>
                            <input
                                type="text"
                                name="ownerName"
                                value={contractData.ownerName}
                                onChange={handleChange}
                                placeholder="Tên chủ xe"
                                disabled={role === 'owner'}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Người thuê:</label>
                            <input
                                type="text"
                                name="customerName"
                                value={contractData.customerName}
                                onChange={handleChange}
                                placeholder="Tên người thuê"
                                disabled={role === 'customer'}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Ngày bắt đầu:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={contractData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày kết thúc:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={contractData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Thông tin xe:</label>
                            <textarea
                                name="vehicleDetails"
                                value={contractData.vehicleDetails}
                                onChange={handleChange}
                                placeholder="Chi tiết xe được thuê (biển số, loại xe, màu sắc,...)"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Điều khoản hợp đồng:</label>
                            <textarea
                                name="terms"
                                value={contractData.terms}
                                onChange={handleChange}
                                placeholder="Điều khoản hợp đồng (ví dụ: trách nhiệm, phạt,...)"
                                required
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-btn">
                        Tạo Hợp Đồng
                    </button>
                </form>
            </div>
            <div className="role-buttons">
                <button
                    className={`role-button ${role === 'owner' ? 'active' : ''}`}
                    onClick={() => handleRoleChange('owner')}
                >
                    Chủ xe
                </button>
                <button
                    className={`role-button ${role === 'customer' ? 'active' : ''}`}
                    onClick={() => handleRoleChange('customer')}
                >
                    Khách thuê
                </button>
            </div>
        </div>
    );
};

export default CreateContract;
