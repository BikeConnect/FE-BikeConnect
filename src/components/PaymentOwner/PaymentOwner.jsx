import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import './PaymentOwner.css';
import NavBar from '../NavBar/NavBar';

const PaymentOwner = () => {
  const [bankAccount] = useState({
    name: 'CONG TY BIKECONNECT',
    bank: 'Ngân Hàng TMCP Công Thương Việt Nam (VietinBank)',
    accountNumber: '1020106723403',
    branch: 'Chi Nhánh Trung Tâm'
  });

  const [paymentHistory] = useState([
    { 
      month: 'Tháng 1/2024', 
      amount: 500000, 
      status: 'Đã thanh toán', 
      date: '15/01/2024',
      icon: <CheckCircle color="green" />
    },
    { 
      month: 'Tháng 2/2024', 
      amount: 500000, 
      status: 'Chưa thanh toán', 
      date: '15/02/2024',
      icon: <AlertCircle color="red" />
    }
  ]);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankAccount.accountNumber);
    alert('Đã sao chép số tài khoản');
  };

  return (
    <div className="container">
      <NavBar></NavBar>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Thanh Toán Thuê Xe - Chuyển Khoản Ngân Hàng</h2>
        </div>
        <div className="card-content">
          <div className="space-y-4">
            {/* Thông tin tài khoản ngân hàng */}
            <div className="border">
              <h3 className="font-semibold">Thông Tin Tài Khoản Ngân Hàng</h3>
              <div className="grid grid-cols-2">
                <div>
                  <label>Tên Tài Khoản</label>
                  <input type="text" value={bankAccount.name} readOnly />
                </div>
                <div>
                  <label>Số Tài Khoản</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" value={bankAccount.accountNumber} readOnly />
                    <button onClick={handleCopyAccount}>📋</button>
                  </div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label>Ngân Hàng</label>
                  <input type="text" value={bankAccount.bank} readOnly />
                </div>
              </div>
            </div>

            {/* Mã QR thanh toán */}
            <div className="border">
              <h3 className="font-semibold">Mã QR Thanh Toán</h3>
              <div className="qr-image">
                <img 
                  src="https://qrcode-gen.com/images/qrcode-default.png"
                  alt="Mã QR Thanh Toán" 
                />
              </div>
            </div>

            {/* Lịch sử thanh toán */}
            <div>
              <h3 className="font-semibold">Lịch Sử Thanh Toán</h3>
              <div className="border">
                <div className="grid grid-cols-4 bg-gray-100">
                  <div>Tháng</div>
                  <div>Ngày Thanh Toán</div>
                  <div>Số Tiền</div>
                  <div>Trạng Thái</div>
                </div>
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="grid grid-cols-4">
                    <div>{payment.month}</div>
                    <div>{payment.date}</div>
                    <div>{payment.amount.toLocaleString()} VND</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {payment.icon}
                      <span style={{ color: payment.status === 'Đã thanh toán' ? 'green' : 'red' }}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOwner;
