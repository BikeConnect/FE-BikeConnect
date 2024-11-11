import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import './Footer.css';
import logo from '../../assets/images/8.png';

const Footer = () => {
    return (
        <footer className="bike-footer">
            <div className="footer-container">
        
                <div className="footer-content">
                    <img src={logo} alt="Bike Connect Logo" className="footer-logo" />
                    <p className="footer-text mt-4">Đăng kí email để có thể nhận thông tin về thuê xe từ chúng tôi</p>
                    <div className="footer-email-form mt-4">
                        <input type="email" placeholder="Nhập email của bạn" className="footer-email-input" />
                        <button className="footer-btn-submit">Gửi</button>
                    </div>
                </div>

                <div className="footer-content">
                    <h3 className="footer-title font-bold">Liên kết nhanh</h3>
                    <ul className="footer-links mt-4 space-y-2">
                        <li><a href="#">Trang chủ</a></li>
                        <li><a href="#">Cho thuê xe</a></li>
                        <li><a href="#">Hướng dẫn</a></li>
                        <li><a href="#">Chính sách</a></li>
                        <li><a href="#">Hỗ trợ</a></li>
                    </ul>
                </div>

                <div className="footer-content">
                    <h3 className="footer-title font-bold">Tương tác</h3>
                    <ul className="footer-contact mt-4 space-y-2">
                        <li className="footer-contact-item flex items-center space-x-2">
                            <MapPin className="footer-icon" />
                            <span>Cẩm Lệ, Đà Nẵng</span>
                        </li>
                        <li className="footer-contact-item flex items-center space-x-2">
                            <Mail className="footer-icon" />
                            <span>bikeconnect@gmail.com</span>
                        </li>
                        <li className="footer-contact-item flex items-center space-x-2">
                            <Phone className="footer-icon" />
                            <span>02321324324</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-copyright text-center mt-8 text-sm text-gray-500">
                Copyright © 2024. Bike Connect
            </div>
        </footer>
    );
};

export default Footer;
