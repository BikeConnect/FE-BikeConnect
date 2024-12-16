import React, { useState, useEffect } from "react";
import "./UpdatePage.css";
import AssetUpload from "../AssetUpload/AssetUpload";
import { Navigate, useParams } from "react-router-dom";
import api from "../../api/api";

const UpdatePage = () => {
  const { id } = useParams();
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
    existingImages: [],
    availableDates: [],
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await api.get(`/vehicles/vehicle-detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data || !response.data.metadata) {
          throw new Error("Dữ liệu không đúng định dạng");
        }

        // Assuming the vehicle data is in response.data.metadata
        const vehicleData = response.data.metadata;

        // Format dates to YYYY-MM-DD for input type="date"
        const formatDate = (dateString) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return date.toISOString().split("T")[0];
        };

        setVehicle({
          brand: vehicleData.brand || "",
          model: vehicleData.model || "",
          price: vehicleData.price || 0,
          discount: vehicleData.discount || 0,
          description: vehicleData.description || "",
          address: vehicleData.address || "",
          license: vehicleData.license || "",
          startDate: formatDate(vehicleData.startDate),
          endDate: formatDate(vehicleData.endDate),
          images: [],
          existingImages: vehicleData.images || [],
          availableDates: vehicleData.availableDates || [],
        });
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        if (error.response?.status === 401) {
          Navigate("/");
          alert("Phiên đăng nhập đã hết hạn");
        } else {
          alert("Lỗi khi tải thông tin xe: " + error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchVehicleDetails();
    }
  }, [id, Navigate]);

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

    const validImages = uploadedImages.filter(
      (img) => img instanceof File && img.type.startsWith("image/")
    );

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

    console.log("Form data before validation:", vehicle);
    // Validate form data
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
      if (!accessToken) {
        alert("Vui lòng đăng nhập để cập nhật");
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Cookie", `accessToken=${accessToken}`);

      const formdata = new FormData();

      // Add vehicle data as a JSON string
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
        availableDates: vehicle.availableDates.map(
          (date) => new Date(date).toISOString().split("T")[0]
        ),
      };
      formdata.append("vehicle", JSON.stringify(vehicleData));

      // Add individual fields
      formdata.append("model", vehicle.model);
      formdata.append("price", vehicle.price.toString());
      formdata.append("description", vehicle.description);
      formdata.append("address", vehicle.address);

      // Handle images
      if (vehicle.images && vehicle.images.length > 0) {
        vehicle.images.forEach((image, index) => {
          if (image instanceof File) {
            formdata.append("images", image, `image_${index}.jpg`);
          }
        });
      }

      const requestOptions = {
        method: "PUT", // Changed from PATCH to PUT as per your example
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
        credentials: "include",
      };

      const response = await fetch(
        `http://localhost:8080/api/vehicles/update-vehicle/${id}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Update success:", result);
        alert("Cập nhật thành công!");
        window.location.href = `/vehicle-detail/${id}`;
      } else {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }
    } catch (error) {
      console.error("Update error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert(`Lỗi khi cập nhật: ${error.message}`);
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
              <div className="vehicle-address-license">
                <div className="form-group form-group-license">
                  <label>Biển số:</label>
                  <input
                    className="custom-input"
                    type="text"
                    value={vehicle.license}
                    onChange={(e) =>
                      handleVehicleChange("license", e.target.value)
                    }
                    placeholder="Nhập biển số xe..."
                  />
                </div>
                <div className="form-group form-group-address">
                  <label>Địa chỉ:</label>
                  <input
                    className="custom-input"
                    type="text"
                    value={vehicle.address}
                    onChange={(e) =>
                      handleVehicleChange("address", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleVehicleChange("brand", e.target.value)
                    }
                    placeholder="Nhập thương hiệu xe..."
                  />
                  {errors.brand && (
                    <div className="error-message">{errors.brand}</div>
                  )}
                </div>
                <div className="form-group form-group-model">
                  <label>Model:</label>
                  <input
                    className="custom-input"
                    type="text"
                    value={vehicle.model}
                    onChange={(e) =>
                      handleVehicleChange("model", e.target.value)
                    }
                    placeholder="Nhập model xe..."
                  />
                  {errors.model && (
                    <div className="error-message">{errors.model}</div>
                  )}
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
                    onChange={(e) =>
                      handleVehicleChange("price", e.target.value)
                    }
                    placeholder="Nhập giá xe..."
                  />
                  {errors.price && (
                    <div className="error-message">{errors.price}</div>
                  )}
                </div>
                <div className="form-group form-group-discount">
                  <label>Giảm giá:</label>
                  <input
                    className="custom-input"
                    type="number"
                    value={vehicle.discount}
                    onChange={(e) =>
                      handleVehicleChange("discount", e.target.value)
                    }
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
                  onChange={(e) =>
                    handleVehicleChange("description", e.target.value)
                  }
                  placeholder="Nhập mô tả xe..."
                />
              </div>

              {/* <div className="group-date-image"> */}
              <div className="vehicle-date">
                <div className="form-group form-group-startDate">
                  <label>Ngày bắt đầu:</label>
                  <input
                    type="date"
                    value={vehicle.startDate}
                    className="form-date-group"
                    onChange={(e) =>
                      handleVehicleChange("startDate", e.target.value)
                    }
                  />
                  {errors.startDate && (
                    <div className="error-message">{errors.startDate}</div>
                  )}
                </div>
                <div className="form-group form-group-endDate">
                  <label>Ngày kết thúc:</label>
                  <input
                    type="date"
                    value={vehicle.endDate}
                    className="form-date-group"
                    onChange={(e) =>
                      handleVehicleChange("endDate", e.target.value)
                    }
                  />
                  {errors.endDate && (
                    <div className="error-message">{errors.endDate}</div>
                  )}
                </div>

                <div className="form-group form-group-img">
                  <label>Hình ảnh:</label>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                  >
                    Tải lên hình ảnh mới
                  </button>
                  {errors.images && (
                    <div className="error-message">{errors.images}</div>
                  )}
                  <div className="image-preview">
                    {/* Existing Images */}
                    {vehicle.existingImages.map((image, imageIndex) => (
                      <div
                        key={`existing-${imageIndex}`}
                        className="image-item"
                      >
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
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`New Image ${imageIndex}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(imageIndex, false)}
                        >
                          X
                        </button>
                      </div>
                    ))}

                    {vehicle.existingImages.length === 0 &&
                      vehicle.images.length === 0 && (
                        <div>Chưa có hình ảnh nào</div>
                      )}
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
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
