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

      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;