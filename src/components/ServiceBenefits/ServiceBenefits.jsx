  import React from 'react';
  import { Container, Row, Col } from 'react-bootstrap';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearchLocation, faFileContract, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons'; // Import các icon cần thiết
  import image from '/CAPSTONE-BikeConnect/FE-BikeConnect/src/assets/images/images_homePage/v994_9046.png'; // Đường dẫn tới ảnh của bạn
  import './ServiceBenefits.css'; // Import file CSS

  const ServiceBenefits = () => {
    return (
      <Container fluid className="service-benefits mt-5">
        <Row>
          {/* Phần hình ảnh */}
          <Col md={6} className="image-column">
            <img src={image} alt="Service Benefits" className="img-fluid rounded service-image" />
          </Col>

          {/* Phần văn bản */}
          <Col md={6} className="benefits-content">
            <h1 className="benefits-title">Tại sao bạn nên sử dụng dịch vụ của chúng tôi</h1>
            <div className="benefit-item">
              <FontAwesomeIcon icon={faSearchLocation} className="benefit-icon" />
              <div className="benefit-text">
                <h5>Tim kiếm xe nhanh, gần nhất</h5>
                <p>Với việc tích hợp bản đồ và xác định vị trí nhanh, hệ thống giúp khách hàng có thể tìm kiếm xe nhanh hơn, kèm với đó là giá thành hợp lí.</p>
              </div>
            </div>
            <div className="benefit-item">
              <FontAwesomeIcon icon={faFileContract} className="benefit-icon" />
              <div className="benefit-text">
                <h5>Có hợp đồng khi thuê xe</h5>
                <p>Thực hiện kí bản hợp đồng để đảm bảo lợi ích cho cả 2 bên khi có vấn đề xảy ra.</p>
              </div>
            </div>
            <div className="benefit-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="benefit-icon" />
              <div className="benefit-text">
                <h5>Có thể trả xe khác cơ sở</h5>
                <p>Khi bạn không muốn trả xe về chỗ thuê nhưng không muốn mất tiền cọc thì có thể gửi xe ở cơ sở khác cùng đại lí dù xa.</p>
              </div>
            </div>
            <div className="benefit-item">
              <FontAwesomeIcon icon={faStar} className="benefit-icon" />
              <div className="benefit-text">
                <h5>Đánh giá của người dùng trước</h5>
                <p>Các trải nghiệm của người dùng trước là đánh giá tốt nhất để chọn đúng sau khi thuê xe tiếp từ người cho thuê.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  export default ServiceBenefits;
