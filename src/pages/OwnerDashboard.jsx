import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoLogOutSharp } from "react-icons/io5";
import { TbPassword } from "react-icons/tb";
import { FaHistory, FaList } from "react-icons/fa";
import { IoIosChatbubbles, IoMdChatboxes } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { FaMotorcycle } from "react-icons/fa6";
import { BiSolidGrid } from "react-icons/bi";
import { MdPayments, MdWarning } from 'react-icons/md';
import api from "../api/api";

const OwnerDashboard = ({ onLogout }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [hasExpiredVehicles, setHasExpiredVehicles] = useState(false);
  const [expiredCount, setExpiredCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkExpiredVehicles = async () => {
      try {
        const response = await api.get('/owner/get-owner-vehicles');
        const vehicles = response.data.metadata;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const expiredVehicles = vehicles.filter(vehicle => {
          const endDate = new Date(vehicle.endDate);
          return endDate < today;
        });
        
        setHasExpiredVehicles(expiredVehicles.length > 0);
        setExpiredCount(expiredVehicles.length);
      } catch (error) {
        console.error('Error checking expired vehicles:', error);
      }
    };

    checkExpiredVehicles();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    onLogout();
    navigate("/");
  };
  return (
    <div>
      <div className="mt-2 bg-slate-200">
      <div className="max-w">
        <div className="w-[90%] mx-auto md-lg:block hidden">
          <div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="px-3 py-3 text-center text-white bg-[#472cb2]"
            >
              <FaList />
            </button>
          </div>
        </div>

        <div className="h-full mx-auto">
          <div className="flex py-3 md-lg:w-[90%] mx-auto relative">
            <div
              className={`rounded-md z-50 md-lg:absolute ${
                showFilter ? "-left-4" : "-left-[360px]"
              } w-[270px] ml-4 bg-white`}
            >
              <ul className="px-4 py-2 text-slate-800">
                <li className="flex items-center justify-start gap-2 py-3">
                  <span className="text-xl">
                    <GoHomeFill />
                  </span>
                  <Link className="block" to="/owner-dashboard">
                    Thông tin cá nhân
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-3 relative">
                  <span className="text-xl">
                    <BiSolidGrid />
                  </span>
                  <Link className="block" to="/owner-dashboard/list-vehicles">
                    Xe của tôi
                  </Link>
                  {hasExpiredVehicles && (
                    <span 
                      className="text-red-500 flex items-center gap-1 ml-2" 
                      title={`Có ${expiredCount} xe đã hết hạn cho thuê`}
                    >
                      <MdWarning className="text-lg" />
                      <span className="text-xs">Hết hạn ({expiredCount})</span>
                    </span>
                  )}
                </li>
                <li className="flex items-center justify-start gap-2 py-3">
                  <span className="text-xl">
                    <FaMotorcycle />
                  </span>
                  <Link className="block" to="/owner-dashboard/rent-bike-request">
                    Yêu cầu thuê xe
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-3">
                  <span className="text-xl">
                    <IoMdChatboxes />
                  </span>
                  <Link className="block" to="/owner-dashboard/chat">
                    Chat với khách hàng
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-3">
                  <span className="text-xl">
                    <IoIosChatbubbles  />
                  </span>
                  <Link className="block" to="/owner-dashboard/chat-admin">
                    Chat với Admin
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-3">
                  <span className="text-xl">
                    <FaHistory />
                  </span>
                  <Link className="block" to="/owner-dashboard/rent-bike-history">
                    Lịch sử cho thuê xe
                  </Link>
                </li>

                <li className="flex items-center justify-start gap-2 py-3">
                  <span className="text-xl">
                  <MdPayments />
                  </span>
                  <Link className="block" to="/owner-dashboard/paymentowner">
                    Thanh toán đăng xe
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-3">
                  <span className="text-xl">
                    <TbPassword />
                  </span>
                  <Link className="block" to="/owner-dashboard/change-password">
                    Đổi mật khẩu
                  </Link>
                </li>
                <li
                  onClick={logout}
                  className="flex items-center justify-start gap-2 py-3 cursor-pointer"
                >
                  <span className="text-xl">
                    <IoLogOutSharp />
                  </span>
                  <div className="block text-red-500">Đăng xuất</div>
                </li>
              </ul>
            </div>
            <div className="w-[calc(100%-270px)] md-lg:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
