import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarDashboard.css';

const NavbarDashboard = () => {
    return (
        <nav className="navbar-dashboard">
            <ul className="nav-list">
                <li>
                    <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/manageuser" className="nav-link" activeClassName="active">
                        Quản lý tài khoản người dùng
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/valrequest" className="nav-link" activeClassName="active">
                        Xác thực yêu cầu
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarDashboard;
