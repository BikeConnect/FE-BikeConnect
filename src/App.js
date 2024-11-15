import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
import BikeDetail from './components/BikeDetail/BikeDetail';
import Chat from './components/Chat/Chat';
import Policy from './components/Policy/Policy';
import PrinciplePage from './components/Policy/Principle';
import PrivacyPolicy from './components/Policy/PrivacyPolicy';
import Complaints from './components/Policy/Complaints';
import Dashboard from './components/UI_Admin/Dashboard/Dashboard';
import ManageCustomer from './components/UI_Admin/ManageCustomer/ManageCustomer';
import ManageOwner from './components/UI_Admin/ManageOwner/ManageOwner';
import { CustomerProvider } from './components/UI_Admin/CustomerContext';
import Support from './components/Support/Support';
import Register from "./components/Register/Register";
import Login from './components/Login/Login';
import PostPage from './components/PostPage/PostPage';
import CusFilterOptions from "./components/CusFilterOptions/CusFilterOptions";
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import RentalSignup from './components/RentalSignup/RentalSignup';



function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();

  const ShowNavBar = () => {
    const displayNavPaths = [
      "/customerprofiles",
      "/changepassword",
      "/rentalhistory",
    ];
    return displayNavPaths.includes(location.pathname) ? (
      <NavBar userRole={userRole} />
    ) : null;
  };

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    console.log("User role after login:", role);
  };

  const handleLogout = () => {
    setUserRole("");
    setIsLoggedIn(false);
  };

  const Header = () => {
    if (
      ["/dashboard", "/manageCus", "/manageOwner"].includes(location.pathname)
    ) {
      return null;
    }

    return isLoggedIn ? (
      <HeaderAfterLogin onLogout={handleLogout} userRole={userRole} />
    ) : (
      <HeaderNoLogin onLoginSuccess={handleLogin} />
    );
  };

  return (
    <div className="App">
      <Header />
      <ShowNavBar userRole={userRole} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/register-owner" element={<RegisterOwner />} />
        <Route path="/" element={<RentalSignup />} />
        <Route path="/login" element={<Login/>} />
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
        <Route path="/BikeDetail/:name" element={<BikeDetail />} />
        <Route path="/RentalSignup" element={<RentalSignup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/support" element={<Support />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/CusFilterOptions" element={<CusFilterOptions />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        
        
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CustomerProvider>
        <AppContent />
      </CustomerProvider>
    </Router>
  );
}

export default App;