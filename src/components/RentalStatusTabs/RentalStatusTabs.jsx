import React, { useState, useEffect } from 'react';

import { Clock, Store, MessageCircle, Star, Check, X, RotateCcw } from 'lucide-react';
import './RentalStatusTabs.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const RentalStatusTabs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const location = useLocation();
  const [motorcycles, setMotorcycles] = useState({
    all: [
      {
        id: 1,
        name: 'Honda Winner X',
        status: 'Chờ xác nhận yêu cầu',
        statusType: 'pending-confirm',
        price: '200.000đ/ngày',
        owner: 'Trần Văn B',
        date: '21/11/2024 10:00',
        dateLabel: 'Ngày yêu cầu',
        image: '/api/placeholder/150/150'
      },
      {
        id: 2,
        name: 'Yamaha Exciter',
        status: 'Đang trong quá trình nhận xe',
        statusType: 'receiving',
        price: '180.000đ/ngày',
        owner: 'Trần Văn B',
        date: '21/11/2024 10:00',
        dateLabel: 'Ngày xác nhận yêu cầu',
        image: '/api/placeholder/150/150'
      },
      {
        id: 3,
        name: 'Suzuki Raider',
        status: 'Đang sử dụng xe',
        statusType: 'returning',
        price: '190.000đ/ngày',
        owner: 'Lê Văn C',
        date: '21/11/2024 17:00',
        dateLabel: 'Ngày nhận xe',
        image: '/api/placeholder/150/150'
      },
      {
        id: 4,
        name: 'Honda AirBlade',
        status: 'Đang chờ đánh giá',
        statusType: 'rating',
        price: '150.000đ/ngày',
        owner: 'Phạm Văn D',
        date: '22/11/2024 14:00',
        dateLabel: 'Ngày trả xe',
        image: '/api/placeholder/150/150'
      },
      {
        id: 5,
        name: 'Honda Vision',
        status: 'Đã hủy',
        statusType: 'cancelled',
        price: '160.000đ/ngày',
        owner: 'Nguyễn Văn E',
        date: '22/11/2024 09:00',
        dateLabel: 'Ngày hủy',
        image: '/api/placeholder/150/150'
      }
    ]

    
  });

 
  const tabs = [
    { id: 'all', label: 'Tất cả', count: 9 },
    { id: 'pending-confirm', label: 'Chờ xác nhận', count: 2 },
    { id: 'receiving', label: 'Nhận xe', count: 3 },
    { id: 'returning', label: 'Trả xe', count: 2 },
    { id: 'rating', label: 'Đánh giá', count: 1 },
    { id: 'cancelled', label: 'Đã hủy', count: 1 }
  ];

  const handleCancelBooking = (motorcycleId) => {
    setMotorcycles(prevState => {
      const updatedMotorcycles = prevState.all.map(motorcycle => {
        if (motorcycle.id === motorcycleId) {
          return {
            ...motorcycle,
            status: 'Đã hủy',
            statusType: 'cancelled',
            dateLabel: 'Ngày hủy',
            date: new Date().toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          };
        }
        return motorcycle;
      });
      return { all: updatedMotorcycles };
    });
  };

  const handleRebookMotorcycle = (motorcycleId) => {
    setMotorcycles(prevState => {
      const updatedMotorcycles = prevState.all.map(motorcycle => {
        if (motorcycle.id === motorcycleId) {
          return {
            ...motorcycle,
            status: 'Chờ xác nhận yêu cầu',
            statusType: 'pending-confirm',
            dateLabel: 'Ngày yêu cầu',
            date: new Date().toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          };
        }
        return motorcycle;
      });
      return { all: updatedMotorcycles };
    });
  };


  

  const statusTransitions = {
    'pending-confirm': 'receiving',
    'receiving': 'returning',
    'returning': 'rating',
    'rating': 'all',
    'cancelled': 'all'
  };

  const statusMappings = {
    'pending-confirm': {
      status: 'Đang trong quá trình nhận xe',
      statusType: 'receiving',
      dateLabel: 'Ngày yêu cầu '
    },
    'receiving': {
      status: 'Đang trả xe',
      statusType: 'returning',
      dateLabel: 'Ngày nhận xe'
    },
    'returning': {
      status: 'Đang chờ đánh giá',
      statusType: 'rating',
      dateLabel: 'Ngày trả xe'
    },
    'rating': {
      status: 'Hoàn thành',
      statusType: 'all',
      dateLabel: 'Ngày đánh giá '
    }
  };

  const handleStatusConfirmation = (motorcycleId) => {
    setMotorcycles(prevState => {
      const updatedMotorcycles = prevState.all.map(motorcycle => {
        if (motorcycle.id === motorcycleId) {
          const nextStatus = statusTransitions[motorcycle.statusType];
          const newStatusDetails = statusMappings[motorcycle.statusType] || {};

          return {
            ...motorcycle,
            ...newStatusDetails,
            date: new Date().toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          };
        }
        return motorcycle;
      });
      return { all: updatedMotorcycles };
    });
  };

  const getStatusActions = (statusType, motorcycleId) => {
    const isReviewed = localStorage.getItem(`reviewed_${motorcycleId}`) === 'true';
    
    const actions = {

      'completed': [
        { label: 'Xem cửa hàng', icon: <Store size={20} />, variant: 'outline' },
        { label: 'Liên hệ chủ xe', icon: <MessageCircle size={20} />, variant: 'outline' },
        {
          label: 'Đặt lại xe',
          icon: <RotateCcw size={20} />,
          variant: 'primary',
          onClick: () => handleRebookMotorcycle(motorcycleId),
        },
      ],
      
      'pending-confirm': [
        { label: 'Xem cửa hàng', icon: <Store size={20} />, variant: 'outline' },
        { label: 'Liên hệ chủ xe', icon: <MessageCircle size={20} />, variant: 'outline' },
        { 
          label: 'Hủy đặt xe', 
          icon: <X size={20} />, 
          variant: 'primary', 
          onClick: () => handleCancelBooking(motorcycleId) 
        }
      ],
      'receiving': [
        { label: 'Xem cửa hàng', icon: <Store size={20} />, variant: 'outline' },
        { label: 'Liên hệ chủ xe', icon: <MessageCircle size={20} />, variant: 'outline' },
        { 
          label: 'Xác nhận nhận xe', 
          icon: <Check size={20} />, 
          variant: 'success', 
          onClick: () => handleStatusConfirmation(motorcycleId) 
        }
      ],
      'returning': [
        { label: 'Xem cửa hàng', icon: <Store size={20} />, variant: 'outline' },
        { label: 'Liên hệ chủ xe', icon: <MessageCircle size={20} />, variant: 'outline' },
        { 
          label: 'Xác nhận trả xe', 
          icon: <Check size={20} />, 
          variant: 'primary', 
          onClick: () => handleStatusConfirmation(motorcycleId)
        }
      ],
      'rating': [
        { label: 'Xem cửa hàng', icon: <Store size={20} />, variant: 'outline' },
        { label: 'Liên hệ chủ xe', icon: <MessageCircle size={20} />, variant: 'outline' },
        { 
          label: isReviewed ? 'Hoàn thành đánh giá' : 'Đánh giá ngay', 
          icon: <Star size={20} />, 
          variant: isReviewed ? 'success' : 'primary',
          onClick: () => {
            if (!isReviewed) {
              navigate('/MotorbikeReview', { 
                state: { motorcycleData: motorcycles.all.find(m => m.id === motorcycleId) }
              });
            }
          }
        }
      ],
      'cancelled': [
        { label: 'Xem cửa hàng', icon: <Store size={20} />, variant: 'outline' },
        { label: 'Liên hệ chủ xe', icon: <MessageCircle size={20} />, variant: 'outline' },
        { 
          label: 'Đặt lại xe', 
          icon: <RotateCcw size={20} />, 
          variant: 'primary', 
          onClick: () => handleRebookMotorcycle(motorcycleId)
        }
      ]
    };
    return actions[statusType] || [];
  };

  const filteredMotorcycles = {
    ...motorcycles,
    'pending-confirm': motorcycles.all.filter(m => m.statusType === 'pending-confirm'),
    'receiving': motorcycles.all.filter(m => m.statusType === 'receiving'),
    'returning': motorcycles.all.filter(m => m.statusType === 'returning'),
    'rating': motorcycles.all.filter(m => m.statusType === 'rating'),
    'cancelled': motorcycles.all.filter(m => m.statusType === 'cancelled')
  };

  const updateTabCounts = () => {
    return tabs.map(tab => ({
      ...tab,
      count: filteredMotorcycles[tab.id]?.length || 0
    }));
  };

  const navigate = useNavigate();

  return (
    <div className="rental-status-container">
      <div className="tabs-wrapper">
        <ul className="nav nav-tabs">
          {updateTabCounts().map((tab) => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="badge">{tab.count}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="motorcycle-list">
        {filteredMotorcycles[activeTab]?.map((motorcycle) => (
          <div key={motorcycle.id} className="motorcycle-card">
            <div className="card-content">
              <div className="motorcycle-grid">
                <div className="image-container">
                  <img 
                    src={motorcycle.image} 
                    alt={motorcycle.name} 
                    className="motorcycle-image"
                  />
                </div>
                <div className="info-container">
                  <div className="header-section">
                    <div>
                      <h3 className="motorcycle-name">{motorcycle.name}</h3>
                      <p className="motorcycle-price">{motorcycle.price}</p>
                    </div>
                    <span className={`status-badge ${motorcycle.statusType}`}>
                      {motorcycle.status}
                    </span>
                  </div>
                  
                  <div className="info-section">
                    <p className="info-item">
                      <Store className="icon" size={20} />
                      <span>Chủ xe: {motorcycle.owner}</span>
                    </p>
                    <p className="info-item">
                      <Clock className="icon" size={20} />
                      <span>{motorcycle.dateLabel}: {motorcycle.date}</span>
                    </p>
                  </div>

                  <div className="action-buttons">
                    {getStatusActions(motorcycle.statusType, motorcycle.id).map((action, index) => (
                      <button
                        key={index}
                        className={`action-button ${action.variant}`}
                        onClick={action.onClick}
                      >
                        {action.icon}
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalStatusTabs;