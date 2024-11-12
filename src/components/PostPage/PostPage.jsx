import React, { useState } from 'react';
import './PostPage.css';

const PostPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category: '',
        brand: '',
        price: '',
        quantity: '',
        discount: '',
        description: '',
        model: '',
        images: null,
        rating: '4',
        availability_status: 'available',
        license: '',
        startDate: '',
        endDate: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Tên sản phẩm không được để trống';
        if (!formData.description) newErrors.description = 'Mô tả không được để trống';
        if (!formData.price) newErrors.price = 'Giá không được để trống';
        if (!formData.images) newErrors.images = 'Hãy upload một ảnh';
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-generate slug from name
        if (name === 'name') {
            const slug = value
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
            setFormData(prev => ({
                ...prev,
                slug: slug
            }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            images: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            setSuccessMessage('');  // Clear previous success message
            setErrors({});  // Clear previous errors

            try {
                const formDataToSend = new FormData();

                // Log dữ liệu để kiểm tra
                console.log('Form Data: ', formData);

                Object.keys(formData).forEach(key => {
                    if (key === 'images') {
                        if (formData[key]) {
                            formDataToSend.append('images', formData[key]);
                        }
                    } else {
                        formDataToSend.append(key, formData[key]);
                    }
                });

                // Log FormData để kiểm tra
                for (let pair of formDataToSend.entries()) {
                    console.log(pair[0] + ': ' + pair[1]);
                }

                const response = await fetch('http://localhost:8080/api/post/', {
                    method: 'POST',
                    body: formDataToSend
                });

                // Log Response để kiểm tra
                console.log('Response: ', response);

                if (response.ok) {
                    setSuccessMessage('Sản phẩm đã được đăng thành công!');
                    setFormData({
                        name: '',
                        slug: '',
                        category: '',
                        brand: '',
                        price: '',
                        quantity: '',
                        discount: '',
                        description: '',
                        model: '',
                        images: null,
                        rating: '4',
                        availability_status: 'available',
                        license: '',
                        startDate: '',
                        endDate: ''
                    });
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Đăng sản phẩm thất bại');
                }
            } catch (error) {
                setErrors({ submit: error.message });
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <div className="post-page">
            <div className="post-card">
                <h1 className="post-title">Đăng Sản Phẩm Mới</h1>

                {successMessage && (
                    <div className="success-message">
                        <p>{successMessage}</p>
                    </div>
                )}

                {errors.submit && <span className="error-text">{errors.submit}</span>}

                <form onSubmit={handleSubmit} className="post-form">
                    <div className="form-grid">
                        <div className="form-section">
                            <div className="form-group">
                                <label>Tên sản phẩm</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                                {errors.name && <span className="error-text">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label>Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label>Danh mục</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="">Chọn danh mục</option>
                                    <option value="Bicycle">Xe đạp</option>
                                    <option value="Accessories">Xe máy</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Thương hiệu</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-group">
                                <label>Giá (VNĐ)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                                {errors.price && <span className="error-text">{errors.price}</span>}
                            </div>

                            <div className="form-group">
                                <label>Số lượng</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Giảm giá (%)</label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Mô tả sản phẩm</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-textarea"
                        />
                        {errors.description && <span className="error-text">{errors.description}</span>}
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Model</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Giấy phép</label>
                            <input
                                type="text"
                                name="license"
                                value={formData.license}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Hình ảnh sản phẩm</label>
                        <div className="upload-area">
                            <input
                                type="file"
                                name="images"
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="file-input"
                            />
                            <div className="upload-placeholder">
                                <i className="upload-icon">📁</i>
                                <p>Click để chọn ảnh hoặc kéo thả file vào đây</p>
                                <span className="upload-hint">PNG, JPG, GIF (Max: 10MB)</span>
                            </div>
                        </div>
                        {formData.images && (
                            <div className="image-preview">
                                <img
                                    src={URL.createObjectURL(formData.images)}
                                    alt="Preview"
                                />
                            </div>
                        )}
                        {errors.images && <span className="error-text">{errors.images}</span>}
                    </div>

                    <button
                        type="submit"
                        className={`submit-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng sản phẩm'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostPage;