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

  const handleSearch = async () => {
    if (!selectedLocation) {
      alert('Vui lòng chọn địa điểm');
      return;
    }
  
    try {
      const accessToken = localStorage.getItem('accessToken');
      const userRole = localStorage.getItem('userRole');

      if (!accessToken) {
        alert('Vui lòng đăng nhập để tìm kiếm');
        navigate('/');
        return;
      }
  
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
  
      const encodedAddress = encodeURIComponent(selectedLocation);
      const response = await fetch(
        `http://localhost:8080/api/sorted-by-distance?address=${encodedAddress}`,
        requestOptions
      );

      if (response.status === 401) {
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
        navigate('/');
        return;
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Search results:', data);

      const vehiclesData = Array.isArray(data) ? data : [];
      console.log('Processed vehicles data:', vehiclesData);
  
      // navigate(`/CusFilterOptions?location=${selectedLocation}&dates=${selectedDates.join(',')}`);
      navigate('/CusFilterOptions', {
        state: {
          location: selectedLocation,
          dates: selectedDates,
          vehicles: data.vehicles  // Lấy mảng vehicles từ response
        }
      });
  
    } catch (error) {
      console.error('Error during search:', error);
      alert('Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.');
    }
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
