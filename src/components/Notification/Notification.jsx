import React, { useState } from 'react';
import './Notification.css';

const Notification = ({ show, onClose }) => {
    const [activeSection, setActiveSection] = useState('');

    if (!show) return null;

    const notifications = {
        'Yêu cầu thuê/cho thuê xe': [
            'Có 1 yêu cầu mới từ người thuê.',
            'Người thuê đang chờ phê duyệt yêu cầu của bạn.',
            'Yêu cầu thuê xe đã được xác nhận.'
        ],
        'Giao dịch sắp tới': [
            'Bạn có một giao dịch sắp diễn ra vào ngày 5 tháng 11.',
            'Nhắc nhở: giao dịch vào lúc 15:00 hôm nay.',
            'Giao dịch của bạn đã được xác nhận.'
        ],
        'Thay đổi liên quan đến giao dịch': [
            'Đã có thay đổi về giờ giao hàng cho giao dịch của bạn.',
            'Người thuê đã thay đổi thời gian thuê.',
            'Vui lòng kiểm tra lại thông tin giao dịch của bạn.'
        ]
    };

    const handleSectionClick = (section) => {
        setActiveSection((prev) => (prev === section ? '' : section));
    };

    return (
        <div className="notification-modal">
            <div className="notification-header">
                <h2>Thông báo</h2>
                <button className="close-button" onClick={onClose}>✖</button>
            </div>
            <div className="notification-nav">
                {Object.keys(notifications).map((key) => (
                    <button key={key} className="nav-item" onClick={() => handleSectionClick(key)}>
                        {key}
                    </button>
                ))}
            </div>
            <div className="notification-content">
                {activeSection && (
                    <div>
                        <h4>{activeSection}</h4>
                        <ul>
                            {notifications[activeSection].map((notification, i) => (
                                <li key={i}>{notification}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notification;
