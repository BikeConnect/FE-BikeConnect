import React, { useState } from 'react';
import AuthCustomer from './AuthCustomer/AuthCustomer';
import AuthOwner from './AuthOwner/AuthOwner';
import './AuthUser.css';
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard';

const AuthUser = () => {
    const [activeTab, setActiveTab] = useState('customer');

    return (
        <div>
            <NavbarDashboard />
            <div className="auth-user-container">
                <div className="button-container">
                    <button
                        className={`tab-button ${activeTab === 'customer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('customer')}
                    >
                        Khách thuê
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'owner' ? 'active' : ''}`}
                        onClick={() => setActiveTab('owner')}
                    >
                        Chủ xe
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'customer' ? <AuthCustomer /> : <AuthOwner />}
                </div>
            </div>
        </div>
    );
};

export default AuthUser;