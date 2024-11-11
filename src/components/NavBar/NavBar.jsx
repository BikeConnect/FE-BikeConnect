import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';


const NavBar = ({ children }) => {
    return (
        <div className="nav-bar-wrapper">
            <div className="nav-bar">
                <NavLink to="/customerprofiles" activeClassName="active">
                    Tài khoản của tôi
                </NavLink>
                <NavLink to="/rentalhistory" activeClassName="active">
                    Lịch sử thuê xe
                </NavLink>
                <NavLink to="/changepassword" activeClassName="active">
                    Đổi mật khẩu
                </NavLink>
            </div>
            <div className="nav-bar-content">
                {children}
            </div>
        </div>
    );
};

export default NavBar;