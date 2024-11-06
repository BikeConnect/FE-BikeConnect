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

            {/* Navbar mới cho Khách thuê và Chủ xe */}
            <div className="tab-navbar">
                <button
                    className={`tab-button ${activeTab === 'KhachThue' ? 'active' : ''}`}
                    onClick={() => handleTabChange('KhachThue')}
                >
                    Khách thuê
                </button>
                <button
                    className={`tab-button ${activeTab === 'ChuXe' ? 'active' : ''}`}
                    onClick={() => handleTabChange('ChuXe')}
                >
                    Chủ xe
                </button>
            </div>

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
                    <h2>Quy trình cho thuê xe</h2>
                    <div className="guide-card-container">
                        <div className="guide-card">
                            <h3>1. Đăng ký thành viên BikeConnect</h3>
                            <p>Để có thể cho thuê xe, bạn cần đăng ký tài khoản và đăng nhập vào hệ thống BikeConnect. Bạn có thể sử dụng số điện thoại cá nhân hoặc thông qua các nền tảng bên thứ 3 như Facebook, Google... tuy nhiên bạn bắt buộc phải xác thực số điện thoại trước khi đăng ký cho thuê.</p>
                        </div>
                        <div className="guide-card">
                            <h3>2. Đăng ký xe cho thuê</h3>
                            <p>Để đăng ký xe, bạn cần cung cấp thông tin cơ bản, mô tả và hình ảnh xe lên hệ thống. Chọn mức giá cho thuê mong muốn và thiết lập một số tuỳ chỉnh khác... </p>
                        </div>
                        <div className="guide-card">
                            <h3>3. Chờ BikeConnect duyệt xe</h3>
                            <p>Sau khi đăng ký cho thuê, BikeConnect sẽ kiểm duyệt thông tin xe của bạn và thông báo kết quả qua ứng dụng. Trong trường hợp xe đáp ứng đủ yêu cầu cho thuê, BikeConnect sẽ chủ động liên hệ với bạn để tiếp tục xử lý các bước cần thiết tiếp theo.</p>
                        </div>
                        <div className="guide-card">
                            <h3>4. Nhận và phản hồi yêu cầu thuê xe</h3>
                            <p>Khi có khách gửi yêu cầu thuê xe, chủ xe sẽ nhận được thông báo từ BikeConnect. Bạn cần kiểm tra thông tin cá nhân của khách thuê và xác nhận cho thuê sớm nhất có thể. Khi có sự đồng ý cho thuê từ bạn, khách thuê sẽ tiến hành thanh toán giữ chỗ qua ứng dụng để hoàn tất việc đặt xe. Chủ xe cũng cần lưu ý cập nhật lịch bận xe thường xuyên để đảm bảo xe luôn sẵn sàng trong tình trạng cho thuê nhé.</p>
                        </div>
                        <div className="guide-card">
                            <h3>5. Bàn giao xe</h3>
                            <p>Bạn và khách thuê liên hệ gặp nhau để bàn giao xe. Kiểm tra giấy phép lái xe, các giấy tờ liên quan và tài sản đặt cọc của khách. Kiểm tra xe, kí xác nhận biên bản bàn giao và gửi chìa khóa xe của bạn cho vị khách đáng tin cậy.</p>
                        </div>
                        <div className="guide-card">
                            <h3>6. Kết thúc chuyến</h3>
                            <p>Khách thuê sẽ hoàn trả xe cho bạn theo đúng lịch trình thuê xe. Chủ xe vui lòng kiểm tra kỹ tình trạng xe, kí biên bản nhận lại xe như thoả thuận ban đầu. Đừng quên cho điểm rating khách thuê và gợi ý họ cho điểm bạn trên ứng dụng BikeConnect. Điều này sẽ tăng uy tín của bạn trong cộng đồng thuê xe tự lái BikeConnect.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Guide;
