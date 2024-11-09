import React from 'react';
import './Complaints.css';
import PolicyNavBar from './PolicyNarBav';

const Complaints = () => {
    return (
        <div>
            <PolicyNavBar />
            <div className="complaints-page">
                <header className="complaints-header">
                    <h1>Quy trình giải quyết khiếu nại</h1>
                </header>

                <main className="complaints-content">
                    <p>
                        Công ty và Chủ xe có trách nhiệm tiếp nhận các khiếu nại và hỗ trợ Khách hàng liên quan đến các giao dịch được kết nối thông qua Sàn giao dịch. Các khiếu nại liên quan đến việc cung cấp, sử dụng dịch vụ thuê xe trên Sàn giao dịch do Công ty chịu trách nhiệm độc lập giải quyết trên cơ sở quy định của pháp luật, Điều khoản và Điều kiện sử dụng dịch vụ, các thông báo, quy chế đã công bố với Thành viên (Khách hàng và Chủ xe). Khi phát sinh tranh chấp, Công ty đề cao giải pháp thương lượng, hòa giải giữa các bên nhằm duy trì sự tin cậy của Thành viên vào chất lượng dịch vụ của Sàn giao dịch. Khách hàng có thể thực hiện theo các bước sau:
                    </p>

                    <h2>Bước 1: Khiếu nại</h2>
                    <p>
                        Khách hàng khiếu nại về dịch vụ qua số điện thoại 1900 9217 hoặc gửi mail cho Bộ phận Chăm sóc Khách hàng tại địa chỉ support@mioto.vn. Thời gian để Công ty tiếp nhận khiếu nại là 3 ngày kể từ ngày sử dụng dịch vụ hoặc từ ngày phát sinh sự việc.
                    </p>

                    <h2>Bước 2: Xác nhận thông tin</h2>
                    <p>
                        Trong thời hạn (3) ngày làm việc kể từ khi tiếp nhận thông tin khiếu nại của Khách hàng, Bộ phận Chăm sóc Khách hàng xác nhận thông tin khiếu nại, tiến hành phân loại thông tin và thông báo cho Khách hàng:
                    </p>
                    <ul>
                        <li>Ghi nhận các yêu cầu và các khiếu nại có liên quan đến Công ty và trong thời hạn khiếu nại.</li>
                        <li>Từ chối các yêu cầu, các khiếu nại không có liên quan đến Công ty và hết thời hạn khiếu nại.</li>
                    </ul>

                    <h2>Bước 3: Giải quyết vấn đề</h2>
                    <p>
                        Bộ phận Chăm sóc Khách hàng sẽ tiến hành xác minh, kiểm chứng và phân tích tính chất và mức độ của nội dung khiếu nại, phạm vi khiếu nại và trách nhiệm xử lý để phối hợp với Chủ xe và Bên cung cấp dịch vụ thứ 3 đưa ra biện pháp cụ thể để hỗ trợ Khách hàng giải quyết tranh chấp đó.
                    </p>
                    <ul>
                        <li>Chuyển các vấn đề có liên quan trực tiếp đến Công ty cho các Bộ phận có liên quan kiểm tra và đối chiếu.</li>
                        <li>Chuyển các vấn đề có liên quan cho Chủ xe giải quyết.</li>
                    </ul>
                    <p>
                        Trong thời hạn ba (3) ngày làm việc kể từ khi tiếp nhận thông báo về khiếu nại, Chủ xe có trách nhiệm phối hợp với Mioto để giải quyết, xử lý khiếu nại. Chủ xe sẽ thông báo cho Khách hàng biện pháp xử lý hoặc ủy quyền thông báo cho Công ty.
                    </p>

                    <h2>Bước 4: Đóng khiếu nại</h2>
                    <ul>
                        <li>Khách hàng đồng ý với các phản hồi của Bộ phận Chăm sóc Khách hàng -> Kết thúc khiếu nại. Khách hàng không đồng ý -> Quay lại bước 3.</li>
                        <li>Theo dõi các giải quyết khiếu nại của Chủ xe -> Kết thúc khiếu nại khi Khách hàng và Chủ xe đã thỏa thuận xong.</li>
                    </ul>
                    <p>
                        Khi nhận được thông báo về biện pháp xử lý từ Chủ xe nhưng Khách hàng không đồng ý thì Công ty sẽ chủ trì việc thương lượng, hòa giải giữa Khách hàng và Chủ xe để đi đến kết quả giải quyết phù hợp với cả hai bên.
                    </p>
                    <p>
                        Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi của người dùng...
                    </p>
                    <p>
                        Sau khi Khách hàng và Chủ xe đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để cập nhật tình hình. Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Chủ xe: Công ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng.
                    </p>
                </main>
            </div>
        </div>
    );
};

export default Complaints;
