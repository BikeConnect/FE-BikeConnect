import React, { useState } from 'react';
import GuideNavBar from './GuideNavBar';
import './Guide.css';

const Guide = () => {
    const [activeTab, setActiveTab] = useState('KhachThue');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="guide">
            <GuideNavBar activeTab={activeTab} onTabChange={handleTabChange} />

            {activeTab === 'KhachThue' ? (
                <div className="guide-content">
                    <h2>Quy trình thuê xe</h2>
                    <div className="guide-card-container">
                        <div className="guide-card">
                            <h3>1. Đăng ký thành viên BikeConnect</h3>
                            <p>Để có thể đặt xe, bạn cần đăng ký tài khoản và đăng nhập vào hệ thống BikeConnect. Bạn có thể sử dụng số điện thoại cá nhân hoặc thông qua các nền tảng bên thứ 3 như Facebook, Google... tuy nhiên bạn bắt buộc phải xác thực số điện thoại trước khi đặt xe.</p>
                        </div>
                        <div className="guide-card">
                            <h3>2.Tìm xe</h3>
                            <p>Chọn loại dịch vụ thuê xe, tuỳ chỉnh thời gian và địa điểm theo nhu cầu lộ trình. Bạn có thể sử dụng thêm bộ lọc trong trường trường hợp có nhu cầu cụ thể về dòng xe, truyền động, giá thành ... Ngoài ra bạn nên lưu ý thêm về các thông tin quan trọng khi thuê xe như Giấy tờ thuê xe, Phụ phí cũng như những chính sách riêng mà chủ xe quy định trong điều khoản thuê xe.</p>
                        </div>
                        <div className="guide-card">
                            <h3>3.Đặt xe</h3>
                            <p>Sau khi tìm được xe phù hợp với nhu cầu, khách thuê cần kiểm tra lại chính xác thông tin về thời gian, lộ trình cũng như giấy tờ thuê xe, sau cùng gửi yêu cầu thuê xe đến chủ xe. Khách thuê sẽ phải chờ chủ xe đồng ý yêu cầu thuê xe sau đó tiếp tục bước thanh toán để giữ chỗ chiếc xe cho chuyến đi sắp tới. </p>
                        </div>
                        <div className="guide-card">
                            <h3>4.Thanh toán giữ chỗ</h3>
                            <p>Sau khi được sự đồng ý từ chủ xe, khách thuê sẽ tiến hành thanh toán để giữ chỗ. Hiện tại BikeConnect áp dụng chính sách thanh toán 30% giá trị chuyến qua ứng dụng để giữ chỗ. BikeConnect hỗ trợ đầy đủ các hình thức thanh toán từ chuyển khoản, ví điện tử, liên kết thẻ ..</p>
                        </div>
                        <div className="guide-card">
                            <h3>5.Nhận xe</h3>
                            <p>Khách thuê và chủ xe liên hệ gặp nhau để nhận xe tại địa chỉ xe hoặc tại địa điểm giao nhận cụ thể mà khách thuê đã chọn trên ứng dụng. Khách thuê kiểm tra tình trạng xe thực tế và giấy tờ xe, xuất trình bản gốc các giấy tờ thuê xe theo yêu cầu của chủ xe, kí xác nhận biên bản giao xe, nhận chìa khóa và bắt đầu hành trình.</p>
                        </div>
                        <div className="guide-card">
                            <h3>6.Trả xe</h3>
                            <p>Sau khi hết thời gian thuê, bạn hoàn trả xe giống như tình trạng và thỏa thuận ban đầu. Kí xác nhận biên bản bàn giao, nhận lại giấy tờ để hoàn thành chuyến đi tuyệt vời của bạn. </p>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="guide-content">
                    <h2>Quy trình dành cho Chủ xe</h2>
                    <div className="guide-card-container">
                        {/* Example card */}
                        <div className="guide-card">
                            <h3>1. Đăng ký thành viên Mioto</h3>
                            <p>Để có thể cho thuê xe, bạn cần đăng ký tài khoản...</p>
                        </div>
                        {/* Add other cards similarly */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Guide;