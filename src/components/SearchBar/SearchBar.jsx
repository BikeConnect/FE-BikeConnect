import React, { useState } from "react";
import { MapPin, Clock, ChevronDown } from "lucide-react";
import "./SearchBar.css";
import LocationModal from "../LocationModal/LocationModal";
import TimePickerModal from "../TimePickerModal/TimePickerModal";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

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
      alert("Vui lòng chọn vị trí");
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

      const [timeResponse, locationResponse] = await Promise.all([
        api.get(`/find-booking`, {
          params: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
        }),
        api.get(`/sorted-by-distance`, {
          params: {
            address: selectedLocation,
          },
        }),
      ]);

      const timeData = timeResponse.data;
      const locationData = locationResponse.data;

      // console.log("Search results by time:", timeData);
      // console.log("Search results by location:", locationData);

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
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userData");
        navigate("/");
      } else {
        alert(
          `Có lỗi xảy ra khi tìm kiếm: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  return (
    <>
      <div className="search-bar-container">
        <div className="search-bar-field">
          <div className="field-label">Vị trí</div>
          <button
            className="dropdown-btn"
            onClick={() => setIsLocationModalOpen(true)}
          >
            <div className="button-content">
              {/* <span className="icon-wrapper">
                <MapPin size={20} color="#fff" />
              </span> */}
              <span className="button-text">
                {selectedLocation || "Chọn vị trí"}
              </span>
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
              {/* <span className="icon-wrapper">
                <Clock size={20} />
              </span> */}
              <span className="button-text">{formatSelectedDates()}</span>
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
