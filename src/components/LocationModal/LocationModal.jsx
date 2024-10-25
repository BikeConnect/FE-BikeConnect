import React, { useState } from 'react';
import { MapPin, X, Search } from 'lucide-react';
import './LocationModal.css'

const LocationModal = ({ isOpen, onClose, onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const suggestedLocations = [
    'Hà Nội',
    'TP. HCM',
    'Ninh Thuận',
    'Quảng Nam',
    'Huế',
    'Đà Nẵng'
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    onSelectLocation(location);
  };

  const clearSelection = () => {
    setSelectedLocation('');
    setSearchQuery('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Địa điểm</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="search-input-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {selectedLocation && (
            <div className="location-option selected-location">
              <MapPin size={20} className="icon" />
              <span>{selectedLocation}</span>
              <button className="remove-button" onClick={clearSelection}>
                <X size={12} />
              </button>
            </div>
          )}

          <div
            className="location-option"
            onClick={() => handleLocationSelect('Vị trí hiện tại')}
          >
            <MapPin size={20} className="icon" />
            <span>Vị trí hiện tại</span>
          </div>

          <div className="vehicle-section">
            <h3 className="section-title">Địa điểm gợi ý</h3>
            <div className="vehicle-grid">
              {suggestedLocations.map((location) => (
                <button
                  key={location}
                  className={`vehicle-button ${selectedLocation === location ? 'selected-location' : ''}`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <MapPin size={16} />
                  <span>{location}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;