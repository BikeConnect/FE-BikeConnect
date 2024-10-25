import React from 'react';
import './ServiceGrid.css';
import diadiem from '/CAPSTONE-BikeConnect/FE-BikeConnect/src/assets/images/images_homePage/v994_9237.png';

const services = [
  { id: 1, location: "Hà Nội", users: 1000, image: diadiem, shape: 'large-rect' },
  { id: 2, location: "Nghệ An", users: 1000, image: diadiem, shape: 'small-square' },
  { id: 3, location: "Hà Nội", users: 1000, image: diadiem, shape: 'small-square' },
  { id: 4, location: "Nghệ An", users: 1000, image: diadiem, shape: 'large-rect' }
];

const ServiceGrid = () => {
  return (
    <div className="outer-container">
      <div className="inner-container">
        <h2 className="text-center">Dịch vụ chúng tôi có ở nhiều nơi</h2>
        <div className="service-grid">
          {services.map((service) => (
            <div key={service.id} className={`service-card ${service.shape}`}>
              <img src={service.image} alt={service.location} />
              <div className="overlay">
                <p>{service.users} người dùng</p>
                <h3>{service.location}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;