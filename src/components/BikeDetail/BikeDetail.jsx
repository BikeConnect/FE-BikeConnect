import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import VehicleRental from '../VehicleRental/VehicleRental';
import CycleInformation from '../CycleInformation/CycleInformation';
import SimilarProducts from '../SimilarProducts/SimilarProducts';
import RatingCycle from '../RatingCycle/RatingCycle';
import Footer from '../Footer/Footer';
import Chat from '../Chat/Chat'; // Import component Chat
import thuexemay from '../../assets/images/images_homePage/v994_8600.png';

const motorcycles = [
    {
        name: 'Yamaha Exciter',
        currentPrice: '140,000 VND/ngày',
        originalPrice: '180,000 VND',
        location: '45 Lê Độ, Thanh Khê, Đà Nẵng',
        status: 'Xe mới',
        distance: '3 km',
        reviews: 65,
        image: thuexemay,
    },
    // Thêm dữ liệu khác nếu cần
];

const BikeDetail = () => {
    const { name } = useParams();
    const bike = motorcycles.find((motorcycle) => motorcycle.name === name);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Toggle mở/đóng Chat mỗi khi nhấn
    const handleToggleChat = () => {
        setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
    };

    return (
        <div className="page-wrapper">
            <div className="bike-detail-content">
                <VehicleRental bike={bike} onOpenChat={handleToggleChat} />
                <CycleInformation />
                <SimilarProducts products={motorcycles} type="motorcycle" />
                <RatingCycle />
                <Footer />
            </div>
            {isChatOpen && <Chat />} {/* Chat mở khi isChatOpen là true */}
        </div>
    );
};

export default BikeDetail;
