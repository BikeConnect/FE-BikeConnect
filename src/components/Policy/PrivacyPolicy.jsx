import React from 'react';
import './PrivacyPolicy.css';
import PolicyNavBar from './PolicyNarBav';
import { NavLink } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div>
            <PolicyNavBar />
            <div className="privacy-policy-page">
                <header className="privacy-policy-header">
                    <h1>Chính sách bảo mật</h1>
                </header>

                <main className="privacy-policy-content">
                    <h2>1. Giới thiệu</h2>
                    <p>Đây là nội dung giới thiệu về chính sách bảo mật của Mioto...</p>

                    <h2>2. Khi nào Mioto sẽ thu thập dữ liệu cá nhân?</h2>
                    <p>Nội dung về thời điểm thu thập dữ liệu cá nhân...</p>

                    <h2>3. Phạm vi, mục đích thu thập và sử dụng thông tin</h2>
                    <p>Nội dung về phạm vi, mục đích thu thập và sử dụng thông tin...</p>

                    <h2>4. Những người hoặc tổ chức có thể được tiếp cận với thông tin</h2>
                    <p>Thông tin về các tổ chức có thể tiếp cận dữ liệu...</p>

                    <h2>5. Mioto có tiết lộ thông tin của người dùng không?</h2>
                    <p>Nội dung về việc tiết lộ thông tin người dùng...</p>

                    <h2>6. Cách Mioto lưu trữ, bảo vệ thông tin người dùng và những cảnh báo rủi ro</h2>
                    <p>Thông tin về cách bảo vệ dữ liệu và các cảnh báo liên quan...</p>

                    <h2>7. Phương tiện và công cụ để người dùng tiếp cận, chỉnh sửa và hủy bỏ dữ liệu cá nhân của mình</h2>
                    <p>Nội dung về phương tiện để người dùng quản lý dữ liệu cá nhân...</p>

                    <h2>8. Thu thập các dữ liệu khác</h2>
                    <p>Thông tin về việc thu thập dữ liệu khác ngoài dữ liệu cá nhân...</p>

                    <h2>9. Cookies</h2>
                    <p>Nội dung về việc sử dụng cookies...</p>

                    <h2>10. Thông tin về trẻ em</h2>
                    <p>Thông tin liên quan đến dữ liệu của trẻ em...</p>

                    <h2>11. Loại trừ trách nhiệm về nghĩa vụ bảo mật và các trang web bên thứ ba</h2>
                    <p>Nội dung loại trừ trách nhiệm...</p>

                    <h2>12. Cơ chế tiếp nhận và giải quyết khiếu nại liên quan đến việc thông tin cá nhân khách hàng bị sử dụng sai mục đích hoặc phạm vi đã thông báo</h2>
                    <p>Nội dung về cơ chế tiếp nhận khiếu nại...</p>
                </main>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
