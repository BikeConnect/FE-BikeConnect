import React, { useState } from 'react';
import './CreateContract.css';

const CreateContract = () => {
    const [contractData, setContractData] = useState({
        customerId: '',
        postId: '',
        ownerId: '',
        startDate: '',
        endDate: '',
        totalAmount: '',
        terms: '',
    });
    const [error, setError] = useState('');
    const [contractResult, setContractResult] = useState(null); // Lưu kết quả hợp đồng tạo thành công

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContractData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError(''); // Reset lỗi khi người dùng chỉnh sửa
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu
        if (new Date(contractData.startDate) >= new Date(contractData.endDate)) {
            setError('Ngày kết thúc phải sau ngày bắt đầu.');
            return;
        }

        if (contractData.totalAmount <= 0) {
            setError('Số tiền phải lớn hơn 0.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/create-contract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contractData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Hợp đồng đã được tạo thành công!');
                setContractResult(result.contract); // Lưu thông tin hợp đồng
                setContractData({
                    customerId: '',
                    postId: '',
                    ownerId: '',
                    startDate: '',
                    endDate: '',
                    totalAmount: '',
                    terms: '',
                });
                setError('');
            } else {
                setError(result.message || 'Lỗi không xác định từ máy chủ');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            setError(`Không thể kết nối đến máy chủ: ${error.message}`);
        }
    };

    return (
        <div className="create-contract-container">
            <div className="create-contract">
                <h1 className="title">Tạo Hợp Đồng</h1>
                <form onSubmit={handleSubmit} className="contract-form">
                    <div className="form-group">
                        <label>ID khách hàng:</label>
                        <input
                            type="text"
                            name="customerId"
                            value={contractData.customerId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>ID bài đăng:</label>
                        <input
                            type="text"
                            name="postId"
                            value={contractData.postId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>ID chủ xe:</label>
                        <input
                            type="text"
                            name="ownerId"
                            value={contractData.ownerId}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label>Số tiền:</label>
                        <input
                            type="number"
                            name="totalAmount"
                            value={contractData.totalAmount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Điều khoản:</label>
                        <textarea
                            name="terms"
                            value={contractData.terms}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="submit-btn">Tạo Hợp Đồng</button>
                </form>

                {/* Hiển thị kết quả hợp đồng nếu tạo thành công */}
                {contractResult && (
                    <div className="contract-result">
                        <h2>Hợp Đồng Được Tạo Thành Công</h2>
                        <p><strong>Mã hợp đồng:</strong> {contractResult.contractNumber}</p>
                        <p><strong>ID khách hàng:</strong> {contractResult.customerId}</p>
                        <p><strong>ID bài đăng:</strong> {contractResult.postId}</p>
                        <p><strong>ID chủ xe:</strong> {contractResult.ownerId}</p>
                        <p><strong>Ngày bắt đầu:</strong> {new Date(contractResult.startDate).toLocaleDateString()}</p>
                        <p><strong>Ngày kết thúc:</strong> {new Date(contractResult.endDate).toLocaleDateString()}</p>
                        <p><strong>Số tiền:</strong> {contractResult.totalAmount}</p>
                        <p><strong>Điều khoản:</strong> {contractResult.terms}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateContract;
