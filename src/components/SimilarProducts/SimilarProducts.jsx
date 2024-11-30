import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faMotorcycle,
  faBicycle,
  faTachometerAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "./SimilarProducts.css";

const SimilarProducts = ({ products, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  // Kiểm tra nếu không có products hoặc products rỗng
  if (!products || products.length === 0) {
    return (
      <div className="container-fluid rental-similar-container">
        <div className="row">
          <div className="col-12">
            <h2>Sản phẩm tương tự</h2>
            <p className="text-center text-muted">Không có sản phẩm tương tự</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < products.length - itemsPerPage ? prevIndex + 1 : prevIndex
    );
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div className="container-fluid rental-similar-container">
      <div className="row">
        <div className="col-12">
          <h2 className="similar-products-title">Sản phẩm tương tự</h2>
        </div>
      </div>
      <div className="row">
        {visibleProducts.map((product, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12">
            <div className="card similar-card">
              <figure className="image-wrapper">
                <img
                  src={product.image || "placeholder-image.jpg"} // Thêm ảnh placeholder
                  alt={product.name || "Xe"}
                  className="card-img-top similar-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "placeholder-image.jpg"; // Fallback image
                  }}
                />
              </figure>
              <div className="card-body cycle-details">
                <h5 className="similar-cycle-name">
                  {product.name || "Chưa có tên"}
                </h5>
                <p className="card-text price-section">
                  <span className="current-price">
                    {product.currentPrice || "0 VND/ngày"}
                  </span>
                  {product.originalPrice && (
                    <span className="original-price">
                      {product.originalPrice}
                    </span>
                  )}
                </p>
                <p className="card-text similar-cycle-location">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="location-icon"
                  />
                  {product.location || "Chưa có địa chỉ"}
                </p>
                <div className="cycle-footer d-flex justify-content-between">
                  <div className="cycle-status">
                    <FontAwesomeIcon
                      icon={type === "motorcycle" ? faMotorcycle : faBicycle}
                      className="status-icon"
                    />
                    {product.status || "Chưa xác định"}
                  </div>
                  <div className="rating">
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar}
                          className={`star ${
                            index < (product.reviews || 0) ? "active" : ""
                          }`}
                        />
                      ))}
                    <span className="review-count">
                      ({product.reviews || 0})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length > itemsPerPage && (
        <div className="pagination d-flex justify-content-center">
          <button
            className="btn btn-outline-primary page-btn prev similar-prev-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="similar-chevron-left"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </button>
          <button
            className="btn btn-outline-primary page-btn next similar-next-btn"
            onClick={handleNext}
            disabled={currentIndex >= products.length - itemsPerPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="similar-chevron-right"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;
