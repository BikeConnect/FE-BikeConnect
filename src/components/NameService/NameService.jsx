import React, { useState } from 'react';
import './NameService.css';

const NameService = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="service-name">
      <div className="title-container">
        <h1 className="titleName">Cộng Đồng Những Người Thuê Và Cho Thuê Xe</h1>
      </div>
    </div>
  );
};

export default NameService;