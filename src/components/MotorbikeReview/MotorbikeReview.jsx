import React, { useState } from 'react';
import { Star, Upload, X, Store, Clock, Check } from 'lucide-react';
import './MotorbikeReview.css';
import { useNavigate, useLocation } from 'react-router-dom';
import image from '../../assets/images/images_homePage/v994_8600.png';
import api from '../../api/api';

const MotorbikeReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const motorcycleData = location.state?.motorcycleData || {
    id: '1',
    name: 'Honda Winner X',
    price: '200.000đ/ngày',
    owner: 'Trần Văn B',
    date: '21/11/2024 10:00',
    image: '/api/placeholder/150/150'
  };

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(5);
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  // Giữ nguyên các hàm xử lý như cũ
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const imageURLs = imageFiles.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setImages(prev => [...prev, ...imageURLs]);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    const videoURLs = videoFiles.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setVideos(prev => [...prev, ...videoURLs]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const removeVideo = (index) => {
    const newVideos = [...videos];
    URL.revokeObjectURL(newVideos[index].url);
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      console.log("userData1/23", userData)
      const reviewData = {
        vehicleId: motorcycleData.id,
        name: userData.name || "",
        rating: rating,
        review: review
      };

      console.log("Review Data being sent:", reviewData);
      console.log("Token:", localStorage.getItem("accessToken"));
      console.log("Current URL:", window.location.href);

      const response = await api.post('/home/customer/submit-review', reviewData);
      console.log("API Response:", response);
      
      if (response.status === 200 || response.status === 201) {
        console.log("Review submitted successfully:", response.data);
        localStorage.setItem(`reviewed_${motorcycleData.id}`, 'true');
        setShowThankYouModal(true);
        
        setTimeout(() => {
          navigate('/user-dashboard/rentalstatustabs');
        }, 3000);
      }

    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="review-form-container">
 
      <h2 className="review-form-title">Đánh giá xe máy</h2>

      {/* Thông tin xe máy */}
      <div className="motorbike-card">
        <div className="motorbike-card-content">
          <div className="motorbike-card-grid">
            <div className="motorbike-image-wrapper">
              <img
                src={motorcycleData.image || image}
                alt={motorcycleData.name}
                className="motorbike-image"
              />
            </div>
            <div className="motorbike-info">
              <div className="motorbike-details">
                <div className="motorbike-detail-item">
                  <h3 className="motorbike-name">
                    {motorcycleData.name} {motorcycleData.model}
                  </h3>
                </div>
                <div className="motorbike-detail-item">
                  <p className="motorbike-price">{motorcycleData.price}</p>
                </div>
                <div className="motorbike-detail-item">
                  <Store className="icon" size={20} />
                  <span>Chủ xe: {motorcycleData.owner}</span>
                </div>
                <div className="motorbike-detail-item">
                  <Clock className="icon" size={20} />
                  <span>Ngày hoàn thành: {motorcycleData.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Đánh giá sao */}
      <div className="rating-section">
        <h3 className="rating-title">Đánh giá</h3>
        <div className="star-rating-wrapper">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="star-button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={32}
                className={star <= (hover || rating) ? 'star-filled' : 'star-empty'}
              />
            </button>
          ))}
          <span className="rating-text">
            {rating ? `${rating} sao` : 'Chưa đánh giá'}
          </span>
        </div>
      </div>

      {/* Form đánh giá */}
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label className="form-label">Nội dung đánh giá</label>
          <textarea
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Nhập đánh giá của bạn về xe máy..."
            className="review-textarea" 
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-review-button">
          Hoàn thành đánh giá
        </button>
      </form>

      {showThankYouModal && (
        <div className="login-overlay" onClick={() => setShowThankYouModal(false)}>
          <div className="login-container thank-you-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowThankYouModal(false)}>
              ×
            </button>
            <div className="modal-content text-center">
              <div className="check-icon-wrapper">
                <Check size={50} color="#472CB2" />
              </div>
              <h2 className="login-title">Cảm ơn bạn đã đánh giá!</h2>
              <p className="thank-you-text">Đánh giá của bạn sẽ giúp cải thiện dịch vụ của chúng tôi.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MotorbikeReview;
