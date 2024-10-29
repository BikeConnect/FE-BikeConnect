import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ArrowRight } from 'lucide-react';
import './CycleTips.css';
import tintucxe from '../../assets/images/images_homePage/v994_9281.png'

const CycleTips = () => {
  const tips = [
    {
      id: 1,
      image: tintucxe,
      title: "Bao lâu nên thay nhớt xe đạp 1 lần là tốt nhất?",
      link: "https://shop2banh.vn/tu-van/dau-nhot-xe-so-co-thay-cho-xe-tay-ga-duoc-khong-3918.html"
    },
    {
      id: 2,
      image: tintucxe,
      title: "Làm sao để bảo dưỡng xe đạp đúng cách?",
      link: "https://shop2banh.vn/tu-van/dau-nhot-xe-so-co-thay-cho-xe-tay-ga-duoc-khong-3918.html"
    },
    {
      id: 3,
      image: tintucxe,
      title: "Mẹo giúp kéo dài tuổi thọ xe đạp của bạn",
      link: "https://shop2banh.vn/tu-van/dau-nhot-xe-so-co-thay-cho-xe-tay-ga-duoc-khong-3918.html"
    },
    {
      id: 4,
      image: tintucxe,
      title: "Các bước kiểm tra an toàn trước khi đi xe đạp",
      link: "https://shop2banh.vn/tu-van/dau-nhot-xe-so-co-thay-cho-xe-tay-ga-duoc-khong-3918.html"
    }
  ];

  return (
    <Container className="cycle-tips-container">
      <h1 className="main-title">Một số điều cần biết về xe </h1>
      <Row>
        {tips.map((tip) => (
          <Col key={tip.id} xs={12} sm={6} md={3}>
            <Card className="tip-card">
              <div className="card-image-wrapper">
                <Card.Img variant="top" src={tip.image} className="tip-image" />
              </div>
              <Card.Body>
                <Card.Title className="tip-title">{tip.title}</Card.Title>
                <a href={tip.link} className="read-more-link" target="_blank" rel="noopener noreferrer">
                  <span>Read More</span>
                  <ArrowRight size={16} />
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CycleTips;
