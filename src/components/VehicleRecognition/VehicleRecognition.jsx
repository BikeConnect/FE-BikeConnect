import React from 'react';
import './VehicleRecognition.css';

const VehicleRecognition = ({ show, onClose, vehicleData, uploadedImage }) => {
    if (!show) return null;

    return (
        <div className="vehicle-recognition-modal">
            <div className="vehicle-recognition-content">
                <div className="vehicle-recognition-header">
                    <h2>Nhận Diện Phương Tiện</h2>
                    <button className="close-button" onClick={onClose}>✖</button>
                </div>
                <div className="recognition-body">
                    <div className="image-preview">
                        <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
                    </div>
                    <div className="vehicle-details">
                        <h3>Thông Tin Phương Tiện</h3>
                        <p><strong>Loại Phương Tiện:</strong> {vehicleData.type}</p>
                        <p><strong>Biển Số:</strong> {vehicleData.plateNumber}</p>
                        <p><strong>Màu Sắc:</strong> {vehicleData.color}</p>
                        <p><strong>Nhãn Hiệu:</strong> {vehicleData.brand}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleRecognition;
