import React from 'react';
import bikeImage from '../../assets/images/images_homePage/v994_9054.png';
import './AboutBikeConnect.css';

const AboutBikeConnect = () => {
    return (
        <div className="about-bike-container bg-light-blue flex justify-between items-center p-8 rounded-lg mx-auto">
            <div className="about-bike-text">
                <h2 className="about-bike-title">Cùng biết về Bike Connect</h2>
                <p className="about-bike-description">
                    Chào mừng bạn đến với BikeConnect - nền tảng kết nối nhanh chóng giữa người cần thuê và người cho thuê xe đạp, xe máy.
                    Hệ thống tìm kiếm thông minh giúp bạn dễ dàng tìm được chiếc xe phù hợp với nhu cầu, hoặc chia sẻ phương tiện của mình để tạo thu nhập thêm.
                    An toàn, tiện lợi, và linh hoạt - mọi thứ bạn cần đều có tại đây!
                </p>
            </div>
            <div className="about-bike-image">
                <img src={bikeImage} alt="Bike Connect" className="about-bike-img" />
            </div>
        </div>
    );
};

export default AboutBikeConnect;
