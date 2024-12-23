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
import { Link, Navigate, useLocation } from "react-router-dom";
import "./CarRentalList.css";
import xedethue from "../../assets/images/images_homePage/v994_9054.png";
import api from "../../api/api";

const CusFilterOptions = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehicleType, setVehicleType] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedStars, setSelectedStars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleStarFilterChange = (star) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
    setCurrentPage(1);
  };

  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        console.log("Fetching vehicles...");
        const response = await api.get("/vehicles/list-vehicles");
        console.log("Raw API response:", response);

        if (!response.data || !response.data.metadata) {
          throw new Error("Invalid data structure received");
        }

        console.log("Raw metadata:", response.data.metadata);

        const transformedVehicles = response.data.metadata.map((item) => {
          console.log("Processing item:", item);

          const price = item.price || 0;
          const discount = item.discount || 0;

          const transformedItem = {
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
            price: price,
            currentPrice: `${(
              price -
              (price * discount) / 100
            ).toLocaleString()} VND/ngày`,
            originalPrice: `${price.toLocaleString()} VND`,
            reviews: 0,
            slug: item.slug || "",
          };

          console.log("Transformed item:", transformedItem);
          return transformedItem;
        });

        console.log("Final transformed vehicles:", transformedVehicles);
        setVehicles(transformedVehicles);
      } catch (err) {
        console.error("Error details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const formatNumberWithCommas = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleMinPriceChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setMinPrice(rawValue);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setMaxPrice(rawValue);
    setCurrentPage(1);
  };

  const handleMinPriceBlur = () => {
    setMinPrice(formatNumberWithCommas(minPrice));
  };

  const handleMaxPriceBlur = () => {
    setMaxPrice(formatNumberWithCommas(maxPrice));
  };

  const filteredVehicles = vehicles
    .filter((vehicle) => {
      const parsedMinPrice = minPrice
        ? parseInt(minPrice.replace(/,/g, ""))
        : 0;
      const parsedMaxPrice = maxPrice
        ? parseInt(maxPrice.replace(/,/g, ""))
        : Infinity;
      const vehiclePrice = parseInt(vehicle.price);

      return (
        (vehicleType === "" || vehicle.type === vehicleType) &&
        (brand === "" ||
          vehicle.brand.toLowerCase().includes(brand.toLowerCase())) &&
        vehiclePrice >= parsedMinPrice &&
        vehiclePrice <= parsedMaxPrice &&
        (selectedStars.length === 0 ||
          selectedStars.includes(Math.floor(vehicle.rating)))
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.id - a.id;
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "ratingAsc":
          return a.rating - b.rating;
        case "ratingDesc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVehicles.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const VehicleCard = ({ data }) => {
    console.log("VehicleCard received data:", data);
    // const handleClick = (e) => {
    //   e.preventDefault();
    //   Navigate(`/BikeDetail/${data._id}/${data.slug}`);
    // };

    const safeData = {
      ...data,
      price: data.price || 0,
      currentPrice: data.currentPrice || "0 VND/ngày",
      originalPrice: data.originalPrice || "0 VND",
      brand: data.brand || "Unknown",
      address: data.location || "No address",
      status: data.status || "Unknown",
      distance: data.distance || "0km",
      rating: data.rating || 0,
      image: data.image || [],
      discount: data.discount || 0,
      availability_status: data.availability_status || "unavailable",
      slug: data.slug || data.id
    };

    return (
      <Col lg={4} md={6} sm={12} className="mb-4">
        <Link
          to={`/BikeDetail/${safeData.id}/${safeData.slug}`}
          className="vehicle-card-link"
          style={{ cursor: "pointer" }}
        >
          <div className="card vehicle-card">
            <div className="vehicle-image-wrapper">
              <img
                src={safeData.image || xedethue}
                alt={safeData.brand}
                className="card-img-top vehicle-image"
              />
            </div>
            <div className="card-body vehicle-details">
              <h5 className="card-title vehicle-name">{safeData.brand}</h5>
              <p className="card-text vehicle-price-section">
                <span className="vehicle-current-price">
                  {safeData.currentPrice.toLocaleString()}
                </span>
                <span className="vehicle-original-price">
                  {safeData.price.toLocaleString()} VND
                </span>
              </p>
              <p className="card-text vehicle-location">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="location-icon"
                />{" "}
                {safeData.location}
              </p>
              <div className="vehicle-footer d-flex justify-content-between">
                <div className="vehicle-status">
                  <div>
                    <FontAwesomeIcon
                      icon={
                        safeData.type === "Xe máy" ? faMotorcycle : faBicycle
                      }
                      className="status-icon"
                    />{" "}
                    {safeData.status}
                  </div>
                </div>
                <div className="vehicle-rating">
                  {Array(Math.floor(safeData.rating))
                    .fill()
                    .map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className="vehicle-star"
                      />
                    ))}
                  <span className="vehicle-review-count">
                    ({safeData.rating})
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
      <Row>
        <Col className="carRentalList-container">
          <Navbar className="carRentalList-navbar">
            <div className="filter-container">
              <h2 className="filter-title">Lọc</h2>
              <Form className="filter-form">
                <Form.Group controlId="rating" className="filter-group">
                  <Form.Label>Đánh Giá</Form.Label>
                  <div className="rating-checkboxes">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <Form.Check
                        key={star}
                        type="checkbox"
                        id={`filter-star-${star}`}
                        label={
                          <span className="text-warning">
                            {star} <FontAwesomeIcon icon={faStar} />
                          </span>
                        }
                        onChange={() => handleStarFilterChange(star)}
                        checked={selectedStars.includes(star)}
                        className="filter-star"
                      />
                    ))}
                  </div>
                </Form.Group>

                <Form.Group controlId="brand" className="filter-group">
                  <Form.Label>Thương Hiệu</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập thương hiệu"
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="filter-input"
                  />
                </Form.Group>

                <Form.Group controlId="price" className="filter-group">
                  <Form.Label>Khoảng Giá</Form.Label>
                  <div className="d-flex flex-col carRental-space-price">
                    <Form.Control
                      type="text"
                      placeholder="Thấp nhất"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      onBlur={handleMinPriceBlur}
                      className="filter-input price-input"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="carRental-icon-minus"
                    >
                      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                    </svg>
                    <Form.Control
                      type="text"
                      placeholder="Cao nhất"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      onBlur={handleMaxPriceBlur}
                      className="filter-input price-input"
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="sortBy" className="filter-group">
                  <Form.Label>Sắp Xếp</Form.Label>
                  <Form.Control
                    as="select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select filter-label"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="priceAsc">Giá: Thấp đến Cao</option>
                    <option value="priceDesc">Giá: Cao đến Thấp</option>
                    <option value="ratingAsc">Sao: Thấp đến Cao</option>
                    <option value="ratingDesc">Sao: Cao đến Thấp</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
          </Navbar>

          {/* Danh sách xe */}
          <Col md={9}>
            <Row>
              {loading ? (
                <div>Đang tải...</div>
              ) : error ? (
                <div>Lỗi: {error}</div>
              ) : currentItems.length > 0 ? (
                currentItems.map((vehicle) => (
                  <VehicleCard key={vehicle.id} data={vehicle} />
                ))
              ) : (
                <div>Không có xe nào</div>
              )}
            </Row>
            <Row>
              <div className="pagination-container">
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
              </div>
            </Row>
          </Col>

          {/* Phân Trang */}
        </Col>
      </Row>
    </Container>
  );
};

export default CusFilterOptions;
