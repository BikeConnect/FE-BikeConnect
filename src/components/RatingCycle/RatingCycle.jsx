import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Pagination,
} from "react-bootstrap";
import "./RatingCycle.css";
import hinhanhxe2 from "../../assets/images/images_homePage/v994_9054.png";

const RatingCycle = () => {
  const [ratings, setRatings] = useState({
    averageRating: 4.5,
    ratingDistribution: [2, 1, 1, 0, 0],
    reviews: [
      {
        user: "Nguyễn Ngọc Trường",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit. Dictum varius duis at consectetur lorem. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. Amet mauris commodo quis imperdiet massa.",
        date: "July 2, 2020 03:29 PM",
        likes: 128,
        dislikes: 5,
        stars: 5,
        hasImage: true,
        hasDescription: true,
        imageUrl: hinhanhxe2,
      },
      {
        user: "Phan Thanh Tài",
        comment: "Chất lượng dịch vụ tốt",
        date: "July 10, 2020 11:15 AM",
        likes: 95,
        dislikes: 3,
        stars: 4,
        hasImage: false,
        hasDescription: true,
      },
      {
        user: "John Doe",
        comment: "Xe hơi cũ nhưng chạy vẫn ổn",
        date: "August 15, 2020 09:00 AM",
        likes: 60,
        dislikes: 8,
        stars: 3,
        hasImage: true,
        hasDescription: false,
        imageUrl: hinhanhxe2,
      },
      {
        user: "New User",
        comment: "Rất hài lòng với chiếc xe Yamaha Exciter này!",
        date: "November 1, 2024 02:00 PM",
        likes: 10,
        dislikes: 1,
        stars: 5,
        hasImage: true,
        hasDescription: true,
        imageUrl: hinhanhxe2,
      },
    ],
  });

  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedStars, setSelectedStars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const reviewsPerPage = 2;

  const totalUsers = ratings.ratingDistribution.reduce(
    (total, count) => total + count,
    0
  );

  useEffect(() => {
    filterReviews();
  }, [selectedStars, currentPage, filterType, ratings.reviews]);

  const filterReviews = () => {
    let reviews = ratings.reviews.filter(
      (review) =>
        (selectedStars.length === 0 || selectedStars.includes(review.stars)) &&
        (filterType === "all" ||
          (filterType === "withImage" && review.hasImage) ||
          (filterType === "withDescription" && !review.hasImage))
    );
    setFilteredReviews(
      reviews.slice(
        (currentPage - 1) * reviewsPerPage,
        currentPage * reviewsPerPage
      )
    );
  };

  const handleStarFilterChange = (star) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
    setCurrentPage(1);
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLike = (index) => {
    setRatings((prev) => {
      const updatedReviews = [...prev.reviews];
      updatedReviews[index] = {
        ...updatedReviews[index],
        likes: updatedReviews[index].likes + 1,
      };
      return { ...prev, reviews: updatedReviews };
    });
  };

  const handleDislike = (index) => {
    setRatings((prev) => {
      const updatedReviews = [...prev.reviews];
      updatedReviews[index] = {
        ...updatedReviews[index],
        dislikes: updatedReviews[index].dislikes + 1,
      };
      return { ...prev, reviews: updatedReviews };
    });
  };

  return (
    <Container className="rating-cycle-container my-5">
      <Row>
        <Col md={3} className="filter-section">
          <Card className="filter-card mb-4">
            <Card.Body>
              <h3>Lọc đánh giá</h3>
              <hr />
              <div className="d-flex flex-column">
                {[5, 4, 3, 2, 1].map((star) => (
                  <Form.Check
                    key={star}
                    type="checkbox"
                    id={`filter-star-${star}`}
                    label={
                      <span className="text-warning">
                        {star}{" "}
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-warning"
                        />
                      </span>
                    }
                    className="filter-star"
                    onChange={() => handleStarFilterChange(star)}
                    checked={selectedStars.includes(star)}
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Row className="rating-summary mb-4">
            <Col md={4} className="d-flex flex-column align-items-center">
              <h2 className="text-warning rating-score">
                {ratings.averageRating}{" "}
              </h2>
              <p className="text-muted">từ {totalUsers} người sử dụng</p>
            </Col>
            <Col md={8}>
              {[5, 4, 3, 2, 1].map((star, index) => (
                <Row key={star} className="align-items-center mb-2 rating-bar">
                  <Col xs={2} className="text-end">
                    {star}{" "}
                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                  </Col>
                  <Col xs={8}>
                    <div className="progress">
                      <div
                        className="progress-bar bg-dark"
                        role="progressbar"
                        style={{
                          width: `${
                            (ratings.ratingDistribution[index] / totalUsers) *
                            100
                          }%`,
                        }}
                        aria-valuenow={
                          (ratings.ratingDistribution[index] / totalUsers) * 100
                        }
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </Col>
                  <Col xs={2} className="text-start">
                    {ratings.ratingDistribution[index]}
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>

          <div className="review-list">
            {filteredReviews.map((review, index) => (
              <Card key={index} className="mb-3 review-item">
                <div className="review-item-content">
                  <div className="review-avatar-img">
                    <figure className="review-avatar me-3">
                      <img
                        src={`https://i.pravatar.cc/50?u=${review.user}`}
                        alt={review.user}
                        className="review-avatar-img"
                      />
                    </figure>
                  </div>
                  <div className="review-info">
                    <div className="review-user-info">
                      <div className="review-user-info-left">
                        <h3 className="review-user-name mb-0">{review.user}</h3>
                        <span className="review-date text-muted d-block">
                          December 20, 2021
                        </span>
                      </div>
                      <div className="review-stars review-user-info-right">
                        <div className="review-stars-content">
                          {Array(review.stars)
                            .fill()
                            .map((_, i) => (
                              <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className="text-warning review-stars-icon"
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <a className="btn-reply">
                      Phản hồi
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              {[
                ...Array(
                  Math.ceil(
                    (selectedStars.length
                      ? filteredReviews.length
                      : ratings.reviews.length) / reviewsPerPage
                  )
                ).keys(),
              ].map((pageNumber) => (
                <Pagination.Item
                  key={pageNumber + 1}
                  active={pageNumber + 1 === currentPage}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RatingCycle;
