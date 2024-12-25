import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { FaUserCheck, FaUserClock, FaUserSlash } from "react-icons/fa";
import { BiHistory } from "react-icons/bi";
import logo from "../../../assets/images/8.png";
import { IoMdChatbubbles } from "react-icons/io";
import { useDispatch } from "react-redux";
import { admin_logout, adminLogout } from "../../../store/Reducers/authReducer";
const NavbarDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const adminNavItems = [
    {
      path: "/admin/dashboard",
      icon: <MdDashboard className="text-lg" />,
      title: "Dashboard",
    },
    {
      path: "/admin/active-owner",
      icon: <FaUserCheck className="text-lg" />,
      title: "Tài khoản đã xác thực",
    },
    {
      path: "/admin/deactive-owner",
      icon: <FaUserSlash className="text-lg" />,
      title: "Tài khoản đã bị khóa",
    },
    {
      path: "/admin/pending-owner",
      icon: <FaUserClock className="text-lg" />,
      title: "Tài khoản chờ xác thực",
    },
    {
      path: "/admin/transactions",
      icon: <BiHistory className="text-lg" />,
      title: "Lịch sử giao dịch",
    },
    {
      path: "/admin/chat-owner",
      icon: <IoMdChatbubbles className="text-lg" />,
      title: "Chat với chủ xe",
    },
  ];

  const handleLogout = () => {
    dispatch(adminLogout());
    dispatch(admin_logout()).then(() => {
      navigate("/admin-login");
    });
  };
  return (
    <div className="w-[260px] fixed bg-[#ffffff] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)]">
      <div className="h-[100px] flex justify-center items-center">
        <Link to="/admin" className="w-[220px] h-[80px]">
          <img className="w-full h-full object-contain" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="px-[16px]">
        <ul>
          {adminNavItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white"
                    : "text-[#5d6066] hover:bg-gray-100"
                } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 font-bold`}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={handleLogout}
              className="text-red-500 bg-white hover:bg-gray-100 font-bold duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1"
            >
              <span>
                <RiLogoutBoxFill className="text-lg" />
              </span>
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarDashboard;
