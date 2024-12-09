import React, { useState, useEffect } from "react";
import "./PostPage.css";
import AssetUpload from "../AssetUpload/AssetUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PostPage = () => {
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
    availableDates: [],
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    if (vehicle.startDate && vehicle.endDate) {
      setSelectedDates([]);
      setVehicle(prev => ({...prev, availableDates: []}));
    }
  }, [vehicle.startDate, vehicle.endDate]);

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

    // Chỉ giữ lại các tệp hình ảnh hợp lệ
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

  const handleRemoveImage = (imageIndex) => {
    setVehicle((prevVehicle) => {
      const updatedImages = [...prevVehicle.images];
      updatedImages.splice(imageIndex, 1);
      return { ...prevVehicle, images: updatedImages };
    });
  };

  const handleDateSelect = (date) => {
    const newDate = new Date(date.setHours(0, 0, 0, 0));
    
    if (selectedDates.some(d => d.getTime() === newDate.getTime())) {
      const newSelectedDates = selectedDates.filter(
        d => d.getTime() !== newDate.getTime()
      );
      setSelectedDates(newSelectedDates);
      setVehicle(prev => ({
        ...prev,
        availableDates: newSelectedDates
      }));
    } else {
      const newSelectedDates = [...selectedDates, newDate];
      setSelectedDates(newSelectedDates);
      setVehicle(prev => ({
        ...prev,
        availableDates: newSelectedDates
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!vehicle.brand) {
      newErrors.brand = "Thương hiệu không được để trống";
    }

    if (!vehicle.model) {
      newErrors.model = "Model không được để trống";
    }

    if (vehicle.price <= 0) {
      newErrors.price = "Giá phải lớn hơn 0";
    }

    if (!vehicle.images || vehicle.images.length === 0) {
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

    if (!vehicle.availableDates || vehicle.availableDates.length === 0) {
      newErrors.availableDates = "Vui lòng chọn ít nhất một ngày cho thuê";
    }

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

      const vehicleData = {
        brand: vehicle.brand,
        model: vehicle.model,
        price: parseInt(vehicle.price),
        discount: parseInt(vehicle.discount),
        description: vehicle.description,
        address: vehicle.address,
        license: vehicle.license,
        startDate: vehicle.startDate,
        endDate: vehicle.endDate,
        availableDates: vehicle.availableDates.map(date => 
          new Date(date).toISOString()
        ),
      };
      formData.append("vehicle", JSON.stringify(vehicleData));

      if (vehicle.images && vehicle.images.length > 0) {
        vehicle.images.forEach((image) => {
          if (image instanceof File) {
            formData.append('images', image);
          }
        });
      }

      const response = await fetch("http://localhost:8080/api/vehicles/create-vehicle", {
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
          <div className="vehicle-form">
            <div className="vehicle-form-content">
              {/* Row 1: Biển số, Địa chỉ */}
              <div className="vehicle-address-license">
                <div className="form-group form-group-license">
                  <label>Biển số:</label>
                  <input
                    type="text"
                    value={vehicle.license}
                    onChange={(e) => handleVehicleChange("license", e.target.value)}
                    placeholder="Nhập biển số xe..."
                  />
                </div>
                <div className="form-group form-group-address">
                  <label>Địa chỉ:</label>
                  <input
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
                    type="text"
                    value={vehicle.brand}
                    onChange={(e) => handleVehicleChange("brand", e.target.value)}
                    placeholder="Nhập thương hiệu xe..."
                  />
                </div>
                <div className="form-group form-group-model">
                  <label>Model:</label>
                  <input
                    type="text"
                    value={vehicle.model}
                    onChange={(e) => handleVehicleChange("model", e.target.value)}
                    placeholder="Nhập model xe..."
                  />
                </div>
              </div>

              {/* Row 3: Giá, Giảm Giá */}
              <div className="vehicle-price-discount">
                <div className="form-group form-group-price">
                  <label>Giá:</label>
                  <input
                    type="number"
                    value={vehicle.price}
                    onChange={(e) => handleVehicleChange("price", e.target.value)}
                    placeholder="Nhập giá xe..."
                  />
                </div>
                <div className="form-group form-group-discount">
                  <label>Giảm giá:</label>
                  <input
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

              {vehicle.startDate && vehicle.endDate && (
                <div className="form-group">
                  <label>Chọn ngày cho thuê:</label>
                  <div className="date-picker-container">
                    <DatePicker
                      inline
                      minDate={new Date(vehicle.startDate)}
                      maxDate={new Date(vehicle.endDate)}
                      selected={null}
                      onChange={handleDateSelect}
                      highlightDates={selectedDates}
                      dateFormat="dd/MM/yyyy"
                      calendarClassName="custom-calendar"
                      dayClassName={date =>
                        selectedDates.some(d => d.getTime() === date.getTime())
                          ? "selected-day"
                          : undefined
                      }
                    />
                  </div>
                  {errors.availableDates && (
                    <div className="error-message">{errors.availableDates}</div>
                  )}
                  <div className="selected-dates-info">
                    Đã chọn: {selectedDates.length} ngày
                  </div>
                </div>
              )}

              {/* Row 6: AssetUpload */}
              <div className="form-group form-group-img">
                <label>Hình ảnh:</label>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                >
                  Tải lên hình ảnh
                </button>
                <div className="image-preview">
                  {vehicle.images.length > 0 ? (
                    vehicle.images.map((image, imageIndex) => (
                      <div key={imageIndex} className="image-item">
                        <img src={URL.createObjectURL(image)} alt={`Image ${imageIndex}`} />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(imageIndex)}
                        >
                          X
                        </button>
                      </div>
                    ))
                  ) : (
                    <div>Chưa có hình ảnh nào</div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="form-group form-group-submit">
              <button type="submit" className="submit-button">
                Đăng bài
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

export default PostPage;
