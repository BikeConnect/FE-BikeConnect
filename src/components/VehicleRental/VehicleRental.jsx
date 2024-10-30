import React, { useState } from 'react';
import './VehicleRental.css';
import LocationModal from '../LocationModal/LocationModal';
import TimePickerModal from '../TimePickerModal/TimePickerModal';
import hinhanhxe1 from '../../assets/images/images_homePage/v994_8600.png';
import hinhanhxe2 from '../../assets/images/images_homePage/v994_9054.png';

const VehicleRental = () => {
    const [selectedMainImage, setSelectedMainImage] = useState(0);
    const [isAvailable, setIsAvailable] = useState(true);
    const [pickupLocation, setPickupLocation] = useState('Tại cửa hàng');
    const [dropoffLocation, setDropoffLocation] = useState('Tại cửa hàng');
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
    const [activeLocationField, setActiveLocationField] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);

    const images = [
        hinhanhxe1,
        hinhanhxe2,
        hinhanhxe1,
        hinhanhxe1,
        hinhanhxe1,
    ];

    const handlePreviousImage = () => {
        setSelectedMainImage((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setSelectedMainImage((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const fees = {
        baseRate: 140000,
        insurance: 10000,
        depositFee: 145600,
        transportationFee: pickupLocation !== 'Tại cửa hàng' || dropoffLocation !== 'Tại cửa hàng' ? 50000 : 0, // Phí vận chuyển
    };

    const calculateRentalDays = () => {
        if (selectedDates.length === 0) return 0;
        const startDate = new Date(selectedDates[0]);
        const endDate = new Date(selectedDates[selectedDates.length - 1]);
        const timeDifference = endDate - startDate;
        return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    };

    const calculateTotal = () => {
        const rentalDays = calculateRentalDays();
        const rentalFee = fees.baseRate * rentalDays;
        return Object.values(fees).reduce((sum, fee) => sum + fee, rentalFee);
    };

    const handleLocationSelect = (location) => {
        if (activeLocationField === 'pickup') {
            setPickupLocation(location);
        } else {
            setDropoffLocation(location);
        }
        setIsLocationModalOpen(false);
    };

    const openLocationModal = (field) => {
        setActiveLocationField(field);
        setIsLocationModalOpen(true);
    };

    const handleDateSelect = (dates) => {
        setSelectedDates(dates);
        setIsTimeModalOpen(false);
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="image-gallery">
                        <div className="main-image mb-3">
                            <img src={images[selectedMainImage]} alt="Honda SH 150 ABS" className="img-fluid" />
                            {/* Nút Previous */}
                            <button className="image-nav-button previous-button" onClick={handlePreviousImage}>
                                &#9664;
                            </button>

                            {/* Nút Next */}
                            <button className="image-nav-button next-button" onClick={handleNextImage}>
                                &#9654;
                            </button>
                        </div>
                        <div className="thumbnail-container d-flex flex-wrap gap-2">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${selectedMainImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedMainImage(index)}
                                >
                                    <img src={image} alt={`Thumbnail ${index + 1}`} className="img-fluid" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="rental-details p-3">
                        <div className="rental-header d-flex justify-content-between align-items-center mb-3">
                            <h1 className="fs-5 fw-bold text-gray-900">Honda SH 150 ABS Đen Sần 12/2022 Siêu Lướt</h1>
                            <div className={`availability-badge ${isAvailable ? 'available' : 'unavailable'}`}>
                                {isAvailable ? 'Còn xe' : 'Hết xe'}
                            </div>
                        </div>

                        <div className="rental-price mb-3 d-flex align-items-baseline">
                            <span className="price text-indigo-600 text-lg font-bold">140,000 VND</span>
                            <span className="duration text-gray-500 ml-2">/ngày</span>
                        </div>

                        <div className="location-selection d-flex flex-column gap-3 mb-4">
                            <div className="location-field">
                                <label className="text-gray-700 text-sm mb-1">Địa điểm nhận xe</label>
                                <div className="location-options d-flex gap-2">
                                    <button
                                        className={`location-option flex-1 ${pickupLocation === 'Tại cửa hàng' ? 'active' : ''}`}
                                        onClick={() => setPickupLocation('Tại cửa hàng')}
                                    >
                                        Tại cửa hàng
                                    </button>
                                    <button
                                        className={`location-option flex-1 ${pickupLocation !== 'Tại cửa hàng' ? 'active' : ''}`}
                                        onClick={() => openLocationModal('pickup')}
                                    >
                                        {pickupLocation !== 'Tại cửa hàng' ? pickupLocation : 'Chọn địa điểm'}
                                    </button>
                                </div>
                            </div>

                            <div className="location-field">
                                <label className="text-gray-700 text-sm mb-1">Địa điểm trả xe</label>
                                <div className="location-options d-flex gap-2">
                                    <button
                                        className={`location-option flex-1 ${dropoffLocation === 'Tại cửa hàng' ? 'active' : ''}`}
                                        onClick={() => setDropoffLocation('Tại cửa hàng')}
                                    >
                                        Tại cửa hàng
                                    </button>
                                    <button
                                        className={`location-option flex-1 ${dropoffLocation !== 'Tại cửa hàng' ? 'active' : ''}`}
                                        onClick={() => openLocationModal('dropoff')}
                                    >
                                        {dropoffLocation !== 'Tại cửa hàng' ? dropoffLocation : 'Chọn địa điểm'}
                                    </button>
                                </div>
                            </div>

                            <div className="time-selection">
                                <label className="text-gray-700 text-sm mb-1">Thời gian thuê xe</label>
                                <div className="time-input" onClick={() => setIsTimeModalOpen(true)}>
                                    <span>
                                        {selectedDates.length > 0
                                            ? selectedDates.length === 1
                                                ? new Date(selectedDates[0]).toLocaleDateString('vi-VN')
                                                : `${new Date(selectedDates[0]).toLocaleDateString('vi-VN')} đến ${new Date(selectedDates[selectedDates.length - 1]).toLocaleDateString('vi-VN')}`
                                            : 'Chọn thời gian'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="fee-breakdown p-4 rounded-md bg-gray-100">
                            <div className="fee-item d-flex justify-content-between mb-2 text-gray-700">
                                <span>Đơn giá xe</span>
                                <span>{fees.baseRate.toLocaleString()} VNĐ/ngày</span>
                            </div>
                            <div className="fee-item d-flex justify-content-between mb-2 text-gray-700">
                                <span>Phí bảo hiểm</span>
                                <span>{fees.insurance.toLocaleString()} VNĐ</span>
                            </div>
                            <div className="fee-item d-flex justify-content-between mb-2 text-gray-700">
                                <span>Phí đặt cọc</span>
                                <span>{fees.depositFee.toLocaleString()} VNĐ/ngày</span>
                            </div>
                            <div className="fee-item d-flex justify-content-between mb-2 text-gray-700">
                                <span>Phí vận chuyển</span>
                                <span>{fees.transportationFee.toLocaleString()} VNĐ</span>
                            </div>
                            <div className="fee-total d-flex justify-content-between mt-3 pt-3 border-top border-gray-300 text-gray-900 font-bold">
                                <span>Tổng thanh toán</span>
                                <span>{calculateTotal().toLocaleString()} VNĐ</span>
                            </div>
                        </div>

                        <div className="action-buttons d-flex gap-2 mt-4">
                            <button className="rent-button flex-1 py-2 px-3 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 font-bold">
                                Thuê xe ngay
                            </button>
                            <button className="negotiate-button flex-1 py-2 px-3 rounded-md text-white bg-green-600 hover:bg-green-700 font-bold">
                                Chat thương lượng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
                onSelectLocation={handleLocationSelect}
            />

            <TimePickerModal
                isOpen={isTimeModalOpen}
                onClose={() => setIsTimeModalOpen(false)}
                onSelectDates={handleDateSelect}
            />
        </div>
    );
};

export default VehicleRental;