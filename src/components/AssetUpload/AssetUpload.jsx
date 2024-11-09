import React, { useState } from 'react';
import './AssetUpload.css';

const AssetUpload = ({ onClose, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile);
        } else {
            alert('Hãy chọn một file ảnh.');
        }
    };

    return (
        <div className="asset-upload-modal">
            <div className="asset-upload-content">
                <h3>Upload Ảnh</h3>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <div className="upload-actions">
                    <button onClick={handleUpload} className="confirm-button">Upload</button>
                    <button onClick={onClose} className="cancel-button">Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default AssetUpload;
