import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import './RegisterOwner.css';

const RegisterOwner = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    identityCard: '',
    address: '',
    businessType: 'individual',
    businessName: '',
    taxNumber: '',
    bankAccount: '',
    bankName: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  if (!show) return null;

  return (
    <div className="register-modal-overlay">
      <Container className="register-modal-container">
        <div className="register-header">
          <h2 className="register-title">Đăng ký cho thuê xe</h2>
          <Button 
            variant="link" 
            className="close-button"
            onClick={onClose}
          >
            ×
          </Button>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="Nhập số điện thoại"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Nhập email"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Tên hiển thị</Form.Label>
                <Form.Control
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  placeholder="Nhập tên hiển thị"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Số CMND/CCCD</Form.Label>
                <Form.Control
                  type="text"
                  name="identityCard"
                  value={formData.identityCard}
                  onChange={handleChange}
                  required
                  placeholder="Nhập số CMND/CCCD"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Nhập địa chỉ"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Loại hình kinh doanh</Form.Label>
                <Form.Select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="business-type-select"
                >
                  <option value="individual">Cá nhân</option>
                  <option value="business">Doanh nghiệp</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {formData.businessType === 'business' && (
              <>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Tên doanh nghiệp</Form.Label>
                    <Form.Control
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Nhập tên doanh nghiệp"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Mã số thuế</Form.Label>
                    <Form.Control
                      type="text"
                      name="taxNumber"
                      value={formData.taxNumber}
                      onChange={handleChange}
                      placeholder="Nhập mã số thuế"
                    />
                  </Form.Group>
                </Col>
              </>
            )}

            <Col md={6}>
              <Form.Group>
                <Form.Label>Số tài khoản ngân hàng</Form.Label>
                <Form.Control
                  type="text"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleChange}
                  required
                  placeholder="Nhập số tài khoản"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Tên ngân hàng</Form.Label>
                <Form.Control
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                  placeholder="Nhập tên ngân hàng"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Mật khẩu</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Nhập mật khẩu"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Xác nhận mật khẩu"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="terms-group">
                <Form.Check
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  label={
                    <span>
                      Tôi đã đọc và đồng ý với{' '}
                      <a href="#" className="terms-link">
                        Điều khoản và Điều kiện
                      </a>{' '}
                      của Bike Connect
                    </span>
                  }
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Button
                variant="primary"
                type="submit"
                className="register-submit-btn"
              >
                Đăng ký
              </Button>
            </Col>

            <Col md={12}>
              <div className="social-login-buttons">
                <Button
                  variant="outline-secondary"
                  className="social-button google-button"
                >
                  <FaGoogle /> Google
                </Button>
                <Button
                  variant="outline-secondary"
                  className="social-button facebook-button"
                >
                  <FaFacebook /> Facebook
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterOwner;