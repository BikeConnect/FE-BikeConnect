import React from 'react';
import './CycleInformation.css';
import {
  faMotorcycle,
  faIdCard,
  faClipboardCheck,
  faMapMarkerAlt,
  faUser,
  faStar,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';


const CycleInformation = () => {
  const cycleData = {
    name: "Honda SH 150 ABS 12/2022 Siêu Lướt",
    registerDate: "12/2022",
    color: "Đen Sần",
    licensePlate: "29F1 - 649.62",
    mileage: "3000km (của hãng cam kết chuẩn)",
    description: [
      "Xe chạy lướt như mới và nguyên bản.",
      "Động cơ nguyên bản tuyệt đối & hình thức xe như mới. Đầy đủ phụ kiện 2 điều khiển, 2 gương.",
      "Phanh ABS công nghệ cao hiện đại, an toàn trên mọi cung đường.",
      "Honda SH 2022 với thiết kế hiện đại mang thiên hướng tới từ tương lai. Khối động cơ 150ESP+ thế hệ mới với nhiều công nghệ tiên tiến giúp xe vận hành êm ái, tiết kiệm nhiên liệu.",
    ],
  };

  const ownerDocs = [
    { id: 1, text: "Giấy Đăng Ký Xe" },
    { id: 2, text: "Giấy Chứng Nhận Bảo Hiểm Xe" },
    { id: 3, text: "Giấy Chứng Nhận Đăng Kiểm" }
  ];

  const renterDocs = [
    { id: 1, text: "Chứng Minh Nhân Dân/Căn Cước Công Dân hoặc Hộ Chiếu" },
    { id: 2, text: "Bằng Lái Xe" },
    { id: 3, text: "Giấy Xác Nhận Đặt Thuê Xe (Nếu Đặt Trước)" }
  ];

  return (
    <div className="container my-4">
      {/* Cycle Details Section */}
      <div className="card mb-4 shadow-sm p-4 border-0 h-100">
        <h4 className="text-center cycle-name">{cycleData.name}</h4>
        <div className="row">
          <div className="col-md-6 text-start">
            <div className="list-group">
              <div className="list-group-item border-0 d-flex align-items-center gap-3">
                <FontAwesomeIcon icon={faIdCard} className="icon" />
                <span>Đăng ký: <strong>{cycleData.registerDate}</strong></span>
              </div>
              <div className="list-group-item border-0 d-flex align-items-center gap-3">
                <FontAwesomeIcon icon={faClipboardCheck} className="icon" />
                <span>Biển số: <strong>{cycleData.licensePlate}</strong></span>
              </div>
              <div className="list-group-item border-0 d-flex align-items-center gap-3">
                <FontAwesomeIcon icon={faMotorcycle} className="icon" />
                <span>Màu sơn: <strong>{cycleData.color}</strong></span>
              </div>
              <div className="list-group-item border-0 d-flex align-items-center gap-3">
                <FontAwesomeIcon icon={faClipboardCheck} className="icon" />
                <span>Đã chạy: <strong>{cycleData.mileage}</strong></span>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-start">
            <h3 className="description-title">Mô tả:</h3>
            <ul className="list-unstyled ms-3">
              {cycleData.description.map((desc, index) => (
                <li key={index} className="mb-2">
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm p-4 border-0 h-100">
            <h4 className="documents-title d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faIdCard} className="icon" />
              Giấy tờ về xe của chủ xe
            </h4>
            <ul className="list-group list-group-flush">
              {ownerDocs.map((doc) => (
                <li key={doc.id} className="list-group-item border-0 d-flex align-items-center gap-3">
                  <span className="badge document-badge">{doc.id}</span>
                  <span>{doc.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm p-4 border-0 h-100">
            <h4 className="documents-title d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faIdCard} className="icon" />
              Giấy tờ cần có ở người thuê
            </h4>
            <ul className="list-group list-group-flush">
              {renterDocs.map((doc) => (
                <li key={doc.id} className="list-group-item border-0 document-item d-flex align-items-center gap-3">
                  <span className="badge document-badge">{doc.id}</span>
                  <span>{doc.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="card mb-4 shadow-sm p-4 border-0 mt-4">
        <h4 className="location-title d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          Vị trí xe
        </h4>
        <p className="d-flex align-items-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          45 Lê Độ, Thanh Khê, Đà Nẵng
        </p>
      </div>


      {/* Owner Section */}
      <div className="card shadow-sm p-4 border-0">
        <h4 className="owner-title d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faUser} className="icon" />
          Chủ xe
        </h4>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <img
              src="https://xwatch.vn/upload_images/images/2023/04/26/cristiano-ronaldo-trai-dep-6-mui-thien-tai-da-banh.jpg"
              alt="Owner avatar"
              className="rounded-circle"
              width="70"
              height="70"
            />
            <div>
              <h5 className="mb-0">Phan Văn Minh Mạnh</h5>
              <div className="text-warning d-flex align-items-center">
                <FontAwesomeIcon icon={faStar} className="me-1" /> 5
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default CycleInformation;
