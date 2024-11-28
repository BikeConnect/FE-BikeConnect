import React from "react";
import "./CycleInformation.css";
import {
  faMotorcycle,
  faIdCard,
  faClipboardCheck,
  faMapMarkerAlt,
  faUser,
  faStar,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";

const CycleInformation = () => {
  const cycleData = {
    name: "Honda SH 150 ABS 12/2022 Siêu Lướt",
    registerDate: "12/2022",
    color: "Đen Sần",
    licensePlate: "29F1 - 649.62",
    mileage: "3000km (của hãng cam kết chuẩn)",
    description: ["Xe số Honda Wave RSX 110cc đời 2022,đen"],
  };

  return (
    <div className="container">
      {/* Cycle Details Section */}

      {/* Documents Section */}
      {/* <div className="row">
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm p-4 border-0 h-100">
            <h4 className="documents-title d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faIdCard} className="icon" />
              Giấy tờ về xe của chủ xe
            </h4>
            <ul className="list-group list-group-flush">
              {ownerDocs.map((doc) => (
                <li
                  key={doc.id}
                  className="list-group-item border-0 d-flex align-items-center gap-3"
                >
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
                <li
                  key={doc.id}
                  className="list-group-item border-0 document-item d-flex align-items-center gap-3"
                >
                  <span className="badge document-badge">{doc.id}</span>
                  <span>{doc.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}

      {/* Location Section */}
      {/* <div className="card mb-4 shadow-sm p-4 border-0 mt-4">
        <h4 className="location-title d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          Vị trí xe
        </h4>
        <p className="d-flex align-items-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          45 Lê Độ, Thanh Khê, Đà Nẵng
        </p>
      </div> */}

      {/* Owner Section */}
      {/* <div className="card shadow-sm p-4 border-0">
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
      </div> */}
    </div>
  );
};

export default CycleInformation;
