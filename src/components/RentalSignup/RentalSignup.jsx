import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ArrowRight } from 'lucide-react';
import Login from '../Login/Login';
import './RentalSignup.css';

const RentalSignup = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = (role) => {
    console.log('Đăng nhập thành công:', role);
    setShowLogin(false);
  };

  return (
    <Container fluid className="rental-signup-container">
      <Row className="rental-content align-items-center">
        <Col md={7} className="rental-text">
          <h2>Trở thành người cho thuê xe</h2>
          <p>Bạn muốn cho thuê xe của mình, hãy hợp tác với chúng tôi.</p>
        </Col>
        <Col md={4} className="text-md-end text-center">
          <Button className="signup-button" onClick={handleShowLogin}>
            Đăng nhập hoặc tạo tài khoản
            <ArrowRight size={16} />
          </Button>
        </Col>
      </Row>

      {/* Component Login */}
      <Login
        show={showLogin}
        onClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </Container>
  );
};

export default RentalSignup;
