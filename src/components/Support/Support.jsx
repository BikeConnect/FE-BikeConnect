import React from 'react';
import './Support.css';

const Support = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="support-modal">
            <div className="support-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>Thông tin hỗ trợ</h2>
                <p>Mọi chi tiết xin liên hệ: <b>00123</b></p>
                <p>Trong thời gian: <b>8 AM - 10 PM</b></p>
                <p>Hoặc gửi thông tin qua email: <b>bikeconnect1@gmail.com</b></p>
            </div>
        </div>
    );
};

export default Support;