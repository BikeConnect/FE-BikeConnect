import React from "react";
import "./ServiceGrid.css";

const ServiceGrid = () => {
  return (
    <div className="container mt-5 service-grid">
      <h2 className="service-title">Dịch vụ chúng tôi có ở mọi nơi</h2>
      <div className="service-container">
        <div className="service-item item-figure-DaNang">
          <img
            src={require("../../assets/images/images_homePage/HCM.jpg")}
            alt="Hồ Chí Minh"
            className="service-item-DaNang"
          />
          <div className="city-name-DaNang">Hồ Chí Minh</div>
        </div>
        <div className="service-item item-group-HCMHaNoi">
          <figure className="item-figure-SaiGon">
            <img
              src={require("../../assets/images/images_homePage/DaNang.jpg")}
              alt="Đà Nẵng"
              className="service-item-SaiGon"
            />
            <div className="city-name-SaiGon">Đà Nẵng</div>
          </figure>
          <figure className="item-figure-HaNoi">
            <img
              src={require("../../assets/images/images_homePage/HaNoi.jpg")}
              alt="Hà Nội"
              className="service-item-HaNoi"
            />
            <div className="city-name-HaNoi">Hà Nội</div>
          </figure>
        </div>
        <div className="service-item item-figure-HaiPhong">
          <img
            src={require("../../assets/images/images_homePage/PhuQuoc.avif")}
            alt="Phú Quốc"
            className="service-item-HaiPhong"
          />
          <div className="city-name-HaiPhong">Phú Quốc</div>
        </div>
        <div className="service-item item-group-HCMHaNoi">
          <figure className="item-figure-SaiGon">
            <img
              src={require("../../assets/images/images_homePage/HoiAn.avif")}
              alt="Hội An"
              className="service-item-SaiGon"
            />
            <div className="city-name-SaiGon">Hội An</div>
          </figure>
          <figure className="item-figure-HaNoi">
            <img
              src={require("../../assets/images/images_homePage/Hue.jpg")}
              alt="Huế"
              className="service-item-HaNoi"
            />
            <div className="city-name-HaNoi">Huế</div>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;
