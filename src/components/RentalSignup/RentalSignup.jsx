import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import Login from "../Login/Login";
import "./RentalSignup.css";

const RentalSignup = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = (role) => {
    console.log("Đăng nhập thành công:", role);
    setShowLogin(false);
  };

  return (
    <Container fluid className="rental-signup-container">
      <Row className="rental-content align-items-center">
        <Col md={7} className="rental-text">
          <h2 className="rental-title">Trở thành người cho thuê xe</h2>
          <p>Bạn muốn cho thuê xe của mình, hãy hợp tác với chúng tôi.</p>
        </Col>
        <Col md={4} className="">
          <Button
            className="btn-rentalSignup"
            style={{
              display: "flex",
              "flex-direction": "row",
              "align-items": "center",
              gap: "12px",
              "justify-content": "center",
              width: "286px",
              "border-radius": "24px",
            }}
            onClick={handleShowLogin}
          >
            <span className="btn-rental-text">
              Đăng nhập hoặc tạo tài khoản
            </span>
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
