import React from 'react';
import './GuideNavBar.css';
import { NavLink } from 'react-router-dom';

const GuideNavBar = ({ activeTab, onTabChange, children }) => {
    return (
        <div className="nav-bar-wrapper">
            <div className="nav-bar">
                <NavLink to="/guide" activeClassName="active">
                    Hướng dẫn chung
                </NavLink>
                <NavLink to="/guide1" activeClassName="active">
                    Hướng dẫn đặt xe
                </NavLink>
                <NavLink to="/guide2" activeClassName="active">
                    Hướng dẫn thanh toán
                </NavLink>
            </div>
            <div className="nav-bar-content">
                {children}
            </div>
        </div>
    );
};

export default GuideNavBar;