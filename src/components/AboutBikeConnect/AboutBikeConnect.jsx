import React from 'react';
import diadiem from '../../assets/images/images_homePage/v994_9046.png';
import './AboutBikeConnect.css';

const AboutBikeConnect = () => {
    return (
        <div className="about-bike-connect p-8 bg-blue-50 rounded-lg flex items-center space-x-8">
            <div className="text-content">
                <h2 className="text-3xl font-bold mb-4">Cùng biết về Bike Connect</h2>
                <p className="text-lg text-gray-700">
                    Chào mừng bạn đến với BikeConnect - nền tảng kết nối nhanh chóng giữa người cần thuê và người cho thuê xe đạp, xe máy.
                    Hệ thống tìm kiếm thông minh, bạn có thể dễ dàng tìm được chiếc xe phù hợp với nhu cầu của mình, hoặc chia sẻ phương tiện của bạn để tạo thu nhập thêm.
                    An toàn, tiện lợi, và linh hoạt - mọi thứ bạn cần đều có tại đây!
                </p>
            </div>
            <div className="image-container">
                <img src={diadiem} alt="Bike Connect" className="rounded-lg" />
            </div>
        </div>
    );
};

export default AboutBikeConnect;