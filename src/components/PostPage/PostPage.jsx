import React, { useState } from "react";
import "./PostPage.css";
import AssetUpload from "../AssetUpload/AssetUpload";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };

  const handleImageUpload = (uploadedImage) => {
    setImage(uploadedImage);
    setShowUploadModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) newErrors.title = "Tiêu đề không được để trống";
    if (!category.trim()) newErrors.category = "Danh mục không được để trống";
    if (!brand.trim()) newErrors.brand = "Thương hiệu không được để trống";
    if (price <= 0) newErrors.price = "Giá không hợp lệ";
    if (quantity <= 0) newErrors.quantity = "Số lượng không hợp lệ";
    if (discount < 0 || discount > 100)
      newErrors.discount = "Chiết khấu không hợp lệ";
    if (!description.trim())
      newErrors.description = "Mô tả không được để trống";
    if (!model.trim()) newErrors.model = "Model không được để trống";
    if (!image) newErrors.image = "Hãy upload một ảnh";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken::::", accessToken);
        if (!accessToken) {
          alert("Vui lòng đăng nhập để đăng bài");
          return;
        }
        const startDate = new Date().toISOString();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 1); 
        const endDateString = endDate.toISOString();

        const response = await fetch("http://localhost:8080/api/post/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: title,
            category: category,
            brand: brand,
            price: price,
            quantity: quantity,
            discount: discount,
            description: description,
            model: model,
            images: [image.name],
            rating: 1,
            availability_status: "available",
            license: "Public",
            startDate: startDate,
            endDate: endDateString,
          }),
        });

        if (response.ok) {
          console.log("Đăng bài thành công:", {
            title,
            category,
            brand,
            price,
            quantity,
            discount,
            description,
            model,
            image,
          });
          alert("Đăng bài thành công!");
        } else {
          const errorText = await response.text();
          console.log(response);
          console.error("Lỗi khi đăng bài:", response.status, errorText);
          alert(`Lỗi: ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.error("Lỗi khi đăng bài:", error);
        alert("Lỗi 2");
      }
    }
  };

  return (
    <div className="post-page">
      <form className="post-form" onSubmit={handleSubmit}>
        <h1>Đăng Bài</h1>

        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề..."
              />
              {errors.title && (
                <div className="error-message">{errors.title}</div>
              )}
            </div>

            <div className="form-group">
              <label>Danh mục:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Nhập danh mục..."
              />
              {errors.category && (
                <div className="error-message">{errors.category}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Thương hiệu:</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Nhập thương hiệu..."
              />
              {errors.brand && (
                <div className="error-message">{errors.brand}</div>
              )}
            </div>

            <div className="form-group">
              <label>Model:</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Nhập model..."
              />
              {errors.model && (
                <div className="error-message">{errors.model}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Giá:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                placeholder="Nhập giá..."
              />
              {errors.price && (
                <div className="error-message">{errors.price}</div>
              )}
            </div>

            <div className="form-group">
              <label>Số lượng:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                placeholder="Nhập số lượng..."
              />
              {errors.quantity && (
                <div className="error-message">{errors.quantity}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Chiết khấu:</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
                placeholder="Nhập chiết khấu..."
              />
              {errors.discount && (
                <div className="error-message">{errors.discount}</div>
              )}
            </div>

            <div className="form-group">
              <label>Upload Ảnh:</label>
              <button
                type="button"
                className="upload-button"
                onClick={handleUploadClick}
              >
                📸 Upload Ảnh
              </button>
              {image && (
                <div className="image-preview">
                  <img src={URL.createObjectURL(image)} alt="Preview" />
                </div>
              )}
              {errors.image && (
                <div className="error-message">{errors.image}</div>
              )}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Mô tả:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả chi tiết..."
            />
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </div>

          <button type="submit" className="submit-button">
            Đăng Bài
          </button>
        </div>
      </form>

      {showUploadModal && (
        <AssetUpload
          onClose={handleCloseUploadModal}
          onUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default PostPage;
