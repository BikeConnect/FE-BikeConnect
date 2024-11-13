import React, { useState } from 'react';
import './PostPage.css';
import AssetUpload from '../AssetUpload/AssetUpload';

const PostPage = () => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState('');
    const [model, setModel] = useState('');
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
        if (!title.trim()) newErrors.title = 'Tiêu đề không được để trống';
        if (!slug.trim()) newErrors.slug = 'Slug không được để trống';
        if (!category.trim()) newErrors.category = 'Danh mục không được để trống';
        if (!brand.trim()) newErrors.brand = 'Thương hiệu không được để trống';
        if (price <= 0) newErrors.price = 'Giá không hợp lệ';
        if (quantity <= 0) newErrors.quantity = 'Số lượng không hợp lệ';
        if (discount < 0 || discount > 100) newErrors.discount = 'Chiết khấu không hợp lệ';
        if (!description.trim()) newErrors.description = 'Mô tả không được để trống';
        if (!model.trim()) newErrors.model = 'Model không được để trống';
        if (!image) newErrors.image = 'Hãy upload một ảnh';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                // Lấy ngày hiện tại làm startDate
                const startDate = new Date().toISOString();
                // Tạo endDate bằng cách cộng 1 ngày vào startDate
                const endDate = new Date();
                endDate.setDate(endDate.getDate() + 1); // Cộng thêm 1 ngày
                const endDateString = endDate.toISOString();

                const response = await fetch('http://localhost:8080/api/post/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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
                        availability_status: 'available',
                        license: 'Public',
                        startDate: startDate,
                        endDate: endDateString,
                    }),
                });

                if (response.ok) {
                    console.log('Đăng bài thành công:', {
                        title,
                        slug,
                        category,
                        brand,
                        price,
                        quantity,
                        discount,
                        description,
                        model,
                        image,
                    });
                    alert('Đăng bài thành công!');
                } else {
                    const errorText = await response.text();
                    console.error('Lỗi khi đăng bài:', response.status, errorText);
                    alert(`Lỗi: ${response.status} - ${errorText}`);
                }
            } catch (error) {
                console.error('Lỗi khi đăng bài:', error);
                alert('Lỗi 2');
            }
        }
    };


    return (
        <div className="post-page">
            <h1>Đăng Bài</h1>
            <form className="post-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tiêu đề:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nhập tiêu đề..."
                    />
                    {errors.title && <div className="error-message">{errors.title}</div>}
                </div>

                <div className="form-group">
                    <label>Slug:</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="Nhập slug..."
                    />
                    {errors.slug && <div className="error-message">{errors.slug}</div>}
                </div>

                <div className="form-group">
                    <label>Danh mục:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Nhập danh mục..."
                    />
                    {errors.category && <div className="error-message">{errors.category}</div>}
                </div>

                <div className="form-group">
                    <label>Thương hiệu:</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Nhập thương hiệu..."
                    />
                    {errors.brand && <div className="error-message">{errors.brand}</div>}
                </div>

                <div className="form-group">
                    <label>Giá:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        placeholder="Nhập giá..."
                    />
                    {errors.price && <div className="error-message">{errors.price}</div>}
                </div>

                <div className="form-group">
                    <label>Số lượng:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        placeholder="Nhập số lượng..."
                    />
                    {errors.quantity && <div className="error-message">{errors.quantity}</div>}
                </div>

                <div className="form-group">
                    <label>Chiết khấu:</label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value))}
                        placeholder="Nhập chiết khấu..."
                    />
                    {errors.discount && <div className="error-message">{errors.discount}</div>}
                </div>

                <div className="form-group">
                    <label>Mô tả:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả..."
                    />
                    {errors.description && <div className="error-message">{errors.description}</div>}
                </div>

                <div className="form-group">
                    <label>Model:</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="Nhập model..."
                    />
                    {errors.model && <div className="error-message">{errors.model}</div>}
                </div>

                <div className="form-group">
                    <button type="button" className="upload-button" onClick={handleUploadClick}>
                        Upload Ảnh
                    </button>
                    {image && (
                        <div className="image-preview">
                            <img src={URL.createObjectURL(image)} alt="Uploaded preview" />
                        </div>
                    )}
                    {errors.image && <div className="error-message">{errors.image}</div>}
                </div>

                <button type="submit" className="submit-button">
                    Đăng Bài
                </button>
            </form>

            {showUploadModal && (
                <AssetUpload onClose={handleCloseUploadModal} onUpload={handleImageUpload} />
            )}
        </div>
    );
};

export default PostPage;