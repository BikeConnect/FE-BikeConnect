import React, { useState } from 'react';
import './NameService.css';
import HeaderNoLogin from '../Header/HeaderNoLogin';
import HeaderAfterLogin from '../Header/HeaderAfterLogin';

const NameService = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mặc định là người dùng đã đăng nhập

  const handleLogout = () => {
    setIsLoggedIn(false); // Đổi trạng thái thành chưa đăng nhập
  };

  return (
    <div className="service-name">
      {isLoggedIn ? (
        <HeaderAfterLogin onLogout={handleLogout} /> // Truyền hàm handleLogout
      ) : (
        <HeaderNoLogin />
      )}
      <div className="title-container">
        <h1 className="title">Cộng Đồng Những Người Thuê Và Cho Thuê Xe</h1>
      </div>
    </div>
  );
};

export default NameService;
