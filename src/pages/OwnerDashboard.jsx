import React, { useState } from "react";
import Footer from "../components/Footer/Footer";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoLogOutSharp } from "react-icons/io5";
import { TbPassword } from "react-icons/tb";
import { FaHistory, FaList } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";

const OwnerDashboard = ({ onLogout }) => {
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    onLogout();
    navigate("/");
  };
  return (
    <div>
      {/* <HeaderAfterLogin /> */}
      <div className="mt-2 bg-slate-200">
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

                <li className="flex items-center justify-start gap-2 py-3">
                  <span className="text-xl">
                    <IoMdChatboxes />
                  </span>
                  <Link className="block" to="/owner-dashboard/chat">
                    Chat
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-3">
                  <span className="text-xl">
                    <FaHistory />
                  </span>
                  <Link className="block" to="/dashboard/chat">
                    Lịch sử thuê xe
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-3">
                  <span className="text-xl">
                    <TbPassword />
                  </span>
                  <Link className="block" to="/user-dashboard/change-password">
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

      <Footer />
    </div>
  );
};

export default OwnerDashboard;
