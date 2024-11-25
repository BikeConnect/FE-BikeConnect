import React, { useState } from "react";
import { MapPin, Clock, ChevronDown } from "lucide-react";
import "./SearchBar.css";
import LocationModal from "../LocationModal/LocationModal";
import TimePickerModal from "../TimePickerModal/TimePickerModal";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsLocationModalOpen(false);
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const formatSelectedDates = () => {
    if (selectedDates.length === 0) return "Chọn thời gian";
    if (selectedDates.length === 1) {
      return new Date(selectedDates[0]).toLocaleDateString("vi-VN");
    }
    return `${new Date(selectedDates[0]).toLocaleDateString(
      "vi-VN"
    )} - ${new Date(selectedDates[selectedDates.length - 1]).toLocaleDateString(
      "vi-VN"
    )}`;
  };

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!selectedLocation) {
      alert("Vui lòng chọn địa điểm");
      return;
    }

    if (selectedDates.length === 0) {
      alert("Vui lòng chọn thời gian");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("Vui lòng đăng nhập để tìm kiếm");
        navigate("/");
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const startDate = new Date(selectedDates[0]);
      const endDate = new Date(selectedDates[selectedDates.length - 1]);

      const formattedStartDate = `${startDate.getDate()}-${(
        startDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${startDate.getFullYear()}`;
      const formattedEndDate = `${endDate.getDate()}-${(endDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${endDate.getFullYear()}`;

      if (startDate > endDate) {
        alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
        return;
      }

      const timeRequestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const timeResponse = await fetch(
        `http://localhost:8080/api/find-booking?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        timeRequestOptions
      );

      if (!timeResponse.ok) {
        const errorText = await timeResponse.text();
        throw new Error(
          `HTTP error! status: ${timeResponse.status}, message: ${errorText}`
        );
      }

      const timeData = await timeResponse.json();
      console.log("Search results by time:", timeData);

      const encodedAddress = encodeURIComponent(selectedLocation);
      const locationRequestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const locationResponse = await fetch(
        `http://localhost:8080/api/sorted-by-distance?address=${encodedAddress}`,
        locationRequestOptions
      );

      if (!locationResponse.ok) {
        const errorText = await locationResponse.text();
        throw new Error(
          `HTTP error! status: ${locationResponse.status}, message: ${errorText}`
        );
      }

      const locationData = await locationResponse.json();
      console.log("Search results by location:", locationData);

      const availableVehicles = timeData.availableVehicles;
      const vehiclesByLocation = locationData.vehicles.map((v) => ({
        ...v.vehicle,
        distance: v.distance,
      }));

      const combinedResults = availableVehicles
        .filter((vehicle) =>
          vehiclesByLocation.some(
            (locVehicle) => locVehicle._id === vehicle._id
          )
        )
        .map((vehicle) => {
          const locVehicle = vehiclesByLocation.find(
            (loc) => loc._id === vehicle._id
          );
          return {
            ...vehicle,
            distance: locVehicle
              ? locVehicle.distance
              : { text: "0 km", value: 0 },
          };
        })
        .sort((a, b) => a.distance.value - b.distance.value);

      console.log("Combined results:", combinedResults);

      navigate("/CusFilterOptions", {
        state: {
          location: selectedLocation,
          dates: selectedDates,
          combinedResults: combinedResults,
        },
      });
    } catch (error) {
      console.error("Error during search:", error);
      alert(`Có lỗi xảy ra khi tìm kiếm: ${error.message}`);
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
                {selectedLocation || "Chọn địa điểm"}
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
              <span className="button-text">{formatSelectedDates()}</span>
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
