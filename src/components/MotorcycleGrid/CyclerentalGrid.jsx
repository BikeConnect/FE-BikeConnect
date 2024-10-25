import React, { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './CyclerentalGrid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMotorcycle, faBicycle, faTachometerAlt, faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import thuexemay from '/CAPSTONE-BikeConnect/FE-BikeConnect/src/assets/images/images_homePage/v994_8600.png';
import thuexedap from '/CAPSTONE-BikeConnect/FE-BikeConnect/src/assets/images/images_homePage/v994_9104.png';


// BicycleCard Component
const BicycleCard = ({ data }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="card cycle-card">
        <div className="image-wrapper">
          <img src={data.image} alt={data.name} className="card-img-top cycle-image" />
        </div>
        <div className="card-body cycle-details">
          <h5 className="card-title cycle-name">{data.name}</h5>
          <p className="card-text price-section">
            <span className="current-price">{data.currentPrice}</span>
            <span className="original-price">{data.originalPrice}</span>
          </p>
          <p className="card-text cycle-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" /> {data.location}
          </p>
          <div className="cycle-footer d-flex justify-content-between">
            <div className="cycle-status">
              <FontAwesomeIcon icon={faBicycle} className="status-icon" /> {data.status}
              <span className="distance">
                <FontAwesomeIcon icon={faTachometerAlt} className="distance-icon" /> {data.distance}
              </span>
            </div>
            <div className="rating">
              {Array(5).fill().map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star" />
              ))}
              <span className="review-count">({data.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MotorcycleCard Component
const MotorcycleCard = ({ data }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="card cycle-card">
        <div className="image-wrapper">
          <img src={data.image} alt={data.name} className="card-img-top cycle-image" />
        </div>
        <div className="card-body cycle-details">
          <h5 className="card-title cycle-name">{data.name}</h5>
          <p className="card-text price-section">
            <span className="current-price">{data.currentPrice}</span>
            <span className="original-price">{data.originalPrice}</span>
          </p>
          <p className="card-text cycle-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" /> {data.location}
          </p>
          <div className="cycle-footer d-flex justify-content-between">
            <div className="cycle-status">
              <FontAwesomeIcon icon={faMotorcycle} className="status-icon" /> {data.status}
              <span className="distance">
                <FontAwesomeIcon icon={faTachometerAlt} className="distance-icon" /> {data.distance}
              </span>
            </div>
            <div className="rating">
              {Array(5).fill().map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star" />
              ))}
              <span className="review-count">({data.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// CyclerentalGrid Component
const CyclerentalGrid = () => {
  const [isMotorcycle, setIsMotorcycle] = useState(true);

  const motorcycles = Array(15).fill({
    name: 'Yamaha Exciter',
    currentPrice: '140,000 VND/ngày',
    originalPrice: '180,000 VND',
    location: '45 Lê Độ, Thanh Khê, Đà Nẵng',
    status: 'Xe mới',
    distance: '3 km',
    reviews: 65,
    image: thuexemay, // Replace with actual image path
  });

  const bicycles = Array(15).fill({
    name: 'Trek Road',
    currentPrice: '140,000 VND/ngày',
    originalPrice: '180,000 VND',
    location: '45 Lê Độ, Thanh Khê, Đà Nẵng',
    status: 'Xe mới',
    distance: '3 km',
    reviews: 65,
    image: thuexedap,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil((isMotorcycle ? motorcycles : bicycles).length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (isMotorcycle ? motorcycles : bicycles).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container-fluid rental-container">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1>Xe cho thuê</h1>
          <div className="vehicle-types btn-group">
            <button
              className={`btn ${isMotorcycle ? 'btn-primary' : 'btn-outline-secondary'} vehicle-type`}
              onClick={() => setIsMotorcycle(true)}
            >
              Xe máy
            </button>
            <button
              className={`btn ${!isMotorcycle ? 'btn-primary' : 'btn-outline-secondary'} vehicle-type`}
              onClick={() => setIsMotorcycle(false)}
            >
              Xe đạp
            </button>
          </div>
        </div>
      </div>
      <p className="text-center rental-subtitle">Được đăng tải bởi người cho thuê</p>

      <div className="row">
        {currentItems.map((item, index) => (
          isMotorcycle ? (
            <MotorcycleCard key={index} data={item} />
          ) : (
            <BicycleCard key={index} data={item} />
          )
        ))}
      </div>

      <div className="pagination d-flex justify-content-center">
        <button className="btn btn-outline-primary page-btn prev" onClick={handlePrevPage} disabled={currentPage === 1}>
          <span>‹</span>
        </button>
        <button className="btn btn-outline-primary page-btn next" onClick={handleNextPage} disabled={currentPage === totalPages}>
          <span>›</span>
        </button>
      </div>
    </div>
  );
};

export default CyclerentalGrid;
