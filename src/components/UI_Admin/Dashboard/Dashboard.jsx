import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';
import { useCustomer } from '../CustomerContext';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { customerCount, ownerCount, rentalRequestCount, postRequestCount } = useCustomer(); // Lấy các giá trị số lượng

    const revenueData = {
        labels: ['Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10'],
        datasets: [
            {
                label: 'Doanh thu theo tháng',
                data: [5000000, 7000000, 3000000, 8000000, 6000000],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <NavbarDashboard />
            <div className="dashboard-container">
                <h1>Dashboard</h1>
                <div className="tables-container">
                    <div className="table">
                        <h2>Khách hàng</h2>
                        <p>Số lượng: {customerCount}</p>
                    </div>
                    <div className="table">
                        <h2>Chủ xe</h2>
                        <p>Số lượng: {ownerCount}</p>
                    </div>
                    <div className="table">
                        <h2>Yêu cầu xác thực cho thuê xe</h2>
                        <p>Số lượng: {rentalRequestCount}</p>
                    </div>
                    <div className="table">
                        <h2>Yêu cầu xác thực đăng bài</h2>
                        <p>Số lượng: {postRequestCount}</p>
                    </div>
                </div>
                <div className="revenue-chart">
                    <h2>Doanh thu theo tháng (VNĐ)</h2>
                    <Bar data={revenueData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
