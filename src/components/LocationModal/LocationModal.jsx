import React, { useState } from 'react';
import { MapPin, X, Search } from 'lucide-react';
import './LocationModal.css';

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
    <div className="location-modal-overlay" onClick={onClose}>
      <div className="location-modal-container" onClick={e => e.stopPropagation()}>
        <div className="location-modal-header">
          <h2 className="location-modal-title">Địa điểm</h2>
          <button className="location-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="location-modal-content">
          <div className="location-search-container">
            <Search className="location-search-icon" size={20} />
            <input
              type="text"
              className="location-search-input"
              placeholder="Tìm kiếm địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {selectedLocation && (
            <div className="location-option selected-location">
              <MapPin size={20} className="location-icon" />
              <span>{selectedLocation}</span>
              <button className="location-remove-button" onClick={clearSelection}>
                <X size={12} />
              </button>
            </div>
          )}

          <div
            className="location-option current-location"
            onClick={() => handleLocationSelect('Vị trí hiện tại')}
          >
            <MapPin size={20} className="location-icon" />
            <span>Vị trí hiện tại</span>
          </div>

          <div className="location-suggestions">
            <h3 className="suggestion-title">Địa điểm gợi ý</h3>
            <div className="suggestions-grid">
              {suggestedLocations.map((location) => (
                <button
                  key={location}
                  className={`suggestion-button ${selectedLocation === location ? 'selected-location' : ''}`}
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
