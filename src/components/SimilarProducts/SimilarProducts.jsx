import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMotorcycle, faBicycle, faTachometerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import './SimilarProducts.css';


const SimilarProducts = ({ products, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < products.length - itemsPerPage ? prevIndex + 1 : prevIndex
    );
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="container-fluid rental-container">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h2>Sản phẩm tương tự</h2>
        </div>
      </div>
      <div className="row">
        {visibleProducts.map((product, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card cycle-card">
              <div className="image-wrapper">
                <img src={product.image} alt={product.name} className="card-img-top cycle-image" />
              </div>
              <div className="card-body cycle-details">
                <h5 className="card-title cycle-name">{product.name}</h5>
                <p className="card-text price-section">
                  <span className="current-price">{product.currentPrice}</span>
                  <span className="original-price">{product.originalPrice}</span>
                </p>
                <p className="card-text cycle-location">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" /> {product.location}
                </p>
                <div className="cycle-footer d-flex justify-content-between">
                  <div className="cycle-status">
                    <FontAwesomeIcon
                      icon={type === 'motorcycle' ? faMotorcycle : faBicycle}
                      className="status-icon"
                    />{' '}
                    {product.status}
                    <span className="distance">
                      <FontAwesomeIcon icon={faTachometerAlt} className="distance-icon" /> {product.distance}
                    </span>
                  </div>
                  <div className="rating">
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} className="star" />
                      ))}
                    <span className="review-count">({product.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination d-flex justify-content-center">
        <button
          className="btn btn-outline-primary page-btn prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <span>‹</span>
        </button>
        <button
          className="btn btn-outline-primary page-btn next"
          onClick={handleNext}
          disabled={currentIndex >= products.length - itemsPerPage}
        >
          <span>›</span>
        </button>
      </div>
    </div>
  );
};

export default SimilarProducts;