import React, { useState } from 'react';
import './NameService.css';
import HeaderNoLogin from '../Header/HeaderNoLogin';
import HeaderAfterLogin from '../Header/HeaderAfterLogin';

const NameService = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially set to false

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="service-name">
      <div className="title-container">
        <h1 className="title">Cộng Đồng Những Người Thuê Và Cho Thuê Xe</h1>
      </div>
    </div>
  );
};

export default NameService;