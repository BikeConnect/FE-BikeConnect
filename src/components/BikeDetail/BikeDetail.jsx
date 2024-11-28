import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VehicleRental from "../VehicleRental/VehicleRental";
import CycleInformation from "../CycleInformation/CycleInformation";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import RatingCycle from "../RatingCycle/RatingCycle";
import Footer from "../Footer/Footer";
import Chat from "../Chat/Chat"; // Import component Chat
import thuexemay from "../../assets/images/images_homePage/v994_8600.png";
import api from "../../api/api";

const BikeDetail = () => {
  const { name: vehicleId, slug } = useParams();
  const [bikeData, setBikeData] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  console.log("bikeData");
  console.log(bikeData);

  useEffect(() => {
    const fetchBikeAndSimilarProducts = async () => {
      try {
        // Fetch bike details với ID
        const bikeResponse = await api.get(`/post/vehicle-detail/${vehicleId}`);
        if (bikeResponse.data && bikeResponse.data.metadata) {
          setBikeData(bikeResponse.data.metadata);
          if (slug !== bikeResponse.data.metadata.slug) {
            console.warn("Slug mismatch");
          }
        }

        // Fetch similar products
        const similarResponse = await api.get("/post/vehicles");
        if (similarResponse.data && similarResponse.data.metadata) {
          const otherVehicles = similarResponse.data.metadata.filter(
            (vehicle) => vehicle._id !== vehicleId
          );

          const formattedProducts = otherVehicles.map((vehicle) => ({
            _id: vehicle._id,
            name: vehicle.name || "Không có tên",
            currentPrice: `${vehicle.price?.toLocaleString("vi-VN")} VND/ngày`,
            originalPrice: vehicle.discount
              ? `${(
                  vehicle.price *
                  (1 + vehicle.discount / 100)
                ).toLocaleString("vi-VN")} VND`
              : "",
            location: vehicle.address || "Không có địa chỉ",
            status:
              vehicle.availability_status === "available"
                ? "Có sẵn"
                : "Đã thuê",
            reviews: vehicle.rating || 0,
            image: vehicle.images?.[0]?.url || thuexemay,
          }));
          setSimilarProducts(formattedProducts);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchBikeAndSimilarProducts();
    }
  }, [vehicleId]);

  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Có lỗi xảy ra: {error}</div>;
  console.log(vehicleId);

  return (
    <div className="page-wrapper">
      <div className="bike-detail-content">
        <VehicleRental
          bike={bikeData}
          vehicleId={vehicleId}
          onOpenChat={handleToggleChat}
        />
        <CycleInformation bikeData={bikeData} />
        <SimilarProducts products={similarProducts} type="motorcycle" />
        <RatingCycle bikeData={bikeData} />
        <Footer />
      </div>
      {isChatOpen && <Chat />}
    </div>
  );
};

export default BikeDetail;
