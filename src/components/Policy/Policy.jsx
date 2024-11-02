import React from 'react';
import './Policy.css';
import PolicyNavBar from './PolicyNarBav';
import { NavLink } from 'react-router-dom';

const PolicyPage = () => {
    return (
        <div>
            <PolicyNavBar />
            <div className="policy-page">
                <header className="policy-header">
                    <h1>Chính sách & Quy định</h1>
                </header>

                <section className="notification">
                    <p>
                        BikeConnect xin thông báo về việc bổ sung <b><NavLink to="/policies2">Chính sách bảo mật</NavLink></b> liên quan đến các vấn đề mới trong việc bảo vệ dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP của Chính phủ Việt Nam.
                    </p>
                    <p>
                        Với sự cam kết từ BikeConnect, chúng tôi luôn nỗ lực để xây dựng cộng đồng an toàn và đáng tin cậy...
                    </p>
                </section>

                <main className="policy-content">
                    <h2>Chính sách & Quy định</h2>

                    <div className="policy-item">
                        <h3>1. Trách nhiệm của khách thuê xe và chủ xe trong giao dịch cho thuê xe tự lái</h3>
                        <p>A. Trách nhiệm của chủ xe...</p>
                        <p>B. Trách nhiệm của khách thuê xe...</p>
                    </div>

                    <div className="policy-item">
                        <h3>2. Trách nhiệm của BikeConect trong các trường hợp xảy ra sự cố ngoài ý muốn</h3>
                        <p>BikeConect sẽ hỗ trợ các bên liên quan trong các sự cố xảy ra ngoài ý muốn...</p>
                    </div>

                    <div className="policy-item">
                        <h3>3. Chính sách hủy chuyến</h3>
                        <p>A. Điều kiện hủy chuyến...</p>
                        <p>B. Phí hủy chuyến...</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Thời gian hủy chuyến</th>
                                    <th>Phí hủy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>7 ngày trước chuyến</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>Trong vòng 24 giờ</td>
                                    <td>100%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="policy-item">
                        <h3>4. Chính sách giá</h3>
                        <p>Chi tiết chính sách giá...</p>
                    </div>

                    <div className="policy-item">
                        <h3>5. Chính sách thanh toán</h3>
                        <p>Sau khi nhận được sự đồng ý cho thuê xe từ chủ xe, bạn cần phải đặt cọc trước cho BikeConect...</p>
                    </div>

                    <div className="policy-item">
                        <h3>6. Chính sách thời gian giao nhận</h3>
                        <p>Thời gian thuê xe mặc định trong hệ thống là từ 9h tối đến 8h tối ngày kế tiếp...</p>
                    </div>

                    <div className="policy-item">
                        <h3>7. Chính sách kết thúc sớm chuyến đi</h3>
                        <p>Nếu muốn kết thúc sớm chuyến đi, bạn cần trao đổi và nhận được sự đồng ý từ chủ xe...</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PolicyPage;

