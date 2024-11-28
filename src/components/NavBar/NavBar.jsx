import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ userRole, children }) => {
  console.log("NavBar userRole:", userRole);
  return (
    <div className="nav-bar-wrapper">
      <div className="nav-bar">
        <NavLink to="/customerprofiles" activeClassName="active">
          Tài khoản của tôi
        </NavLink>
        {userRole === "owner" ? (
          <>
            <NavLink to="/rentalhistory" activeClassName="active">
              Lịch sử cho thuê
            </NavLink>
            <NavLink to="/postlistowner" activeClassName="active">
              Danh sách xe
            </NavLink>
          </>
        ) : (
          <NavLink to="/rentalhistory" activeClassName="active">
            Lịch sử thuê xe
          </NavLink>
        )}
        <NavLink to="/changepassword" activeClassName="active">
          Đổi mật khẩu
        </NavLink>
        <NavLink to="/rentalstatustabs" activeClassName="active">
          Xem trạng thái xe và đánh giá
        </NavLink>
        <NavLink to="/paymentowner" activeClassName="active">
          Thanh toán cho thuê xe
        </NavLink>
      </div>
      <div className="nav-bar-content">{children}</div>
    </div>
  );
};

export default NavBar;
