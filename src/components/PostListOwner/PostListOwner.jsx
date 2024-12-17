import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import NavBar from "../NavBar/NavBar";
import "./PostListOwner.css";
import api from "../../api/api";

const PostListOwner = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteVehicleId, setDeleteVehicleId] = useState(null);
  const userRole = localStorage.getItem("userRole") || "owner";

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await api.get("/vehicles/owner-list-vehicles", {
          headers: {
            Authorization: token,
          },
        });

        if (!response.data || !response.data.metadata) {
          throw new Error("Dữ liệu không đúng định dạng");
        }
        setVehicles(response.data.metadata);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError(`Lỗi: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleDeleteClick = (e, vehicle) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteVehicleId(vehicle._id);
  };

  const handleUpdateClick = (e, vehicleId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/update-vehicle/${vehicleId}`);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", `accessToken=${token}`);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        credentials: "include",
        redirect: "follow",
      };

      const response = await fetch(
        `http://localhost:8080/api/vehicles/delete-vehicle/${deleteVehicleId}`,
        requestOptions
      );
      if (response.ok) {
        setVehicles(vehicles.filter((v) => v._id !== deleteVehicleId));
        alert("Xóa xe thành công!");
      } else {
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userData");
          navigate("/");
          throw new Error("Phiên đăng nhập đã hết hạn");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Lỗi khi xóa xe:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userData");
        navigate("/");
        alert("Phiên đăng nhập đã hết hạn");
      } else {
        alert("Có lỗi xảy ra khi xóa xe");
      }
    } finally {
      setDeleteVehicleId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteVehicleId(null);
  };

  const handleItemClick = (vehicle) => {
    if (!vehicle || !vehicle._id) {
      console.error("Invalid vehicle data:", vehicle);
      return;
    }

    const slug = vehicle.slug || vehicle._id;
    navigate(`/BikeDetail/${vehicle._id}/${slug}`);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="post-list-owner-container mb-12 flex flex-col items-center">
      <h1 className="title-list-owner">Danh sách xe</h1>
      <div className="post-list-owner">
        {vehicles && vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="post-list-item"
              onClick={() => handleItemClick(vehicle)}
            >
              <figure className="post-list-figure">
                <img
                  src={vehicle.images?.[0]?.url || "/default-vehicle.jpg"}
                  alt={vehicle.brand}
                  className="post-list-image"
                />
                <div className="post-item-action">
                  <div
                    className="post-item-update"
                    onClick={(e) => handleUpdateClick(e, vehicle._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="post-item-update-icon"
                    >
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                    </svg>
                  </div>
                  <div
                    className="post-item-delete"
                    onClick={(e) => handleDeleteClick(e, vehicle)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="post-item-delete-icon"
                    >
                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                    </svg>
                  </div>
                </div>
              </figure>
              <div className="post-list-item-content">
                <h3 className="post-list-item-title">{vehicle.brand}</h3>
                <div className="list-item-brand-rating">
                  <div>
                    <span className="post-list-item-brand">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        className="icon-motorcycle"
                      >
                        <path d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24l57.7 0 16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7L64 128c-17.7 0-32 14.3-32 32l0 32 96 0c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32l70.4 0c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L418.2 128l61.8 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-20.4 0c-7.5 0-14.7 2.6-20.5 7.4L391.7 78.9l-14-26c-7-12.9-20.5-21-35.2-21L280 32zM462.7 311.2l28.2 52.2c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-28.2-52.2c2.3-.3 4.7-.4 7.1-.4c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-15.5 5.5-29.7 14.7-40.8zM187.3 376c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40l66.4 0C242.5 268.8 190.5 224 128 224C57.3 224 0 281.3 0 352s57.3 128 128 128c62.5 0 114.5-44.8 125.8-104l-66.4 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                      </svg>
                      Brand: {vehicle.brand}
                    </span>
                  </div>
                  <div>
                    <span className="post-list-item-rating">
                    {[...Array(Math.max(0, Math.floor(vehicle.rating || 0)))].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          className="icon-star filled"
                        >
                          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                        </svg>
                      ))}
                      <span className="post-list-rating-number">
                        {`(${vehicle.rating})`}
                      </span>
                    </span>
                  </div>
                </div>
                <span className="post-list-item-price">
                  {vehicle.price?.toLocaleString()} VND / ngày
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>Không có bài đăng nào</div>
        )}
        {deleteVehicleId && (
          <div className="delete-overlay">
            <div className="delete-modal">
              <h2>Xác Nhận Xóa</h2>
              <p>Bạn có chắc chắn muốn xóa bài đăng này?</p>
              <div className="delete-modal-actions">
                <button
                  className="btn btn-confirm"
                  onClick={handleConfirmDelete}
                >
                  Có
                </button>
                <button className="btn btn-cancel" onClick={handleCancelDelete}>
                  Không
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostListOwner;
