import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import RegisterOwner from './components/RegisterOwner/RegisterOwner';
import HeaderAfterLogin from './components/Header/HeaderAfterLogin';
import HeaderNoLogin from './components/Header/HeaderNoLogin';
import NavBar from './components/NavBar/NavBar';
import CustomerProfile from './components/Profile/CustomerProfile';
import ChangePassword from './components/ChangePassword/ChangePassword';
import RentalHistory from './components/RentalHistory/RentalHistory';
import VehicleRental from './components/VehicleRental/VehicleRental';
import Guide from './components/Guide/Guide';
import BookingGuide from './components/Guide/BookingGuide.';
import PaymentGuide from './components/Guide/PaymentGuide';
import Policy from './components/Policy/Policy';
import PrinciplePage from './components/Policy/Principle';
import PrivacyPolicy from './components/Policy/PrivacyPolicy';
import Complaints from './components/Policy/Complaints';
import Dashboard from './components/UI_Admin/Dashboard/Dashboard';
import ManageCustomer from './components/UI_Admin/ManageCustomer/ManageCustomer';
import ManageOwner from './components/UI_Admin/ManageOwner/ManageOwner';
import { CustomerProvider } from './components/UI_Admin/CustomerContext';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const ShowNavBar = () => {
    return location.pathname === "/customerprofiles" ? <NavBar /> : null;
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const Header = () => {
    if (location.pathname === "/dashboard") {
      return null;
    }
    if (location.pathname === "/manageCus") {
      return null;
    }
    if (location.pathname === "/manageOwner") {
      return null;
    }

    return isLoggedIn ? (
      <HeaderAfterLogin onLogout={handleLogout} />
    ) : (
      <HeaderNoLogin onLoginSuccess={handleLogin} />
    );
  };

  return (
    <div className="App">
      <Header />
      <ShowNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register-owner" element={<RegisterOwner />} />
        <Route path="/customerprofiles" element={<CustomerProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/rentalhistory" element={<RentalHistory />} />
        <Route path="/vehiclerental" element={<VehicleRental />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide1" element={<BookingGuide />} />
        <Route path="/guide2" element={<PaymentGuide />} />
        <Route path="/policies" element={<Policy />} />
        <Route path="/policies1" element={<PrinciplePage />} />
        <Route path="/policies2" element={<PrivacyPolicy />} />
        <Route path="/policies3" element={<Complaints />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manageCus" element={<ManageCustomer />} />
        <Route path="/manageOwner" element={<ManageOwner />} />


      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CustomerProvider> {/* Bao bọc AppContent với CustomerProvider */}
        <AppContent />
      </CustomerProvider>
    </Router>
  );
}

export default App;