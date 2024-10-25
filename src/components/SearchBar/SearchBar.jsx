import React, { useState } from 'react';
import { MapPin, Clock, ChevronDown } from 'lucide-react';
import './SearchBar.css';
import LocationModal from '../LocationModal/LocationModal';
import TimePickerModal from '../TimePickerModal/TimePickerModal';

const SearchBar = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsLocationModalOpen(false);
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const formatSelectedDates = () => {
    if (selectedDates.length === 0) return 'Chọn thời gian';
    if (selectedDates.length === 1) {
      return selectedDates[0].toLocaleDateString('vi-VN');
    }
    return `${selectedDates[0].toLocaleDateString('vi-VN')} - ${selectedDates[selectedDates.length - 1].toLocaleDateString('vi-VN')}`;
  };

  return (
    <>
      <div className="search-container">
        <div className="search-field">
          <div className="field-label">Địa điểm</div>
          <button 
            className="dropdown-button"
            onClick={() => setIsLocationModalOpen(true)}
          >
            <div className="button-content">
              <span className="icon-wrapper">
                <MapPin size={20} />
              </span>
              <span className="button-text">
                {selectedLocation || 'Chọn địa điểm'}
              </span>
              <ChevronDown size={20} color="#6b7280" />
            </div>
          </button>
        </div>

        <div className="search-field">
          <div className="field-label">Thời gian</div>
          <button 
            className="dropdown-button"
            onClick={() => setIsTimeModalOpen(true)}
          >
            <div className="button-content">
              <span className="icon-wrapper">
                <Clock size={20} />
              </span>
              <span className="button-text">
                {formatSelectedDates()}
              </span>
              <ChevronDown size={20} color="#6b7280" />
            </div>
          </button>
        </div>

        <button className="search-button">
          Tìm xe
        </button>
      </div>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
      />

      <TimePickerModal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        onSelectDates={handleDateSelect}
      />
    </>
  );
};

export default SearchBar;