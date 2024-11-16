import React, { useState } from "react";
import "./PostPage.css";
import AssetUpload from "../AssetUpload/AssetUpload";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [license, setLicense] = useState("");

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const generateSlug = (title) => {
    return title.trim().toLowerCase().replace(/\s+/g, '-');
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
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
    if (!startDate) newErrors.startDate = "Ngày bắt đầu không được để trống";
    if (!endDate) newErrors.endDate = "Ngày kết thúc không được để trống";
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      newErrors.endDate = "Ngày kết thúc phải lớn hơn ngày bắt đầu";
    }
    if (!license.trim()) newErrors.license = "License không được để trống";

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
            slug: slug,
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

  const handleDiscountChange = (value) => {
    setDiscount((prev) => {
      let newDiscount = prev + value;
      newDiscount = Math.max(0, Math.min(newDiscount, 100));
      return newDiscount;
    });
  };

  return (
    <div className="post-page">
      <form className="post-form" onSubmit={handleSubmit}>
        <h1>Đăng Bài</h1>

        <div className="form-container">
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề:</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Nhập tiêu đề..."
                className="input-field"
              />
              {errors.title && (
                <div className="error-message">{errors.title}</div>
              )}
            </div>

            <div className="form-group">
              <label>Danh mục:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Chọn danh mục</option>
                <option value="Xe máy">Xe máy</option>
                <option value="Xe đạp">Xe đạp</option>
              </select>
              {errors.category && (
                <div className="error-message">{errors.category}</div>
              )}
            </div>
          </div>

          {/* Row 2 */}
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

          {/* Row 3: Giá và Giảm giá */}
          <div className="form-row">
            <div className="form-group">
              <label>Giá:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                placeholder="Nhập giá..."
                className="input-field"
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
                className="input-field"
              />
              {errors.quantity && (
                <div className="error-message">{errors.quantity}</div>
              )}
            </div>
          </div>

          {/* Row 4: License */}
          <div className="form-row">
            <div className="form-group">
              <label>Giảm giá:</label>
              <div className="discount-controls">
                <button
                  type="button"
                  onClick={() => handleDiscountChange(-10)}
                  className="discount-button"
                >
                  -
                </button>
                <input
                  type="text"
                  value={discount}
                  readOnly
                  className="discount-input"
                />
                <button
                  type="button"
                  onClick={() => handleDiscountChange(10)}
                  className="discount-button"
                >
                  +
                </button>
              </div>
              {errors.discount && (
                <div className="error-message">{errors.discount}</div>
              )}
            </div>

            <div className="form-group">
              <label>License:</label>
              <input
                type="text"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="Nhập license..."
              />
              {errors.license && (
                <div className="error-message">{errors.license}</div>
              )}
            </div>
          </div>

          {/* Row 5: Ngày bắt đầu và Ngày kết thúc */}
          <div className="form-row">
            <div className="form-group">
              <label>Ngày bắt đầu:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {errors.startDate && (
                <div className="error-message">{errors.startDate}</div>
              )}
            </div>

            <div className="form-group">
              <label>Ngày kết thúc:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {errors.endDate && (
                <div className="error-message">{errors.endDate}</div>
              )}
            </div>
          </div>

          {/* Row 6: Mô tả */}
          <div className="form-row">
            <div className="form-group">
              <label>Mô tả:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả..."
              />
              {errors.description && (
                <div className="error-message">{errors.description}</div>
              )}
            </div>
          </div>

          {/* Row 7: AssetUpload */}
          <div className="form-row">
            <div className="form-group">
              <label>Ảnh:</label>
              <button type="button" onClick={handleUploadClick}>
                Chọn ảnh
              </button>
              {image && <p>{image.name}</p>}
              {errors.image && (
                <div className="error-message">{errors.image}</div>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Đăng bài
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



