import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CyclerentalGrid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faMotorcycle,
  faTachometerAlt,
  faStar,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import thuexemay from "../../assets/images/images_homePage/v994_8600.png";
import thuexedap from "../../assets/images/images_homePage/v994_9104.png";
import { Link } from "react-router-dom";

const MotorcycleCard = ({ data }) => {
  return (
    <Link
      to={`/BikeDetail/${data.name}`}
      className="col-lg-3 col-md-6 col-sm-12 mb-4"
    >
      <div className="card rental-card">
        <div className="rental-image-wrapper">
          <img
            src={data.image}
            alt={data.name}
            className="card-img-top rental-image"
          />
        </div>
        <div className="card-body rental-details">
          <h5 className="card-title rental-name">{data.name}</h5>
          <p className="card-text rental-price-section">
            <span className="rental-current-price">{data.currentPrice}</span>
            <span className="rental-original-price">{data.originalPrice}</span>
          </p>
          <p className="card-text rental-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />{" "}
            {data.location}
          </p>
          <div className="rental-footer d-flex">
            <div className="rental-status">
              <FontAwesomeIcon icon={faMotorcycle} className="status-icon" />{" "}
              {data.status}
            </div>
            <div className="rental-rating">
              {Array(data.reviews)
                .fill()
                .map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className="rental-star"
                  />
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
  const [currentPage, setCurrentPage] = useState(1);
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  //   const motorcycles = Array(15).fill({
  //     name: "Yamaha Exciter",
  //     currentPrice: "140,000 VND/ngày",
  //     originalPrice: "180,000 VND",
  //     location: "45 Lê Độ, Thanh Khê, Đà Nẵng",
  //     status: "Xe mới",
  //     distance: "3 km",
  //     reviews: 65,
  //     image: thuexemay,
  //   });

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const myHeaders = new Headers();
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          setError("Vui lòng đăng nhập để xem danh sách xe");
          setLoading(false);
          return;
        }

        myHeaders.append("Authorization", `Bearer ${accessToken}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          "http://localhost:8080/api/post/vehicles",
          requestOptions
        );

        if (response.status === 401) {
          setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
          localStorage.removeItem("accessToken");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result); // Debug log

        const vehicles = result.data || result;
        if (!result.metadata || !Array.isArray(result.metadata)) {
          setError("Định dạng dữ liệu không hợp lệ");
          setLoading(false);
          return;
        }

        setMotorcycles(
          result.metadata.map((vehicle) => ({
            name: vehicle.name || "Không có tên",
            currentPrice:
              `${vehicle.price?.toLocaleString("vi-VN")} VND/ngày` ||
              "0 VND/ngày",
            originalPrice: vehicle.discount
              ? `${(
                vehicle.price *
                (1 + vehicle.discount / 100)
              ).toLocaleString("vi-VN")} VND`
              : "",
            location: vehicle.address || "Không có địa chỉ",
            status:
              vehicle.availability_status === "available"
                ? "Có sẵn"
                : "Đã thuê",
            reviews: vehicle.rating || 0,
            image: vehicle.images?.[0]?.url || thuexemay,
          }))
        );
      } catch (err) {
        setError(err.message);
        console.error("Error fetching motorcycles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, []);

  const totalPages = Math.ceil(motorcycles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = motorcycles.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Có lỗi xảy ra: {error}</div>;

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="container-fluid rental-grid-container">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="rental-title">Xe cho thuê</h1>
        </div>
      </div>

      <div className="row">
        {currentItems.map((item, index) => (
          <MotorcycleCard key={index} data={item} />
        ))}
      </div>

      <div className="rental-pagination d-flex justify-content-center">
        <button
          className="btn btn-outline-primary rental-page-btn rental-prev-btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="rental-chevron-left"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </button>
        <button
          className="btn btn-outline-primary rental-page-btn rental-next-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="rental-chevron-right"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CyclerentalGrid;