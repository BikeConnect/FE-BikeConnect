import React from 'react';
import './ServiceGrid.css';

const ServiceGrid = () => {
    const locations = [
        { name: 'Hà Nội', image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg' },
        { name: 'Hà Tĩnh', image: 'https://images.vietnamtourism.gov.vn/vn/images/2015/04.jpg' },
        { name: 'Đà Nẵng', image: 'https://images2.thanhnien.vn/zoom/686_429/Uploaded/nguyentu/2018_11_12/sacmaudanang-maithanhchuong_CBMJ.jpg' },
        { name: 'Hồ Chí Minh', image:'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474076PRq/hinh-anh-thanh-pho-ho-chi-minh-ve-dem_031033761.jpg' },
    ];

    return (
        <div className="container mt-5 service-grid">
            <h2 className="text-center mb-4">Dịch vụ chúng tôi có ở mọi nơi</h2>
            <div className="row">
                {locations.map((location, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                        <div className="card">
                            <img src={location.image} className="card-img-top" alt={location.name} />
                            <div className="card-body">
                                <h5 className="card-title">{location.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceGrid;
