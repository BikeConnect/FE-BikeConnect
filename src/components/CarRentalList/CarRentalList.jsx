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
    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/vehicles/list-vehicles"
        );
        const result = await response.json();

        console.log("Response from API:", result);

        if (result.status === 200 && Array.isArray(result.metadata)) {
          setVehicles(result.metadata); // Lưu trữ mảng xe vào state
          console.log("Vehicles set:", result.metadata);
        } else {
          throw new Error("Dữ liệu không hợp lệ");
        }
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    console.log("Current state:", state);
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
      console.log("Transformed vehicles set:", transformedVehicles); // Log the transformed vehicles
    } else {
      setVehicles([]);
      console.log("No combined results found in state."); // Log if no combined results
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
    return (
      <Col lg={4} md={6} sm={12} className="mb-4">
        <Link className="vehicle-card-link">
          <div className="card vehicle-card">
            <div className="vehicle-image-wrapper">
              <img
                src={data.images?.[0]?.url || xedethue} // Sử dụng ảnh đầu tiên hoặc ảnh mặc định
                alt={data.brand}
                className="card-img-top vehicle-image"
              />
            </div>
            <div className="card-body vehicle-details">
              <h5 className="card-title vehicle-name">{data.brand}</h5>
              <p className="card-text vehicle-price-section">
                <span className="vehicle-current-price">
                  {(
                    data.price -
                    (data.price * (data.discount || 0)) / 100
                  ).toLocaleString()}{" "}
                  VND/ngày
                </span>
                <span className="vehicle-original-price">
                  {data.price.toLocaleString()} VND
                </span>
              </p>
              <p className="card-text vehicle-location">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="location-icon"
                />{" "}
                {data.address}
              </p>
              <div className="vehicle-footer d-flex justify-content-between">
                <div className="vehicle-status">
                  <div>
                    {data.availability_status === "available"
                      ? "Có sẵn"
                      : "Không có sẵn"}
                  </div>
                  <div>
                    <span className="vehicle-distance">
                      <FontAwesomeIcon
                        icon={faTachometerAlt}
                        className="distance-icon"
                      />{" "}
                      {data.distance || "0km"}
                    </span>
                  </div>
                </div>
                <div className="vehicle-rating">
                  {Array(Math.floor(data.rating))
                    .fill()
                    .map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className="vehicle-star"
                      />
                    ))}
                  <span className="vehicle-review-count">
                    ({data.reviews || 0})
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
        <Col className="carRentalList-container">
          <Navbar className="">
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
                        // onChange={() => handleStarFilterChange(star)}
                        checked={selectedStars.includes(star)}
                        className="filter-star"
                      />
                    ))}
                  </div>
                </Form.Group>
              </Form>
              <Form.Group controlId="brand" className="filter-group">
                <Form.Label>Thương Hiệu</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập thương hiệu"
                  // value={brand}
                  // onChange={(e) => setBrand(e.target.value)}
                  className="filter-input"
                />
              </Form.Group>
              <Form.Group controlId="price" className="filter-group">
                <Form.Label>Khoảng Giá</Form.Label>
                <div className="d-flex flex-col carRental-space-price">
                  <Form.Control
                    type="text"
                    placeholder="Thấp nhất"
                    // value={minPrice}
                    // onChange={handleMinPriceChange}
                    // onBlur={handleMinPriceBlur}
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
                    // value={maxPrice}
                    // onChange={handleMaxPriceChange}
                    // onBlur={handleMaxPriceBlur}
                    className="filter-input price-input"
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="sortBy" className="filter-group">
                <Form.Label>Sắp Xếp</Form.Label>
                <Form.Control
                  as="select"
                  // value={sortBy}
                  // onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select filter-label"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="priceAsc">Giá: Thấp đến Cao</option>
                  <option value="priceDesc">Giá: Cao đến Thấp</option>
                  <option value="ratingAsc">Sao: Thấp đến Cao</option>
                  <option value="ratingDesc">Sao: Cao đến Thấp</option>
                </Form.Control>
              </Form.Group>
            </div>
          </Navbar>

          {/* Thẻ Xe */}
          <Col md={9}>
            <Row>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle._id} data={vehicle} />
                ))
              ) : (
                <div>Không có xe nào</div>
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
