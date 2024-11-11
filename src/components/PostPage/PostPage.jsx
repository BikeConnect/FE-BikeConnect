import React, { useState } from 'react';
import './PostPage.css';
import AssetUpload from '../AssetUpload/AssetUpload';

const PostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Tiêu đề không được để trống';
        if (!content.trim()) newErrors.content = 'Nội dung không được để trống';
        if (!image) newErrors.image = 'Hãy upload một ảnh';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Đăng bài thành công:", { title, content, image });
            alert('Đăng bài thành công!');
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
                    <label>Nội dung:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Nhập nội dung..."
                    />
                    {errors.content && <div className="error-message">{errors.content}</div>}
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
