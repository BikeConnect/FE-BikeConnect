import React, { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  User, 
  Search,
  Shield,
  Clock,
  DollarSign,
  Timer
} from 'lucide-react';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewTransactionHistory.css';

// Mock data - trong thực tế sẽ lấy từ backend
const mockTransactions = [
  {
    id: 1,
    ownerName: "Nguyễn Văn A",
    startDate: "2024-01-15",
    usedMonths: 3,
    status: "Đã thanh toán",
    remainingDays: 20
  },
  {
    id: 2,
    ownerName: "Trần Thị B",
    startDate: "2024-02-20", 
    usedMonths: 1,
    status: "Đang chờ",
    remainingDays: null
  },
  {
    id: 3,
    ownerName: "Lê Văn C",
    startDate: "2024-03-10", 
    usedMonths: 2,
    status: "Đã thanh toán",
    remainingDays: 45
  },
];

const ViewTransactionHistory = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filter, setFilter] = useState({
    status: '',
    searchName: ''
  });

  // Hàm format tiền tệ
  const formatCurrency = (amount = 400000) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount);
  };

  // Hàm lọc giao dịch
  const filteredTransactions = transactions.filter(transaction => {
    const statusMatch = !filter.status || transaction.status === filter.status;
    const nameMatch = !filter.searchName || 
      transaction.ownerName.toLowerCase().includes(filter.searchName.toLowerCase());
    return statusMatch && nameMatch;
  });

  return (
    <div className="d-flex">
      <NavbarDashboard />
      <div className="transaction-history-page" style={{ marginLeft: '10%', width: '90%' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <Shield className="me-2 text-primary" size={24} /> 
                    <h2 className="card-title mb-0">Lịch Sử Giao Dịch Thuê Xe</h2>
                  </div>
                </div>
                
                <div className="card-body">
                  {/* Cải thiện phần tìm kiếm */}
                  {/* <div className="search-filter-container">
                    <div className="search-box">
                      <Search size={18} className="search-icon" />
                      <input 
                        type="text" 
                        placeholder="Tìm kiếm theo tên chủ xe..."
                        value={filter.searchName}
                        onChange={(e) => setFilter({...filter, searchName: e.target.value})}
                      />
                    </div>
                    <select 
                      className="status-select"
                      value={filter.status}
                      onChange={(e) => setFilter({...filter, status: e.target.value})}
                    >
                      <option value="">Tất cả trạng thái</option>
                      <option value="Đã thanh toán">Đã thanh toán</option>
                      <option value="Đang chờ">Đang chờ</option>
                    </select>
                  </div> */}

                  {/* Bảng với đường viền đầy đủ */}
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">
                            <div className="d-flex align-items-center">
                              <User size={18} className="me-2" />
                              <span>Chủ Xe</span>
                            </div>
                          </th>
                          <th scope="col">
                            <div className="d-flex align-items-center">
                              <Calendar size={18} className="me-2" />
                              <span>Ngày Bắt Đầu</span>
                            </div>
                          </th>
                          <th scope="col">
                            <div className="d-flex align-items-center">
                              <Clock size={18} className="me-2" />
                              <span>Số Tháng Đã Sử Dụng</span>
                            </div>
                          </th>
                          <th scope="col">
                            <div className="d-flex align-items-center">
                              <DollarSign size={18} className="me-2" />
                              <span>Số Tiền</span>
                            </div>
                          </th>
                          <th scope="col">
                            <div className="d-flex align-items-center">
                              <FileText size={18} className="me-2" />
                              <span>Trạng Thái</span>
                            </div>
                          </th>
                          <th scope="col">
                            <div className="d-flex align-items-center">
                              <Timer size={18} className="me-2" />
                              <span>Ngày Còn Lại</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td>{transaction.ownerName}</td>
                            <td>{transaction.startDate}</td>
                            <td>{transaction.usedMonths} tháng</td>
                            <td className="text-success fw-semibold">{formatCurrency()}</td>
                            <td>
                              <span className={`badge ${
                                transaction.status === 'Đã thanh toán' 
                                  ? 'bg-success' 
                                  : 'bg-warning'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                            <td>
                              {transaction.status === 'Đã thanh toán' 
                                ? `${transaction.remainingDays} ngày` 
                                : 'Chưa xác định'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer với tổng kết */}
                  <div className="card-footer mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">
                        Tổng số giao dịch: {filteredTransactions.length}
                      </span>
                      <span className="fw-semibold text-success">
                        Tổng số tiền: {formatCurrency(filteredTransactions.length * 400000)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionHistory;