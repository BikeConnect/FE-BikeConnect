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
                    <NavLink to="/manageCus" className="nav-link" activeClassName="active">
                        Quản lý tài khoản khách hàng
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/manageOwner" className="nav-link" activeClassName="active">
                        Quản lý tài khoản chủ xe
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarDashboard;
