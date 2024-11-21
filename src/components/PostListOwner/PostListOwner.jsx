import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./PostListOwner.css";
import api from "../../api/api";

const PostListOwner = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
          "http://localhost:8080/api/post/owner-list-posts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.metadata && Array.isArray(data.metadata)) {
          setPosts(data.metadata);
        } else {
          throw new Error("Dữ liệu không đúng định dạng");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(`Lỗi: ${error.message || "Không thể tải danh sách bài đăng"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Debug 7
  useEffect(() => {
    console.log("Current posts state:", posts);
  }, [posts]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="post-list-owner">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-list-item">
              <figure className="post-list-figure">
                <img
                  src={post.images?.[0]?.url || "default-image-url"}
                  alt={post.name}
                  className="post-list-image"
                />
              </figure>
              <div className="post-list-item-content">
                <h3 className="post-list-item-title">{post.name}</h3>
                <span className="post-list-item-brand">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="icon-motorcycle"
                  >
                    <path d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24l57.7 0 16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7L64 128c-17.7 0-32 14.3-32 32l0 32 96 0c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32l70.4 0c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L418.2 128l61.8 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-20.4 0c-7.5 0-14.7 2.6-20.5 7.4L391.7 78.9l-14-26c-7-12.9-20.5-21-35.2-21L280 32zM462.7 311.2l28.2 52.2c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-28.2-52.2c2.3-.3 4.7-.4 7.1-.4c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-15.5 5.5-29.7 14.7-40.8zM187.3 376c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40l66.4 0C242.5 268.8 190.5 224 128 224C57.3 224 0 281.3 0 352s57.3 128 128 128c62.5 0 114.5-44.8 125.8-104l-66.4 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                  </svg>
                  Brand: {post.brand}
                </span>
                <span className="post-list-item-rating">
                {[...Array(post.rating)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="icon-star filled"
                    >
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                  ))}
                </span>
                <span className="post-list-item-price">
                  {post.price?.toLocaleString()} VND / ngày
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>Không có bài đăng nào</div>
        )}
      </div>
    </div>
  );
};

export default PostListOwner;
