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

  const Header = isLoggedIn ? (
    <HeaderAfterLogin onLogout={handleLogout} />
  ) : (
    <HeaderNoLogin onLoginSuccess={handleLogin} />
  );

  return (
    <div className="App">
      {Header}
      <ShowNavBar />
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <Navigate to="/homepage" /> : <HomePage />
        } />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register-owner" element={<RegisterOwner />} />
        <Route
          path="/customerprofiles"
          element={isLoggedIn ? <CustomerProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/changepassword"
          element={isLoggedIn ? <ChangePassword /> : <Navigate to="/" />}
        />
        <Route
          path="/rentalhistory"
          element={isLoggedIn ? <RentalHistory /> : <Navigate to="/" />}
        />
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