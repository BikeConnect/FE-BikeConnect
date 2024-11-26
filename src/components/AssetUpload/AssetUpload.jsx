import React, { useState } from "react";
import "./AssetUpload.css";

const AssetUpload = ({ onClose, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
    } else {
      alert("Hãy chọn ít nhất một file ảnh.");
    }
  };

  return (
    <div className="asset-upload-modal">
      <div className="asset-upload-content">
        <h3>Upload Ảnh</h3>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <div className="preview-images">
          {selectedFiles.map((file, index) => (
            <div key={index} className="preview-item">
              {/* <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} /> */}
            </div>
          ))}
        </div>
        <div className="upload-actions">
          <button onClick={handleUpload} className="confirm-button">
            Upload
          </button>
          <button onClick={onClose} className="cancel-button">
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetUpload;
