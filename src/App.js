import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <HeaderAfterLogin /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/userprofiles" element={<UserProfilePage />} /> */}
          {/* Định nghĩa thêm các Route khác nếu cần */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
