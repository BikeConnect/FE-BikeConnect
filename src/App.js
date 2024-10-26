import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import RegisterOwner from './components/RegisterOwner/RegisterOwner';
import HeaderAfterLogin from './components/Header/HeaderAfterLogin';
import HeaderNoLogin from './components/Header/HeaderNoLogin';
import NavBar from './components/NavBar/NavBar';
import CustomerProfile from './components/Profile/CustomerProfile';

function App() {

  const ShowNavBar = () => {
    const location = useLocation();
    return location.pathname === "/customerprofiles" ? <NavBar /> : null;
  };

  return (
    <Router>
      <div className="App">
        <ShowNavBar />
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
          <Route path="/customerprofiles" element={<CustomerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
