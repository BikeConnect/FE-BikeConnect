import React, { useState } from "react";
import "./PostPage.css";
import AssetUpload from "../AssetUpload/AssetUpload";

const PostPage = () => {
  const [quantity, setQuantity] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);
    setQuantity(qty);
    if (qty > 0) {
      const newVehicles = Array.from({ length: qty }, (_, index) => ({
        name: "",
        category: "",
        brand: "",
        price: 0,
        discount: 0,
        description: "",
        model: "",
        address: "",
        license: "",
        startDate: "",
        endDate: "",
        images: [],
      }));
      setVehicles(newVehicles);
    } else {
      setVehicles([]);
    }
  };

  const handleVehicleChange = (index, field, value) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles[index][field] = value;
    setVehicles(updatedVehicles);
  };

  const handleImageUpload = (uploadedImages) => {
    const updatedVehicles = [...vehicles];
    if (!updatedVehicles[currentVehicleIndex].images) {
      updatedVehicles[currentVehicleIndex].images = [];
    }

    // Kiểm tra và chỉ thêm các File objects hợp lệ
    const validImages = uploadedImages.filter((img) => img instanceof File);
    if (validImages.length !== uploadedImages.length) {
      console.warn("Some uploaded items are not valid image files");
    }

    updatedVehicles[currentVehicleIndex].images.push(...validImages);
    setVehicles(updatedVehicles);
    setShowUploadModal(false);

    console.log(
      "Updated vehicle images:",
      updatedVehicles[currentVehicleIndex].images
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (quantity <= 0) newErrors.quantity = "Số lượng không hợp lệ";

    vehicles.forEach((vehicle, index) => {
      if (!vehicle.images || vehicle.images.length === 0) {
        newErrors[`images_${index}`] = "Hãy upload ít nhất một ảnh cho xe";
      }
      if (!vehicle.startDate) {
        newErrors[`startDate_${index}`] = "Ngày bắt đầu là bắt buộc";
      }
      if (!vehicle.endDate) {
        newErrors[`endDate_${index}`] = "Ngày kết thúc là bắt buộc";
      } else if (vehicle.startDate && vehicle.endDate) {
        const start = new Date(vehicle.startDate);
        const end = new Date(vehicle.endDate);
        if (start > end) {
          newErrors[`endDate_${index}`] = "Ngày kết thúc phải sau ngày bắt đầu";
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("Vui lòng đăng nhập để đăng bài");
        return;
      }

      const formData = new FormData();
      formData.append("quantity", quantity.toString());

      const vehiclesData = vehicles.map((vehicle) => ({
        name: vehicle.name,
        category: vehicle.category,
        brand: vehicle.brand,
        price: parseInt(vehicle.price),
        discount: parseInt(vehicle.discount),
        description: vehicle.description,
        model: vehicle.model,
        address: vehicle.address,
        license: vehicle.license,
        startDate: vehicle.startDate,
        endDate: vehicle.endDate,
      }));

      formData.append("vehicles", JSON.stringify(vehiclesData));

      vehicles.forEach((vehicle, index) => {
        if (vehicle.images && vehicle.images.length > 0) {
          vehicle.images.forEach((image, imageIndex) => {
            if (image instanceof File) {
              const fileName = `vehicle${index}_images`;
              formData.append(fileName, image);
            }
          });
        }
      });

      // Thêm logging để debug
      console.log("FormData contents before sending:");
      const formDataObject = {};
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          if (!formDataObject[key]) {
            formDataObject[key] = [];
          }
          formDataObject[key].push({
            name: value.name,
            type: value.type,
            size: value.size,
          });
        } else {
          formDataObject[key] = value;
        }
      }
      console.log("FormData as object:", formDataObject);

      console.log("FormData being sent:", {
        quantity: quantity,
        vehicles: vehiclesData,
        vehicleImages: vehicles.map((v) => v.images?.length || 0),
      });

      const response = await fetch("http://localhost:8080/api/post/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload success:", result);
        alert("Đăng bài thành công!");
      } else {
        const errorText = await response.text();
        console.error("Upload failed:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        alert(`Lỗi: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="post-page">
      <form className="post-form" onSubmit={handleSubmit}>
        <h1>Đăng Bài</h1>

        <div className="form-container">
          <div className="form-row">
            <div className="form-group form-group-quantity">
              <label>Số lượng xe:</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                placeholder="Nhập số lượng xe..."
                min="1"
              />
              {errors.quantity && (
                <div className="error-message">{errors.quantity}</div>
              )}
            </div>
          </div>

          {vehicles.map((vehicle, index) => (
            <div key={index} className="vehicle-form">
              <h2>Xe {index + 1}</h2>
              <div className="vehicle-form-content">
                <div className="vehicle-name-category">
                  <div className="form-group form-group-name">
                    <label>Tên xe:</label>
                    <input
                      type="text"
                      value={vehicle.name}
                      onChange={(e) =>
                        handleVehicleChange(index, "name", e.target.value)
                      }
                      placeholder="Nhập tên xe..."
                    />
                  </div>
                  <div className="form-group form-group-category">
                    <label>Danh mục:</label>
                    <input
                      type="text"
                      value={vehicle.category}
                      onChange={(e) =>
                        handleVehicleChange(index, "category", e.target.value)
                      }
                      placeholder="Nhập danh mục xe..."
                    />
                  </div>
                  <div className="form-group form-group-brand">
                    <label>Thương hiệu:</label>
                    <input
                      type="text"
                      value={vehicle.brand}
                      onChange={(e) =>
                        handleVehicleChange(index, "brand", e.target.value)
                      }
                      placeholder="Nhập thương hiệu xe..."
                    />
                  </div>
                </div>
                <div className="vehicle-price-discount-model">
                  <div className="form-group form-group-price">
                    <label>Giá:</label>
                    <input
                      type="number"
                      value={vehicle.price}
                      onChange={(e) =>
                        handleVehicleChange(index, "price", e.target.value)
                      }
                      placeholder="Nhập giá xe..."
                    />
                  </div>
                  <div className="form-group form-group-discount">
                    <label>Giảm giá:</label>
                    <input
                      type="number"
                      value={vehicle.discount}
                      onChange={(e) =>
                        handleVehicleChange(index, "discount", e.target.value)
                      }
                      placeholder="Nhập giảm giá..."
                    />
                  </div>
                  <div className="form-group form-group-model">
                    <label>Model:</label>
                    <input
                      type="text"
                      value={vehicle.model}
                      onChange={(e) =>
                        handleVehicleChange(index, "model", e.target.value)
                      }
                      placeholder="Nhập model xe..."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Mô tả:</label>
                  <textarea
                    value={vehicle.description}
                    onChange={(e) =>
                      handleVehicleChange(index, "description", e.target.value)
                    }
                    placeholder="Nhập mô tả xe..."
                  />
                </div>
                <div className="vehicle-address-license">
                  <div className="form-group form-group-address">
                    <label>Địa chỉ:</label>
                    <input
                      type="text"
                      value={vehicle.address}
                      onChange={(e) =>
                        handleVehicleChange(index, "address", e.target.value)
                      }
                      placeholder="Nhập địa chỉ..."
                    />
                  </div>
                  <div className="form-group form-group-license">
                    <label>Biển số:</label>
                    <input
                      type="text"
                      value={vehicle.license}
                      onChange={(e) =>
                        handleVehicleChange(index, "license", e.target.value)
                      }
                      placeholder="Nhập biển số xe..."
                    />
                  </div>
                </div>
                <div className="vehicle-date-images">
                  <div className="form-group form-group-startDate">
                    <label>Ngày bắt đầu:</label>
                    <input
                      type="date"
                      value={vehicle.startDate}
                      onChange={(e) =>
                        handleVehicleChange(index, "startDate", e.target.value)
                      }
                    />
                    {errors[`startDate_${index}`] && (
                      <div className="error-message">
                        {errors[`startDate_${index}`]}
                      </div>
                    )}
                  </div>
                  <div className="form-group form-group-endDate">
                    <label>Ngày kết thúc:</label>
                    <input
                      type="date"
                      value={vehicle.endDate}
                      onChange={(e) =>
                        handleVehicleChange(index, "endDate", e.target.value)
                      }
                    />
                    {errors[`endDate_${index}`] && (
                      <div className="error-message">
                        {errors[`endDate_${index}`]}
                      </div>
                    )}
                  </div>
                  <div className="form-group form-group-img">
                    <label>Hình ảnh:</label>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentVehicleIndex(index);
                        setShowUploadModal(true);
                      }}
                    >
                      Tải lên hình ảnh
                    </button>
                    {vehicle.images && vehicle.images.length > 0 && (
                      <div className="uploaded-images">
                        <p>Số ảnh đã tải lên: {vehicle.images.length}</p>
                      </div>
                    )}
                    {showUploadModal && currentVehicleIndex === index && (
                      <AssetUpload
                        onUpload={handleImageUpload}
                        onClose={() => setShowUploadModal(false)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {errors.image && <div className="error-message">{errors.image}</div>}

          <div className="form-group">
            <button type="submit" className="submit-button">
              Đăng bài
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostPage;