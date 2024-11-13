import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CyclerentalGrid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMotorcycle, faBicycle, faTachometerAlt, faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import thuexemay from '../../assets/images/images_homePage/v994_8600.png';
import thuexedap from '../../assets/images/images_homePage/v994_9104.png';
import { Link } from 'react-router-dom';

const BicycleCard = ({ data }) => {
    return (
        <Link to={`/BikeDetail/${data.name}`} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card rental-card">
                <div className="rental-image-wrapper">
                    <img src={data.image} alt={data.name} className="card-img-top rental-image" />
                </div>
                <div className="card-body rental-details">
                    <h5 className="card-title rental-name">{data.name}</h5>
                    <p className="card-text rental-price-section">
                        <span className="rental-current-price">{data.currentPrice}</span>
                        <span className="rental-original-price">{data.originalPrice}</span>
                    </p>
                    <p className="card-text rental-location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" /> {data.location}
                    </p>
                    <div className="rental-footer d-flex justify-content-between">
                        <div className="rental-status">
                            <FontAwesomeIcon icon={faBicycle} className="status-icon" /> {data.status}
                            <span className="rental-distance">
                                <FontAwesomeIcon icon={faTachometerAlt} className="distance-icon" /> {data.distance}
                            </span>
                        </div>
                        <div className="rental-rating">
                            {Array(5).fill().map((_, index) => (
                                <FontAwesomeIcon key={index} icon={faStar} className="rental-star" />
                            ))}
                            <span className="rental-review-count">({data.reviews})</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const MotorcycleCard = ({ data }) => {
    return (
        <Link to={`/BikeDetail/${data.name}`} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card rental-card">
                <div className="rental-image-wrapper">
                    <img src={data.image} alt={data.name} className="card-img-top rental-image" />
                </div>
                <div className="card-body rental-details">
                    <h5 className="card-title rental-name">{data.name}</h5>
                    <p className="card-text rental-price-section">
                        <span className="rental-current-price">{data.currentPrice}</span>
                        <span className="rental-original-price">{data.originalPrice}</span>
                    </p>
                    <p className="card-text rental-location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" /> {data.location}
                    </p>
                    <div className="rental-footer d-flex justify-content-between">
                        <div className="rental-status">
                            <FontAwesomeIcon icon={faMotorcycle} className="status-icon" /> {data.status}
                            <span className="rental-distance">
                                <FontAwesomeIcon icon={faTachometerAlt} className="distance-icon" /> {data.distance}
                            </span>
                        </div>
                        <div className="rental-rating">
                            {Array(5).fill().map((_, index) => (
                                <FontAwesomeIcon key={index} icon={faStar} className="rental-star" />
                            ))}
                            <span className="rental-review-count">({data.reviews})</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

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
        image: thuexemay,
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
        <div className="container-fluid rental-grid-container">
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h1>Xe cho thuê</h1>
                    <div className="rental-type-buttons btn-group">
                        <button
                            className={`btn ${isMotorcycle ? 'btn-primary' : 'btn-outline-secondary'} rental-type-button`}
                            onClick={() => setIsMotorcycle(true)}
                        >
                            Xe máy
                        </button>
                        <button
                            className={`btn ${!isMotorcycle ? 'btn-primary' : 'btn-outline-secondary'} rental-type-button`}
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

            <div className="rental-pagination d-flex justify-content-center">
                <button
                    className="btn btn-outline-primary rental-page-btn rental-prev-btn"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    <span>‹</span>
                </button>
                <button
                    className="btn btn-outline-primary rental-page-btn rental-next-btn"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <span>›</span>
                </button>
            </div>
        </div>
    );
};

export default CyclerentalGrid;
