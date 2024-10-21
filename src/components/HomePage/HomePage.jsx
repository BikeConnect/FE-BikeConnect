import React from 'react';
import Header from '../Header/HeaderNoLogin';
import Footer from '../Footer/Footer';
import SearchBar from '../SearchBar/SearchBar';
import AboutBikeConnect from '../AboutBikeConnect/AboutBikeConnect';
import './HomePage.css';
import theme from '../../assets/images/images_homePage/v994_9045.png';
import diadiem from '../../assets/images/images_homePage/v994_9046.png';
import chothue from '../../assets/images/images_homePage/v994_9104.png';

const HomePage = () => {
    const vehicles = [
        {
            id: 1,
            name: "Trexk road",
            price: "140,000",
            originalPrice: "180,000",
            location: "45 Lê Độ, Thanh Khê, Đà Nẵng",
            distance: "3 km",
            reviews: 65,
            isNew: true,
            image: "https://placehold.co/300x200"
        },
    ];

    const locations = [
        {
            id: 1,
            name: "Hà Nội",
            users: 1000,
            image: "https://placehold.co/400x300"
        },
        {
            id: 2,
            name: "Nghệ An",
            users: 1000,
            image: "https://placehold.co/400x300"
        }
    ];

    const steps = [
        { number: 1, title: "Tìm kiếm xe", description: "Đăng kí và tìm kiếm xe mà bản thân bạn mong muốn để phục vụ cho trải nghiệm" },
        { number: 2, title: "Gặp mặt và kí hợp đồng", description: "Liên hệ và đặt xe, thực hiện kí bản hợp đồng để đảm bảo lợi ích cho cả 2 bên" },
        { number: 3, title: "Nhận chìa khóa và trải nghiệm xe", description: "Nhận chìa khóa và sử dụng xe theo bản hợp đồng cả 2 bên đã kí trước đó" },
        { number: 4, title: "Trả xe", description: "Sau khi thuê xe xong bạn có thể trả cho chủ xe, đảm bảo xe giống như hợp đồng." }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="hero-section pt-24" style={{ backgroundImage: `url(${theme})` }}>
                <div className="container py-16">
                    <SearchBar />
                </div>
            </div>

            <div className="container mx-auto py-16">
                <AboutBikeConnect />
            </div>

            {/* How it works */}
            <div className="py-16 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12">Làm thế nào để thuê xe</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step) => (
                            <div key={step.number} className="text-center">
                                <div className="step-number">{step.number}</div>
                                <h3 className="font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Locations */}
            <div className="py-16">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12">Địa điểm nổi bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {locations.map((location) => (
                            <div key={location.id} className="location-card">
                                <img src={diadiem} alt={location.name} />
                                <h3 className="font-bold">{location.name}</h3>
                                <p className="text-gray-600">{location.users} người dùng</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vehicles */}
            <div className="py-16 bg-gray-50">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12">Xe cho thuê</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.id} className="vehicle-card">
                                <img src={chothue} alt={vehicle.name} />
                                <h3 className="font-bold">{vehicle.name}</h3>
                                <p className="text-gray-600">{vehicle.price} VNĐ</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;