import React, { useState } from 'react';
import { MapPin, Clock, ChevronDown } from 'lucide-react';
import './SearchBar.css';
import LocationModal from '../LocationModal/LocationModal';
import TimePickerModal from '../TimePickerModal/TimePickerModal';
import { useNavigate } from 'react-router-dom';

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
      return new Date(selectedDates[0]).toLocaleDateString('vi-VN'); // Chuyển đổi chuỗi thành Date
    }
    return `${new Date(selectedDates[0]).toLocaleDateString('vi-VN')} - ${new Date(selectedDates[selectedDates.length - 1]).toLocaleDateString('vi-VN')}`;
  };
  
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/CusFilterOptions?location=${selectedLocation}&dates=${selectedDates.join(',')}`);
  };
  return (
    <>
      <div className="search-bar-container">
        <div className="search-bar-field">
          <div className="field-label">Địa điểm</div>
          <button
            className="dropdown-btn"
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

        <div className="search-bar-field">
          <div className="field-label">Thời gian</div>
          <button
            className="dropdown-btn"
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
        <button className="search-action-button" onClick={handleSearch}>
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
