import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faMotorcycle,
  faBicycle,
  faTachometerAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import "./CarRentalList.css";
import xedethue from "../../assets/images/images_homePage/v994_9054.png";

const CusFilterOptions = () => {
  // const [vehicleType, setVehicleType] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [brand, setBrand] = useState("");
  // const [minPrice, setMinPrice] = useState("");
  // const [maxPrice, setMaxPrice] = useState("");
  // const [sortBy, setSortBy] = useState("newest");
  const [selectedStars, setSelectedStars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // const handleStarFilterChange = (star) => {
  //   setSelectedStars((prev) =>
  //     prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
  //   );
  // };

  const location = useLocation();
  const { state } = location;
  const queryParams = new URLSearchParams(location.search);
  const selectedLocation = queryParams.get("location") || "";
  const selectedDates = queryParams.get("dates")
    ? queryParams.get("dates").split(",")
    : [];

  useEffect(() => {
    if (state?.combinedResults && Array.isArray(state.combinedResults)) {
      const transformedVehicles = state.combinedResults.map((item) => {
        return {
          id: item._id,
          type: item.category === "Motorcycle" ? "Xe máy" : "Xe đạp",
          brand: item.brand || "",
          name: item.name || "",
          rating: Number(item.rating) || 0,
          image: item.images?.[0]?.url || xedethue,
          location: item.address || "",
          distance: item.distance || "0km",
          status:
            item.availability_status === "available"
              ? "Có sẵn"
              : "Không có sẵn",
          currentPrice: `${(item.price || 0).toLocaleString()} VND/ngày`,
          originalPrice: `${(
            (item.price || 0) *
            (1 + (item.discount || 0) / 100)
          ).toLocaleString()} VND`,
          reviews: 0,
        };
      });

      setVehicles(transformedVehicles);
    } else {
      setVehicles([]);
    }
  }, [state]);

  // const formatNumberWithCommas = (value) => {
  //   const numericValue = value.replace(/\D/g, "");
  //   return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  // const handleMinPriceChange = (e) => {
  //   const rawValue = e.target.value.replace(/,/g, "");
  //   setMinPrice(rawValue);
  // };

  // const handleMaxPriceChange = (e) => {
  //   const rawValue = e.target.value.replace(/,/g, "");
  //   setMaxPrice(rawValue);
  // };

  // const handleMinPriceBlur = () => {
  //   setMinPrice(formatNumberWithCommas(minPrice));
  // };

  // const handleMaxPriceBlur = () => {
  //   setMaxPrice(formatNumberWithCommas(maxPrice));
  // };

  // const filteredVehicles = vehicles
  //   .filter((vehicle) => {
  //     const parsedMinPrice = minPrice
  //       ? parseInt(minPrice.replace(/,/g, ""))
  //       : 0;
  //     const parsedMaxPrice = maxPrice
  //       ? parseInt(maxPrice.replace(/,/g, ""))
  //       : 0;
  //     const vehiclePrice = parseInt(vehicle.currentPrice.replace(/\D/g, ""));

  //     return (
  //       (vehicleType === "" || vehicle.type === vehicleType) &&
  //       (brand === "" || vehicle.brand === brand) &&
  //       (parsedMinPrice === 0 || vehiclePrice >= parsedMinPrice) &&
  //       (parsedMaxPrice === 0 || vehiclePrice <= parsedMaxPrice) &&
  //       (selectedStars.length === 0 ||
  //         selectedStars.includes(Math.floor(vehicle.rating)))
  //     );
  //   })
  //   .sort((a, b) => {
  //     if (sortBy === "newest") return b.id - a.id;
  //     if (sortBy === "priceAsc")
  //       return (
  //         parseInt(a.currentPrice.replace(/\D/g, "")) -
  //         parseInt(b.currentPrice.replace(/\D/g, ""))
  //       );
  //     if (sortBy === "priceDesc")
  //       return (
  //         parseInt(b.currentPrice.replace(/\D/g, "")) -
  //         parseInt(a.currentPrice.replace(/\D/g, ""))
  //       );
  //     if (sortBy === "ratingAsc") return a.rating - b.rating;
  //     if (sortBy === "ratingDesc") return b.rating - a.rating;
  //     return 0;
  //   });

  // const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredVehicles.slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/vehicles/list-vehicles", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setVehicles(result);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const VehicleCard = ({ data }) => {
    const formattedData = {
      ...data,
      name: typeof data.name === "object" ? data.name.text || "" : data.name,
      currentPrice:
        typeof data.currentPrice === "object"
          ? data.currentPrice.text || "0 VND/ngày"
          : data.currentPrice,
      originalPrice:
        typeof data.originalPrice === "object"
          ? data.originalPrice.text || "0 VND"
          : data.originalPrice,
      location:
        typeof data.location === "object"
          ? data.location.text || ""
          : data.location,
      status:
        typeof data.status === "object"
          ? data.status.text || "Xe mới"
          : data.status,
      distance:
        typeof data.distance === "object"
          ? data.distance.text || "0km"
          : data.distance.text || "0km",
    };

    return (
      <Col lg={4} md={6} sm={12} className="mb-4">
        <Link
          // to={`/ChiTietXe/${formattedData.name}`}
          className="vehicle-card-link"
        >
          <div className="card vehicle-card">
            <div className="vehicle-image-wrapper">
              <img
                src={formattedData.image}
                alt={formattedData.name}
                className="card-img-top vehicle-image"
              />
            </div>
            <div className="card-body vehicle-details">
              <h5 className="card-title vehicle-name">{formattedData.name}</h5>
              <p className="card-text vehicle-price-section">
                <span className="vehicle-current-price">
                  {formattedData.currentPrice}
                </span>
                <span className="vehicle-original-price">
                  {formattedData.originalPrice}
                </span>
              </p>
              <p className="card-text vehicle-location">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="location-icon"
                />{" "}
                {formattedData.location}
              </p>
              <div className="vehicle-footer d-flex justify-content-between">
                <div className="vehicle-status">
                  <div>
                    <FontAwesomeIcon
                      icon={
                        formattedData.type === "Xe máy"
                          ? faMotorcycle
                          : faBicycle
                      }
                      className="status-icon"
                    />{" "}
                    {formattedData.status}
                  </div>
                  <div>
                    <span className="vehicle-distance">
                      <FontAwesomeIcon
                        icon={faTachometerAlt}
                        className="distance-icon"
                      />{" "}
                      {formattedData.distance}
                    </span>
                  </div>
                </div>
                <div className="vehicle-rating">
                  {Array(Math.floor(formattedData.rating))
                    .fill()
                    .map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className="vehicle-star"
                      />
                    ))}
                  <span className="vehicle-review-count">
                    ({formattedData.rating})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Col>
    );
  };

  return (
    <Container className="centered-container mt-4 mb-5">
      <h1 className="my-4 text-center title-cusFilter">Danh sách xe</h1>
      <Row>
        <Col md={9}>
          <Navbar className="123"></Navbar>

          {/* Thẻ Xe */}
          <Col md={9}>
            <h1 className="my-4 text-center title-cusFilter">Danh sách xe</h1>
            <Row>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} data={vehicle} />
                ))
              )}
            </Row>
          </Col>

          {/* Phân Trang */}
          {/* <div className="pagination-container">
            <Button
              variant="outline-primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Trước
            </Button>
            <span className="pagination-info">
              Trang {currentPage} của {totalPages}
            </span>
            <Button
              variant="outline-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Tiếp
            </Button>
          </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default CusFilterOptions;
