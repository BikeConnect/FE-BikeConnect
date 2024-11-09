import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { ArrowRight } from 'lucide-react';
import './RentalSignup.css';

const RentalSignup = () => {
  return (
    <Container fluid className="rental-signup-container">
      <div className="rental-content">
        <div className="rental-text">
          <h2>Trở thành người cho thuê xe</h2>
          <p>Bạn muốn cho thuê xe của mình, Hãy hợp tác với chúng tôi</p>
        </div>
        <Button className="signup-button">
          Đăng nhập hoặc tạo tài khoản
          <ArrowRight size={16} />
        </Button>
      </div>
    </Container>
  );
};

export default RentalSignup;