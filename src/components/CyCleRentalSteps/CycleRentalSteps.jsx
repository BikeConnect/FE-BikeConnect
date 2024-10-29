import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHandshake, faKey, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import cachthue from '../../assets/images/images_homePage/v994_9046.png'
import './CycleRentalSteps.css';

const CycleRentalSteps = () => {
  return (
    <Container fluid className="cycle-rental-steps mt-5">
      <Row>
        {/* Phần văn bản */}
        <Col md={6} className="steps-content">
          <h1 className="steps-title">Làm thế nào để thuê xe đạp</h1>
          <div className="step-item">
            <FontAwesomeIcon icon={faSearch} className="step-icon" />
            <div className="step-text">
              <h5>Tìm kiếm xe đạp</h5>
              <p>Đăng kí và tìm kiếm xe đạp mà bạn mong muốn để phục vụ cho trải nghiệm.</p>
            </div>
          </div>
          <div className="step-item">
            <FontAwesomeIcon icon={faHandshake} className="step-icon" />
            <div className="step-text">
              <h5>Gặp mặt và kí hợp đồng</h5>
              <p>Liên hệ và đặt xe đạp, thực hiện kí bản hợp đồng để đảm bảo lợi ích cho cả hai bên.</p>
            </div>
          </div>
          <div className="step-item">
            <FontAwesomeIcon icon={faKey} className="step-icon" />
            <div className="step-text">
              <h5>Nhận chìa khóa và trải nghiệm xe đạp</h5>
              <p>Nhận chìa khóa và sử dụng xe đạp theo bản hợp đồng đã kí trước đó.</p>
            </div>
          </div>
          <div className="step-item">
            <FontAwesomeIcon icon={faMotorcycle} className="step-icon" /> {/* Icon xe máy đại diện cho xe đạp */}
            <div className="step-text">
              <h5>Trả xe đạp</h5>
              <p>
                Sau khi thuê xe đạp xong bạn có thể trả cho chủ xe, đảm bảo xe giống như hợp đồng.
                Đặc biệt bạn có thể trả xe ở các cơ sở địa điểm khác nhau, đừng quên đánh giá dịch vụ nhé!
              </p>
            </div>
          </div>
        </Col>

        {/* Phần hình ảnh */}
        <Col md={6} className="image-column">
          <img src={cachthue} alt="Cycle Rental" className="img-fluid rounded cycle-image" />
        </Col>
      </Row>
    </Container>
  );
};

export default CycleRentalSteps;
