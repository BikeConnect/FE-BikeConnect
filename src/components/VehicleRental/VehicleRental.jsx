import React, { useEffect, useState } from "react";
import "./VehicleRental.css";
import LocationModal from "../LocationModal/LocationModal";
import TimePickerModal from "../TimePickerModal/TimePickerModal";
import hinhanhxe1 from "../../assets/images/images_homePage/v994_8600.png";
import hinhanhxe2 from "../../assets/images/images_homePage/v994_9054.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faIdCard,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import api from "../../api/api";

const VehicleRental = ({ bike, vehicleId, onOpenChat }) => {
  const location = useLocation();
  const [bikeData, setBikeData] = useState(bike || null);
  const [loading, setLoading] = useState(!bike);
  const [error, setError] = useState(null);

  const [selectedMainImage, setSelectedMainImage] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [pickupLocation, setPickupLocation] = useState("Tại cửa hàng");
  const [dropoffLocation, setDropoffLocation] = useState("Tại cửa hàng");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [activeLocationField, setActiveLocationField] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    if (bike) {
      setBikeData(bike);
      return;
    }

    if (!vehicleId) {
      console.error("Vehicle ID is undefined");
      return;
    }

    const fetchVehicleDetails = async () => {
      try {
        const response = await api.get(`/post/vehicle-detail/${vehicleId}`);
        if (!response.data || !response.data.metadata) {
          throw new Error("Không tìm thấy dữ liệu xe");
        }
        setBikeData(response.data.metadata);
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
        setError("Có lỗi xảy ra khi tải thông tin xe");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [vehicleId, bike]);

  useEffect(() => {
    if (bikeData) {
      setIsAvailable(bikeData.availability_status === "available");
    }
  }, [bikeData]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!bikeData) return <div>Không tìm thấy thông tin xe</div>;

  const images =
    bikeData.images?.length > 0
      ? bikeData.images.map((img) => img.url)
      : [hinhanhxe1, hinhanhxe2];

  const handlePreviousImage = () => {
    setSelectedMainImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedMainImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const fees = {
    baseRate: bikeData.price || 0,
    insurance: bikeData.discount || 0,
  };

  console.log(bikeData);

  const cycleData = {
    name: bikeData.name || "Không có tên",
    registerDate: bikeData.model || "Không có",
    color: bikeData.brand || "Không có",
    licensePlate: bikeData.license || "Không có",
    mileage: bikeData.mileage || "Không có",
    description: bikeData.description
      ? [bikeData.description]
      : ["Không có mô tả"],
    address: bikeData.address || "Không có địa chỉ",
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
    const baseRentalFee = fees.baseRate * rentalDays;

    // Tính giảm giá
    const discountAmount = (baseRentalFee * fees.insurance) / 100;

    // Tổng tiền = Giá thuê * số ngày - giảm giá
    const total = baseRentalFee - discountAmount;

    return Math.round(total);
  };

  const handleLocationSelect = (location) => {
    if (activeLocationField === "pickup") {
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
    <div className="rental-container my-4">
      <div className="row">
        <div className="col-md-6">
          <div className="image-gallery">
            <div className="main-image mb-3">
              <img
                src={images[selectedMainImage]}
                alt="Honda SH 150 ABS"
                className="img-fluid booking-main-image"
              />
              {/* Nút Previous */}
              <button
                className="image-nav-button previous-button"
                onClick={handlePreviousImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="nav-arrow-left"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>

              {/* Nút Next */}
              <button
                className="image-nav-button next-button"
                onClick={handleNextImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="nav-arrow-right"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>
            </div>
            <div className="thumbnail-container d-flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    selectedMainImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedMainImage(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="rental-details p-3">
            <div className="rental-header d-flex justify-content-between align-items-center">
              <h1 className="fs-5 fw-bold text-gray-900">{cycleData.name}</h1>
              <div
                className={`availability-badge ${
                  isAvailable ? "available" : "unavailable"
                }`}
              >
                {isAvailable ? "Còn xe" : "Hết xe"}
              </div>
            </div>

            <div className="rental-price">
              <span className="price text-indigo-600 text-lg font-bold">
                {bikeData.price?.toLocaleString()} VND
              </span>
              <span className="duration text-gray-500 ml-2 price-unit">
                / ngày
              </span>
            </div>

            <div className="location-selection d-flex flex-column gap-3">
              {/* <div className="location-field">
                <label className="text-gray-700 text-sm mb-1">
                  Địa điểm nhận xe
                </label>
                <div className="location-options d-flex gap-2">
                  <button
                    className={`location-option flex-1 ${
                      pickupLocation === "Tại cửa hàng" ? "active" : ""
                    }`}
                    onClick={() => setPickupLocation("Tại cửa hàng")}
                  >
                    Tại cửa hàng
                  </button>
                  <button
                    className={`location-option flex-1 ${
                      pickupLocation !== "Tại cửa hàng" ? "active" : ""
                    }`}
                    onClick={() => openLocationModal("pickup")}
                  >
                    {pickupLocation !== "Tại cửa hàng"
                      ? pickupLocation
                      : "Chọn địa điểm"}
                  </button>
                </div>
              </div>

              <div className="location-field">
                <label className="text-gray-700 text-sm mb-1">
                  Địa điểm trả xe
                </label>
                <div className="location-options d-flex gap-2">
                  <button
                    className={`location-option flex-1 ${
                      dropoffLocation === "Tại cửa hàng" ? "active" : ""
                    }`}
                    onClick={() => setDropoffLocation("Tại cửa hàng")}
                  >
                    Tại cửa hàng
                  </button>
                  <button
                    className={`location-option flex-1 ${
                      dropoffLocation !== "Tại cửa hàng" ? "active" : ""
                    }`}
                    onClick={() => openLocationModal("dropoff")}
                  >
                    {dropoffLocation !== "Tại cửa hàng"
                      ? dropoffLocation
                      : "Chọn địa điểm"}
                  </button>
                </div>
              </div> */}

              <div className="time-selection">
                <label className="text-gray-700 text-sm mb-1">
                  Thời gian thuê xe
                </label>
                <div
                  className="time-input"
                  onClick={() => setIsTimeModalOpen(true)}
                >
                  <span>
                    {selectedDates.length > 0
                      ? selectedDates.length === 1
                        ? new Date(selectedDates[0]).toLocaleDateString("vi-VN")
                        : `${new Date(selectedDates[0]).toLocaleDateString(
                            "vi-VN"
                          )} đến ${new Date(
                            selectedDates[selectedDates.length - 1]
                          ).toLocaleDateString("vi-VN")}`
                      : "Chọn thời gian"}
                  </span>
                </div>
              </div>
            </div>

            <div className="fee-breakdown p-4 rounded-md bg-gray-100">
              <div className="fee-item d-flex justify-content-between mb-2 text-gray-700">
                <span>Đơn giá xe ({calculateRentalDays()} ngày)</span>
                <span>
                  {(fees.baseRate * calculateRentalDays()).toLocaleString()} VNĐ
                </span>
              </div>
              <div className="fee-item d-flex justify-content-between mb-2 text-gray-700">
                <span>Giảm giá ({fees.insurance}%)</span>
                <span>
                  {(
                    (fees.baseRate * calculateRentalDays() * fees.insurance) /
                    100
                  ).toLocaleString()}{" "}
                  VNĐ
                </span>
              </div>
              <div className="fee-total d-flex justify-content-between mt-3 pt-3 border-top border-gray-300 text-gray-900 font-bold">
                <span>Tổng thanh toán</span>
                <span>{calculateTotal().toLocaleString()} VNĐ</span>
              </div>
            </div>

            <div className="action-buttons d-flex gap-2">
              <button className="rent-button flex-1 py-2 px-3 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 font-bold">
                Thuê xe ngay
              </button>
              <button
                className="negotiate-button flex-1 py-2 px-3 rounded-md text-white bg-green-600 hover:bg-green-700 font-bold"
                onClick={onOpenChat} // Sử dụng toggle
              >
                <FontAwesomeIcon icon={faComments} className="me-2" />
                Chat thương lượng
              </button>
            </div>
          </div>
          <div className="card p-4 border-0 booking-details-info">
            <h4 className="cycle-name">Thông tin chi tiết</h4>
            <div className="row">
              <div className="text-start">
                <div className="list-group">
                  <div className="list-group-item border-0 list-group-content">
                    <FontAwesomeIcon
                      icon={faIdCard}
                      className="booking-details-icon"
                    />
                    <span>
                      <strong>Hãng:</strong> {cycleData.registerDate}
                    </span>
                  </div>
                  <div className="list-group-item border-0 list-group-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="booking-details-icon"
                    >
                      <path d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24l57.7 0 16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7L64 128c-17.7 0-32 14.3-32 32l0 32 96 0c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32l70.4 0c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L418.2 128l61.8 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-20.4 0c-7.5 0-14.7 2.6-20.5 7.4L391.7 78.9l-14-26c-7-12.9-20.5-21-35.2-21L280 32zM462.7 311.2l28.2 52.2c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-28.2-52.2c2.3-.3 4.7-.4 7.1-.4c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-15.5 5.5-29.7 14.7-40.8zM187.3 376c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40l66.4 0C242.5 268.8 190.5 224 128 224C57.3 224 0 281.3 0 352s57.3 128 128 128c62.5 0 114.5-44.8 125.8-104l-66.4 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                    </svg>
                    <span>
                      <strong>Mẫu xe:</strong> {cycleData.color}
                    </span>
                  </div>
                  <div className="list-group-item border-0 list-group-content">
                    <FontAwesomeIcon
                      icon={faClipboardCheck}
                      className="booking-details-icon"
                    />
                    <span>
                      <strong>Biển số:</strong> {cycleData.licensePlate}
                    </span>
                  </div>
                  <div className="list-group-item border-0 list-group-content list-group-address">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      className="booking-details-icon booking-details-icon-address"
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <span>
                      <strong>Địa chỉ:</strong> {cycleData.address}
                    </span>
                  </div>
                  <div className="list-group-content list-group-description">
                    <h3 className="description-title">
                      <strong>Mô tả:</strong>
                    </h3>
                    <ul className="list-description-content">
                      {cycleData.description.map((desc, index) => (
                        <li key={index} className="">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
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
