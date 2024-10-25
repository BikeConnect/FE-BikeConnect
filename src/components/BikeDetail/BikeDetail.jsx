import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Heart } from 'lucide-react';
import './BikeDetail.css';

const BikeDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    '/path-to-images/bike1.jpg',
    '/path-to-images/bike2.jpg',
    '/path-to-images/bike3.jpg',
    '/path-to-images/bike4.jpg',
    '/path-to-images/bike5.jpg'
  ];

  const bikeInfo = {
    name: 'Honda SH 150 ABS Đen Sần 12/2022 Siêu Lướt',
    price: '140,000 VND/ngày',
    details: {
      registration: '12/2022',
      color: 'Đen Sần',
      plate: '29F1 - 649.82',
      mileage: '3000km (của hàng cam kết chuẩn)',
    }
  };

  return (
    <Container className="bike-detail-container">
      <Row>
        <Col md={7}>
          <div className="image-gallery">
            <div className="main-image">
              <img src={images[selectedImage]} alt="Bike main view" />
            </div>
            <div className="thumbnail-list">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </Col>
        
        <Col md={5}>
          <div className="bike-info">
            <div className="favorite-btn">
              <Heart size={20} />
            </div>
            <span className="badge">Còn xe</span>
            <h1 className="bike-title">{bikeInfo.name}</h1>
            <h2 className="bike-price">{bikeInfo.price}</h2>

            <div className="rental-form">
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Địa điểm nhận xe</Form.Label>
                      <Form.Select>
                        <option>Tại cửa hàng</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>&nbsp;</Form.Label>
                      <Form.Select>
                        <option>Tự chọn</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian nhận xe</Form.Label>
                      <Form.Control type="datetime-local" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian trả xe</Form.Label>
                      <Form.Control type="datetime-local" />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="price-breakdown">
                  <div className="price-item">
                    <span>Đơn giá xe</span>
                    <span>140,000 VND/ngày</span>
                  </div>
                  <div className="price-item">
                    <span>Phí bảo hiểm</span>
                    <span>10,000 VND</span>
                  </div>
                  <div className="price-item">
                    <span>Phí đặt cọc</span>
                    <span>1500,000 VND</span>
                  </div>
                  <div className="price-item total">
                    <span>Tổng thanh toán</span>
                    <span>1650,000 VND/ngày</span>
                  </div>
                </div>

                <Button className="rent-button" variant="primary" size="lg">
                  Thuê xe ngay
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>

      <div className="bike-description">
        <h3>Mô tả về xe</h3>
        <div className="description-items">
          {Object.entries(bikeInfo.details).map(([key, value]) => (
            <div key={key} className="description-item">
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
        <p className="condition">
          Xe chạy lướt như mới và nguyên bản<br />
          Động cơ nguyên bản hoạt động êm & bình thực xe như mới. Đầy đủ phụ kiện 2 đầu khóa, 2 gương...
        </p>
      </div>
    </Container>
  );
};

export default BikeDetail;