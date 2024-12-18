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

  console.log("bikeData::::",bikeData);

  useEffect(() => {
    const fetchBikeAndSimilarProducts = async () => {
      try {
        setBikeData(null);
        setSimilarProducts([]);
        setError(null);
        setLoading(true);

        const bikeResponse = await api.get(`/vehicles/vehicle-detail/${vehicleId}`);
        if (bikeResponse.data && bikeResponse.data.metadata) {
          const bikeDetails = bikeResponse.data.metadata;
          const ownerIdValue = bikeDetails.ownerId ? 
          (typeof bikeDetails.ownerId === "string"
            ? bikeDetails.ownerId
            : bikeDetails.ownerId._id)
          : null;

          setBikeData({
            ...bikeDetails,
            ownerName: bikeDetails.ownerId.name,
            ownerPhone: bikeDetails.ownerId.phone,
            ownerId: ownerIdValue,
            slug: bikeDetails.slug || vehicleId,
            currentPrice: bikeDetails.discount
              ? `${(bikeDetails.price - bikeDetails.price * (bikeDetails.discount / 100)).toLocaleString("vi-VN")} VND`
              : bikeDetails.price?.toLocaleString("vi-VN") || "0 VND",
          });
        }

        // Fetch similar products
        const similarResponse = await api.get("/vehicles/list-vehicles");
        if (similarResponse.data && similarResponse.data.metadata) {
          const otherVehicles = similarResponse.data.metadata.filter(
            (vehicle) => vehicle._id !== vehicleId
          );

          const formattedProducts = otherVehicles.map((vehicle) => ({
            _id: vehicle._id,
            slug: vehicle.slug || vehicle._id,
            brand: vehicle.brand,
            currentPrice: vehicle.discount
              ? `${(
                  vehicle.price -
                  vehicle.price * (vehicle.discount / 100)
                ).toLocaleString("vi-VN")} VND`
              : vehicle.price?.toLocaleString("vi-VN") || "0 VND",
            discount:
              `${vehicle.price?.toLocaleString("vi-VN")} VND/ngày` ||
              "0 VND/ngày",
            location: vehicle.address || "Không có địa chỉ",
            status:
              vehicle.availability_status === "available"
                ? "Có sẵn"
                : "Đã thuê",
            image: vehicle.images?.[0]?.url || thuexemay,
            category: vehicle.category,
            availability_status: vehicle.availability_status,
            images: vehicle.images,
            rating: vehicle.rating || 0,
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
  }, [vehicleId, slug]);

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
        {bikeData && <RatingCycle bikeData={bikeData} />}
        <Footer />
      </div>
      {isChatOpen && <Chat />}
    </div>
  );
};

export default BikeDetail;
