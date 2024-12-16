import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';
import { useCustomer } from '../CustomerContext';
import { FaUsers, FaCar, FaClipboardCheck, FaFileAlt } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { 
        customerCount = 0, 
        ownerCount = 0, 
        rentalRequestCount = 0, 
        postRequestCount = 0 
    } = useCustomer() || {};

    const revenueData = {
        labels: ['Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10'],
        datasets: [
            {
                label: 'Doanh thu theo tháng',
                data: [5000000, 7000000, 3000000, 8000000, 6000000],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1,
            },
        ],
    };

    const statCards = [
        {
            title: 'Khách hàng',
            value: customerCount,
            icon: <FaUsers className="w-8 h-8" />,
            color: 'bg-blue-500',
        },
        {
            title: 'Chủ xe',
            value: ownerCount,
            icon: <FaCar className="w-8 h-8" />,
            color: 'bg-green-500',
        },
        {
            title: 'Yêu cầu thuê xe',
            value: rentalRequestCount,
            icon: <FaClipboardCheck className="w-8 h-8" />,
            color: 'bg-yellow-500',
        },
        {
            title: 'Yêu cầu đăng bài',
            value: postRequestCount,
            icon: <FaFileAlt className="w-8 h-8" />,
            color: 'bg-purple-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <NavbarDashboard />
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((card, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                                            <h3 className="text-2xl font-bold text-gray-800">
                                                {card.value.toLocaleString()}
                                            </h3>
                                        </div>
                                        <div className={`${card.color} p-3 rounded-full text-white`}>
                                            {card.icon}
                                        </div>
                                    </div>
                                </div>
                                <div className={`${card.color} h-1`}></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Doanh thu theo tháng (VNĐ)
                        </h2>
                        <div className="h-[400px]">
                            <Bar
                                data={revenueData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                callback: (value) => 
                                                    value.toLocaleString('vi-VN') + ' đ',
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Thống kê hoạt động
                        </h2>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <span className="text-gray-600">Tổng số giao dịch</span>
                                <span className="font-semibold text-lg">125</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                                <span className="text-gray-600">Giao dịch thành công</span>
                                <span className="font-semibold text-lg text-green-600">115</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                                <span className="text-gray-600">Giao dịch đang xử lý</span>
                                <span className="font-semibold text-lg text-yellow-600">8</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                                <span className="text-gray-600">Giao dịch thất bại</span>
                                <span className="font-semibold text-lg text-red-600">2</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Thông tin hệ thống
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Tổng số xe</span>
                                <span className="font-semibold text-lg">250</span>
                            </div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Xe đang cho thuê</span>
                                <span className="font-semibold text-lg text-blue-600">180</span>
                            </div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Xe đang bảo trì</span>
                                <span className="font-semibold text-lg text-orange-600">15</span>
                            </div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Xe sẵn sàng</span>
                                <span className="font-semibold text-lg text-green-600">55</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
