import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavbarDashboard from '../components/UI_Admin/NavbarDashboard/NavbarDashboard';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userRole = localStorage.getItem('userRole');
  //   if (userRole !== 'admin') {
  //     navigate('/admin-login');
  //   }
  // }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarDashboard onLogout={onLogout} />
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
