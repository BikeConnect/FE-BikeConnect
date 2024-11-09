import React, { useState } from 'react';
import GuideNavBar from './GuideNavBar';
import './BookingGuide.css';

const BookingGuide = () => {
    const [activeTab, setActiveTab] = useState('KhachThue');
    const [expanded, setExpanded] = useState(null); // State to manage expanded sections

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const toggleExpand = (index) => {
        setExpanded(expanded === index ? null : index); // Toggle expanded section
    };

    const guideContent = [
        {
            title: '1. Đăng ký/ Đăng nhập tài khoản',
            details: [
                'A. Bạn cần cung cấp số điện thoại và xác thực.',
                'B. Bạn cũng có thể sử dụng tài khoản Facebook hoặc Google.'
            ]
        },
        {
            title: '2. Tìm kiếm xe',
            details: [
                'A. Nhập thông tin về thời gian và địa điểm.',
                'B. Chọn loại xe bạn muốn.'
            ]
        },
        {
            title: '3. Sử dụng bộ lọc tìm kiếm xe mong muốn',
            details: [
                'A. Lọc theo giá, loại xe, và các yếu tố khác.',
                'B. Kiểm tra các thông tin bổ sung nếu có.'
            ]
        },
        {
            title: '4. Lựa chọn xe mong muốn và gửi yêu cầu thuê xe',
            details: [
                'A. Đảm bảo rằng thông tin là chính xác.',
                'B. Chờ phản hồi từ chủ xe.'
            ]
        },
        {
            title: '5. Thanh toán giữ chỗ',
            details: [
                'A. Thanh toán 30% giá trị chuyến.',
                'B. Kiểm tra các hình thức thanh toán khả dụng.'
            ]
        }
    ];

    return (
        <div className="guide">
            <GuideNavBar activeTab={activeTab} onTabChange={handleTabChange} />

            {activeTab === 'KhachThue' ? (
                <div className="guide-content">
                    <h2>Hướng dẫn chi tiết đặt xe</h2>
                    <div className="guide-list">
                        {guideContent.map((item, index) => (
                            <div key={index} className={`guide-item ${expanded === index ? 'expanded' : ''}`}>
                                <span onClick={() => toggleExpand(index)} className="guide-title">
                                    {item.title} <span className="toggle-icon">{expanded === index ? '-' : '+'}</span>
                                </span>
                                {expanded === index && (
                                    <div className="guide-details">
                                        {item.details.map((detail, i) => (
                                            <p key={i}>{detail}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="guide-content">
                    <h2>Quy trình dành cho Chủ xe</h2>
                    {/* Add the content for vehicle owners here */}
                </div>
            )}
        </div>
    );
};

export default BookingGuide;
