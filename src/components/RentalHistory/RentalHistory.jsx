import React from 'react';
import './RentalHistory.css';
import NavBar from '../NavBar/NavBar';
import HeaderAfterLogin from '../Header/HeaderAfterLogin';

const RentalHistory = () => {
    const rentalData = [
        { id: 1, licensePlate: '29A-12345', vehicleName: 'Yamaha Nouvo', vehicleType: 'Xe máy', date: '2024-10-20', notes: 'Không có ghi chú' },
        { id: 2, licensePlate: '59C-67890', vehicleName: 'Honda AirBlade', vehicleType: 'Xe máy', date: '2024-10-22', notes: 'Bảo dưỡng tốt' },
        { id: 3, licensePlate: 'HN-54321', vehicleName: 'Xe đạp địa hình', vehicleType: 'Xe đạp', date: '2024-10-25', notes: 'Không có ghi chú' },
        { id: 4, licensePlate: 'HN-65432', vehicleName: 'Xe đạp điện', vehicleType: 'Xe đạp', date: '2024-10-27', notes: 'Lốp hơi non' },
        { id: 5, licensePlate: '30E-13579', vehicleName: 'Yamaha Janus', vehicleType: 'Xe máy', date: '2024-10-29', notes: 'Không có ghi chú' },
    ];

    return (
        <div>
            <div className="rental-history">
                <h2>Lịch sử thuê xe</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Biển số</th>
                            <th>Tên xe</th>
                            <th>Loại xe</th>
                            <th>Ngày</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentalData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.licensePlate}</td>
                                <td>{item.vehicleName}</td>
                                <td>{item.vehicleType}</td>
                                <td>{item.date}</td>
                                <td>{item.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RentalHistory;
