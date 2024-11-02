import React from 'react';
import './PolicyNavBar.css';
import { NavLink } from 'react-router-dom';

const PolicyNavBar = ({ activeTab, onTabChange, children }) => {
    return (
        <div className="nav-bar-wrapper">
            <div className="nav-bar">
                <NavLink to="/policies" activeClassName="active">
                    Chính sách & Quy Định
                </NavLink>
                <NavLink to="/policies1" activeClassName="active">
                    Nguyên tắc chung
                </NavLink>
                <NavLink to="/policies2" activeClassName="active">
                    Chính sách bảo mật
                </NavLink>
                <NavLink to="/policies3" activeClassName="active">
                    Giải quyết khiếu nại
                </NavLink>
            </div>
            <div className="nav-bar-content">
                {children}
            </div>
        </div>
    );
};

export default PolicyNavBar;

