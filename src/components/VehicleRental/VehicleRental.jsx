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
import api from "../../api/api";
import { Link } from "react-router-dom";
import moment from "moment";

const VehicleRental = ({ bike, vehicleId, onOpenChat }) => {
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
  const [vehicleAvailableDates, setVehicleAvailableDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedOption, setSelectedOption] = useState('car');
  const [otherLocation, setOtherLocation] = useState('');

  const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
      setOtherLocation(event.target.value);
  };


  useEffect(() => {
    if (bike) {
      setBikeData(bike);
      if (bike.startDate && bike.endDate) {
        setVehicleAvailableDates({
          startDate: new Date(bike.startDate),
          endDate: new Date(bike.endDate),
        });
      }
      if (bike.availableDates) {
        setAvailableDates(bike.availableDates.map((date) => new Date(date)));
      }
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

        // Lưu thông tin ngày cho thuê
        if (
          response.data.metadata.startDate &&
          response.data.metadata.endDate
        ) {
          setVehicleAvailableDates({
            startDate: new Date(response.data.metadata.startDate),
            endDate: new Date(response.data.metadata.endDate),
          });
        }
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
    discount: bikeData.discount || 0,
    price: bikeData.discount
      ? `${(
          bikeData.price -
          bikeData.price * (bikeData.discount / 100)
        ).toLocaleString("vi-VN")} VND`
      : bikeData.price?.toLocaleString("vi-VN") || "0 VND",
  };

  const cycleData = {
    name: bikeData.brand || "Không có tên",
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
    const discountAmount = (baseRentalFee * fees.insurance) / 100;
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

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
    setIsTimeModalOpen(false);
  };

  const handleBooking = async () => {
    if (selectedDates.length === 0) {
      alert("Vui lòng chọn thời gian thuê xe");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Vui lòng đăng nhập để thuê xe");
      return;
    }

    try {
      const startDate = moment(selectedDates[0]).format("DD/MM/YYYY");
      const endDate = moment(selectedDates[selectedDates.length - 1]).format(
        "DD/MM/YYYY"
      );

      const response = await api.post("/create-booking", {
        vehicleId: vehicleId,
        startDate: startDate,
        endDate: endDate,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Đặt xe thành công!");
      } else {
        throw new Error("Đặt xe thất bại");
      }
    } catch (error) {
      console.log("Full error object:", error);
      console.log("Response data:", error.response?.data);

      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userData");
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      } else {
        alert(error.response?.data?.message || "Có lỗi xảy ra khi đặt xe");
      }
    }
  };

  const formatDisplayDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  if (!bikeData) {
    return <div>Loading...</div>;
  }
  let ownerId = bikeData.ownerId || null;

  return (
    <div className="my-4 rental-container">
      <div className="row">
        <div className="col-md-6">
          <div className="image-gallery">
            <div className="mb-3 main-image">
              <img
                src={images[selectedMainImage]}
                alt="Honda SH 150 ABS"
                className="img-fluid booking-main-image"
              />
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
            <div className="flex-wrap gap-2 thumbnail-container d-flex">
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
          <div className="p-3 rental-details">
            <div className="rental-header d-flex justify-content-between align-items-center">
              <h1 className="rental-detail-name">{cycleData.name}</h1>
              <div
                className={`availability-badge ${
                  isAvailable ? "available" : "unavailable"
                }`}
              >
                {isAvailable ? "Còn xe" : "Đã cho thuê"}
              </div>
            </div>

            <div className="rental-price">
              <span className="text-lg font-bold text-indigo-600 price">
                {fees.price?.toLocaleString()}
              </span>
              <span className="ml-2 text-gray-500 duration price-unit">
                / ngày
              </span>
            </div>

            <div className="gap-3 location-selection d-flex flex-column">
              <div className="time-selection">
                <div className="vehicleRental-location-select">
                  <label htmlFor="location-select" className="choose-location-label">Chọn vị trí:</label>
                  <select
                    id="location-select"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="vehicleRental-form-select"
                  >
                    <option value="car">Vị trí xe</option>
                    <option value="other">Vị trí khác</option>
                  </select>

                  {selectedOption === "other" && (
                    <div className="vehicleRental-input-container">
                      <input
                        type="text"
                        id="other-input"
                        value={otherLocation}
                        onChange={handleInputChange}
                        placeholder="Nhập vị trí khác..."
                        className="vehicleRental-form-input"
                      />
                    </div>
                  )}
                </div>
                <label className="mb-1 text-sm text-gray-700">
                  Thời gian thuê xe
                </label>
                {vehicleAvailableDates.startDate &&
                  vehicleAvailableDates.endDate && (
                    <div className="mb-2 text-sm text-gray-500 available-dates">
                      (Xe cho thuê từ{" "}
                      {vehicleAvailableDates.startDate.toLocaleDateString(
                        "vi-VN"
                      )}{" "}
                      đến{" "}
                      {vehicleAvailableDates.endDate.toLocaleDateString(
                        "vi-VN"
                      )}
                      )
                    </div>
                  )}
                <div
                  className="time-input"
                  onClick={() => setIsTimeModalOpen(true)}
                >
                  <span>
                    {selectedDates.length > 0
                      ? selectedDates.length === 1
                        ? formatDisplayDate(selectedDates[0])
                        : `${formatDisplayDate(
                            selectedDates[0]
                          )} đến ${formatDisplayDate(
                            selectedDates[selectedDates.length - 1]
                          )}`
                      : "Chọn thời gian"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-100 rounded-md fee-breakdown">
              <div className="fee-item">
                <span>Đơn giá xe ({calculateRentalDays()} ngày)</span>
                <span>
                  {(fees.baseRate * calculateRentalDays()).toLocaleString()} VNĐ
                </span>
              </div>
              <div className="fee-item">
                <span>Giảm giá ({fees.insurance}%)</span>
                <span>
                  {(
                    (fees.baseRate * calculateRentalDays() * fees.insurance) /
                    100
                  ).toLocaleString()}{" "}
                  VNĐ
                </span>
              </div>
              <div className="pt-3 mt-3 font-bold text-gray-900 border-gray-300 fee-total d-flex justify-content-between border-top">
                <span>Tổng thanh toán</span>
                <span>{calculateTotal().toLocaleString()} VNĐ</span>
              </div>
            </div>

            <div className="gap-2 vehicle-action-buttons d-flex">
              <button
                className="flex-1 font-bold text-white bg-indigo-600 rounded-md rent-button hover:bg-indigo-700"
                onClick={handleBooking}
              >
                Thuê xe ngay
              </button>
              <Link
                className="flex-1 px-3 py-2 font-bold text-white bg-green-600 rounded-md negotiate-button hover:bg-green-700"
                to={`/user-dashboard/chat/${ownerId}`}
              >
                <FontAwesomeIcon icon={faComments} className="me-2" />
                Chat thương lượng
              </Link>
            </div>
          </div>
          <div className="p-4 border-0 card booking-details-info">
            <h4 className="booking-details-title">Thông tin chi tiết</h4>
            <div className="row">
              <div className="text-start">
                <div className="list-group">
                  <div className="border-0 list-group-item list-group-content">
                    <FontAwesomeIcon
                      icon={faIdCard}
                      className="booking-details-icon"
                    />
                    <span>
                      <strong className="booking-detail-item">Hãng:</strong>{" "}
                      {cycleData.registerDate}
                    </span>
                  </div>
                  <div className="border-0 list-group-item list-group-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="booking-details-icon"
                    >
                      <path d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24l57.7 0 16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7L64 128c-17.7 0-32 14.3-32 32l0 32 96 0c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32l70.4 0c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L418.2 128l61.8 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-20.4 0c-7.5 0-14.7 2.6-20.5 7.4L391.7 78.9l-14-26c-7-12.9-20.5-21-35.2-21L280 32zM462.7 311.2l28.2 52.2c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-28.2-52.2c2.3-.3 4.7-.4 7.1-.4c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-15.5 5.5-29.7 14.7-40.8zM187.3 376c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40l66.4 0C242.5 268.8 190.5 224 128 224C57.3 224 0 281.3 0 352s57.3 128 128 128c62.5 0 114.5-44.8 125.8-104l-66.4 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                    </svg>
                    <span>
                      <strong className="booking-detail-item">Mẫu xe:</strong>{" "}
                      {cycleData.color}
                    </span>
                  </div>
                  <div className="border-0 list-group-item list-group-content">
                    <FontAwesomeIcon
                      icon={faClipboardCheck}
                      className="booking-details-icon"
                    />
                    <span>
                      <strong className="booking-detail-item">Biển số:</strong>{" "}
                      {cycleData.licensePlate}
                    </span>
                  </div>
                  <div className="border-0 list-group-item list-group-content list-group-address">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      className="booking-details-icon booking-details-icon-address"
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <span>
                      <strong className="booking-detail-item">Địa chỉ:</strong>{" "}
                      {cycleData.address}
                    </span>
                  </div>
                  <div className="list-group-content list-group-description">
                    <h3 className="description-title">
                      <strong className="booking-detail-item">Mô tả:</strong>
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

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
      />

      <TimePickerModal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        onSelectDates={handleDateSelect}
        availableDates={availableDates}
      />
    </div>
  );
};

export default VehicleRental;
