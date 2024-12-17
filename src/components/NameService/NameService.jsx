import React, { useState } from "react";
import "./NameService.css";

const NameService = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="service-name">
      <img
        src={require("../../assets/images/images_homePage/Background.jpg")}
        alt="Background"
        className="background-image"
      />
      <figure className="title-container">
        <h1 className="titleName">Khám Phá Việt Nam Trên Bánh Xe</h1>
        <p className="button-detail">Tìm chuyến đi hoàn hảo của bạn</p>
        <button className="discover-button">Khám Phá</button>
      </figure>
    </div>
  );
};

export default NameService;
