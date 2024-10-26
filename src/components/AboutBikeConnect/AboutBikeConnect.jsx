import React from 'react';
import diadiem from '../../assets/images/images_homePage/v994_9054.png';
import './AboutBikeConnect.css';

const AboutBikeConnect = () => {
    return (
        <div className="about-bike-connect bg-light-blue flex justify-between items-center p-8 rounded-lg mx-auto">
            <div className="text-content">
                <h2 className="text-4xl font-bold text-black mb-4">Cùng biết về Bike Connect</h2>
                <p className="text-lg text-gray-600">
                    Chào mừng bạn đến với BikeConnect - nền tảng kết nối nhanh chóng giữa người cần thuê và người cho thuê xe đạp, xe máy.
                    Hệ thống tìm kiếm thông minh giúp bạn dễ dàng tìm được chiếc xe phù hợp với nhu cầu, hoặc chia sẻ phương tiện của mình để tạo thu nhập thêm.
                    An toàn, tiện lợi, và linh hoạt - mọi thứ bạn cần đều có tại đây!
                </p>
            </div>
            <div className="image-container">
                <img src={diadiem} alt="Bike Connect" className="rounded-lg w-full h-auto" />
            </div>
        </div>
    );
};

export default AboutBikeConnect;
