import React, { useState, useEffect } from "react";
import "./UpdatePage.css";
import AssetUpload from "../AssetUpload/AssetUpload";

const UpdatePage = () => {
  const [vehicle, setVehicle] = useState({
    brand: "",
    model: "",
    price: 0,
    discount: 0,
    description: "",
    address: "",
    license: "",
    startDate: "",
    endDate: "",
    images: [],
    existingImages: [], // To store existing images from the server
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch vehicle details for update
    const fetchVehicleDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const vehicleId = new URLSearchParams(window.location.search).get('id');

        if (!accessToken || !vehicleId) {
          alert("Vui lòng đăng nhập và chọn xe để cập nhật");
          return;
        }

        const response = await fetch(`http://localhost:8080/api/vehicles/${vehicleId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVehicle({
            ...data,
            images: [], // Reset local images
            existingImages: data.images || [], // Store existing images
            startDate: data.startDate ? data.startDate.split('T')[0] : '',
            endDate: data.endDate ? data.endDate.split('T')[0] : '',
          });
        } else {
          const errorText = await response.text();
          alert(`Lỗi: ${response.status} - ${errorText}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết xe:", error);
        alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        setIsLoading(false);
      }
    };

    fetchVehicleDetails();
  }, []);

  const handleVehicleChange = (field, value) => {
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [field]: value,
    }));
  };

  const handleImageUpload = (uploadedImages) => {
    if (!uploadedImages.length) {
      alert("Hãy chọn ít nhất một file ảnh hợp lệ.");
      return;
    }

    const validImages = uploadedImages.filter((img) => img instanceof File && img.type.startsWith('image/'));

    if (validImages.length === 0) {
      alert("Hãy chọn ít nhất một file ảnh hợp lệ.");
      return;
    }

    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      images: [...prevVehicle.images, ...validImages],
    }));

    setShowUploadModal(false);
  };

  const handleRemoveImage = (imageIndex, isExisting) => {
    setVehicle((prevVehicle) => {
      if (isExisting) {
        const updatedExistingImages = [...prevVehicle.existingImages];
        updatedExistingImages.splice(imageIndex, 1);
        return { ...prevVehicle, existingImages: updatedExistingImages };
      } else {
        const updatedImages = [...prevVehicle.images];
        updatedImages.splice(imageIndex, 1);
        return { ...prevVehicle, images: updatedImages };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    // Validation logic (similar to PostPage)
    if (!vehicle.brand) newErrors.brand = "Thương hiệu không được để trống";
    if (!vehicle.model) newErrors.model = "Model không được để trống";
    if (vehicle.price <= 0) newErrors.price = "Giá phải lớn hơn 0";
    
    if (!vehicle.images.length && !vehicle.existingImages.length) {
      newErrors.images = "Hãy upload ít nhất một ảnh cho xe";
    }

    if (!vehicle.startDate) {
      newErrors.startDate = "Ngày bắt đầu là bắt buộc";
    } else if (vehicle.startDate < today) {
      newErrors.startDate = "Ngày bắt đầu không được là ngày trong quá khứ";
    }

    if (!vehicle.endDate) {
      newErrors.endDate = "Ngày kết thúc là bắt buộc";
    } else if (vehicle.startDate && vehicle.endDate) {
      const start = new Date(vehicle.startDate);
      const end = new Date(vehicle.endDate);
      if (start > end) {
        newErrors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const vehicleId = new URLSearchParams(window.location.search).get('id');

      if (!accessToken || !vehicleId) {
        alert("Vui lòng đăng nhập và chọn xe để cập nhật");
        return;
      }

      const formData = new FormData();

      const vehicleData = {
        id: vehicleId,
        brand: vehicle.brand,
        model: vehicle.model,
        price: parseInt(vehicle.price),
        discount: parseInt(vehicle.discount),
        description: vehicle.description,
        address: vehicle.address,
        license: vehicle.license,
        startDate: vehicle.startDate,
        endDate: vehicle.endDate,
        existingImages: vehicle.existingImages.map(img => img.id || img), // For existing image IDs
      };
      formData.append("vehicle", JSON.stringify(vehicleData));

      // Add new images
      if (vehicle.images && vehicle.images.length > 0) {
        vehicle.images.forEach((image) => {
          if (image instanceof File) {
            formData.append('images', image);
          }
        });
      }

      const response = await fetch(`http://localhost:8080/api/vehicles/update-vehicle/${vehicleId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Cập nhật thành công:", result);
        alert("Cập nhật xe thành công!");
      } else {
        const errorText = await response.text();
        console.error("Cập nhật thất bại:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        alert(`Lỗi: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật xe:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  if (isLoading) {
    return <div>Đang tải thông tin xe...</div>;
  }

  return (
    <div className="update-page">
      <form className="update-form" onSubmit={handleSubmit}>
        <h1>Cập Nhật Xe</h1>

        <div className="form-container">
          <div className="vehicle-form">
            <div className="vehicle-form-content">
              {/* Row 1: Biển số, Địa chỉ */}
              <div className="vehicle-address-license">
                <div className="form-group form-group-license">
                  <label>Biển số:</label>
                  <input
                    className="custom-input"
                    type="text"
                    value={vehicle.license}
                    onChange={(e) => handleVehicleChange("license", e.target.value)}
                    placeholder="Nhập biển số xe..."
                  />
                </div>
                <div className="form-group form-group-address">
                  <label>Địa chỉ:</label>
                  <input
                    className="custom-input"
                    type="text"
                    value={vehicle.address}
                    onChange={(e) => handleVehicleChange("address", e.target.value)}
                    placeholder="Nhập địa chỉ..."
                  />
                </div>
              </div>

              {/* Row 2: Thương hiệu, Model */}
              <div className="vehicle-brand-model">
                <div className="form-group form-group-brand">
                  <label>Thương hiệu:</label>
                  <input
                    className="custom-input"
                    type="text"
                    value={vehicle.brand}
                    onChange={(e) => handleVehicleChange("brand", e.target.value)}
                    placeholder="Nhập thương hiệu xe..."
                  />
                  {errors.brand && <div className="error-message">{errors.brand}</div>}
                </div>
                <div className="form-group form-group-model">
                  <label>Model:</label>
                  <input
                    className="custom-input"
                    type="text"
                    value={vehicle.model}
                    onChange={(e) => handleVehicleChange("model", e.target.value)}
                    placeholder="Nhập model xe..."
                  />
                  {errors.model && <div className="error-message">{errors.model}</div>}
                </div>
              </div>

              {/* Row 3: Giá, Giảm Giá */}
              <div className="vehicle-price-discount">
                <div className="form-group form-group-price">
                  <label>Giá:</label>
                  <input
                    className="custom-input"
                    type="number"
                    value={vehicle.price}
                    onChange={(e) => handleVehicleChange("price", e.target.value)}
                    placeholder="Nhập giá xe..."
                  />
                  {errors.price && <div className="error-message">{errors.price}</div>}
                </div>
                <div className="form-group form-group-discount">
                  <label>Giảm giá:</label>
                  <input
                    className="custom-input"
                    type="number"
                    value={vehicle.discount}
                    onChange={(e) => handleVehicleChange("discount", e.target.value)}
                    placeholder="Nhập giảm giá..."
                  />
                </div>
              </div>

              {/* Row 4: Mô tả */}
              <div className="form-group">
                <label>Mô tả:</label>
                <textarea
                  className="custom-input"
                  value={vehicle.description}
                  onChange={(e) => handleVehicleChange("description", e.target.value)}
                  placeholder="Nhập mô tả xe..."
                />
              </div>

              {/* Row 5: Ngày bắt đầu, Ngày kết thúc */}
              <div className="vehicle-date">
                <div className="form-group form-group-startDate">
                  <label>Ngày bắt đầu:</label>
                  <input
                    type="date"
                    value={vehicle.startDate}
                    onChange={(e) => handleVehicleChange("startDate", e.target.value)}
                  />
                  {errors.startDate && <div className="error-message">{errors.startDate}</div>}
                </div>
                <div className="form-group form-group-endDate">
                  <label>Ngày kết thúc:</label>
                  <input
                    type="date"
                    value={vehicle.endDate}
                    onChange={(e) => handleVehicleChange("endDate", e.target.value)}
                  />
                  {errors.endDate && <div className="error-message">{errors.endDate}</div>}
                </div>
              </div>

              {/* Row 6: Hình ảnh */}
              <div className="form-group form-group-img">
                <label>Hình ảnh:</label>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                >
                  Tải lên hình ảnh mới
                </button>
                {errors.images && <div className="error-message">{errors.images}</div>}
                <div className="image-preview">
                  {/* Existing Images */}
                  {vehicle.existingImages.map((image, imageIndex) => (
                    <div key={`existing-${imageIndex}`} className="image-item">
                      <img 
                        src={image.url || image} 
                        alt={`Existing Image ${imageIndex}`} 
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(imageIndex, true)}
                      >
                        X
                      </button>
                    </div>
                  ))}

                  {/* New Uploaded Images */}
                  {vehicle.images.map((image, imageIndex) => (
                    <div key={`new-${imageIndex}`} className="image-item">
                      <img src={URL.createObjectURL(image)} alt={`New Image ${imageIndex}`} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(imageIndex, false)}
                      >
                        X
                      </button>
                    </div>
                  ))}

                  {vehicle.existingImages.length === 0 && vehicle.images.length === 0 && (
                    <div>Chưa có hình ảnh nào</div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="form-group form-group-submit">
              <button type="submit" className="submit-button">
                Cập Nhật Xe
              </button>
            </div>
          </div>
        </div>
      </form>

      {showUploadModal && (
        <AssetUpload
          onClose={() => setShowUploadModal(false)}
          onUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default UpdatePage;