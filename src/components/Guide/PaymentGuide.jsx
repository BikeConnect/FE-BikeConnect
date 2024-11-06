import React, { useState } from 'react';
import GuideNavBar from './GuideNavBar';
import './PaymentGuide.css';

const PaymentGuide = () => {
    const [activeTab, setActiveTab] = useState('KhachThue');
    const [expanded, setExpanded] = useState(null); // State to manage expanded sections

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const toggleExpand = (index) => {
        setExpanded(expanded === index ? null : index); // Toggle expanded section
    };

    const paymentGuideContent = [
        {
            title: '1. Thanh toán bằng hình thức chuyển khoản ngân hàng',
            details: ['Thông tin chi tiết về hình thức chuyển khoản ngân hàng...']
        },
        {
            title: '2. Thanh toán trực tuyến - Ví điện tử',
            details: ['Thông tin chi tiết về thanh toán qua ví điện tử...']
        },
        {
            title: '3. Thanh toán qua thẻ tín dụng/thẻ ghi nợ VISA, Master',
            details: ['Thông tin chi tiết về thanh toán qua thẻ tín dụng...']
        },
        {
            title: '4. Thanh toán qua thẻ ATM đã đăng ký thanh toán trực tuyến',
            details: ['Thông tin chi tiết về thanh toán qua thẻ ATM...']
        },
        {
            title: '5. Thanh toán bằng hình thức dùng thẻ quà (voucher)',
            details: ['Thông tin chi tiết về việc sử dụng thẻ quà...']
        },
        {
            title: '6. Thanh toán qua thẻ của tôi',
            details: ['Thông tin chi tiết về việc thanh toán qua thẻ của tôi...']
        }
    ];

    const processGuideContent = [
        {
            title: '1. Quy trình thanh toán giữa khách hàng và chủ xe',
            details: ['Thông tin chi tiết về quy trình thanh toán giữa khách hàng và chủ xe...']
        },
        {
            title: '2. Quy trình thanh toán giữa Chủ xe và Công ty',
            details: ['Thông tin chi tiết về quy trình thanh toán giữa Chủ xe và Công ty...']
        }
    ];

    return (
        <div className="guide">
            <GuideNavBar activeTab={activeTab} onTabChange={handleTabChange} />

            <div className="guide-content">
                <h2>Hướng dẫn thanh toán</h2>
                <div className="guide-list">
                    {paymentGuideContent.map((item, index) => (
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
                <h2>Quy trình thanh toán</h2>
                <div className="guide-list">
                    {processGuideContent.map((item, index) => (
                        <div key={index} className={`guide-item ${expanded === index + paymentGuideContent.length ? 'expanded' : ''}`}>
                            <span onClick={() => toggleExpand(index + paymentGuideContent.length)} className="guide-title">
                                {item.title} <span className="toggle-icon">{expanded === index + paymentGuideContent.length ? '-' : '+'}</span>
                            </span>
                            {expanded === index + paymentGuideContent.length && (
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
        </div>
    );
};

export default PaymentGuide;
