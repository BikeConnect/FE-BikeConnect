import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import RegisterOwner from "./components/RegisterOwner/RegisterOwner";
import HeaderAfterLogin from "./components/Header/HeaderAfterLogin";
import HeaderNoLogin from "./components/Header/HeaderNoLogin";
import CustomerProfile from "./components/Profile/CustomerProfile";
import RentalHistory from "./components/RentalHistory/RentalHistory";
import VehicleRental from "./components/VehicleRental/VehicleRental";
import Guide from "./components/Guide/Guide";
import BookingGuide from "./components/Guide/BookingGuide.";
import PaymentGuide from "./components/Guide/PaymentGuide";
import BikeDetail from "./components/BikeDetail/BikeDetail";
import Policy from "./components/Policy/Policy";
import PrinciplePage from "./components/Policy/Principle";
import PrivacyPolicy from "./components/Policy/PrivacyPolicy";
import Complaints from "./components/Policy/Complaints";
import Dashboard from "./components/UI_Admin/Dashboard/Dashboard";
import Support from "./components/Support/Support";
import Register from "./components/Register/Register";
import PostPage from "./components/PostPage/PostPage";
import CusFilterOptions from "./components/CusFilterOptions/CusFilterOptions";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ContractManagement from "./components/Contract/ContractManagement";
import CreateContract from "./components/Contract/CreateContract";
import AuthUser from "./components/UI_Admin/AuthUser/AuthUser";
import ManageUser from "./components/UI_Admin/ManageUser/ManageUser";
import PostListOwner from "./components/PostListOwner/PostListOwner";
import UserDashboard from "./pages/CustomerDashboard";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import CustomerChangePassword from "./components/CustomerDashboard/CustomerChangePassword";
import CustomerChat from "./components/CustomerDashboard/CustomerChat";
import CustomerIndex from "./components/CustomerDashboard/CustomerIndex";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerIndex from "./components/OwnerDashboard/OwnerIndex";
import { useDispatch } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducer";
import OwnerChatCustomer from "./components/OwnerDashboard/OwnerChatCustomer";
import ViewTransactionHistory from "./components/UI_Admin/ViewTransactionHistory/ViewTransactionHistory";
import RentalStatusTabs from "./components/RentalStatusTabs/RentalStatusTabs";
import MotorbikeReview from "./components/MotorbikeReview/MotorbikeReview";
import RentalSignup from "./components/RentalSignup/RentalSignup";
import PaymentOwner from "./components/PaymentOwner/PaymentOwner";
import OwnerRequestBike from "./components/OwnerDashboard/OwnerRequestBike";
import UpdatePage from "./components/UpdatePage/UpdatePage";
import OwnerHistoryRent from "./components/OwnerDashboard/OwnerHistoryRent";
import OwnerChangePassword from "./components/OwnerDashboard/OwnerChangePassword";
import OwnerChatAdmin from "./components/OwnerDashboard/OwnerChatAdmin";
import OwnerListVehicles from "./components/OwnerDashboard/OwnerListVehicles";
import { CustomerProvider } from "./components/UI_Admin/CustomerContext";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setUserRole(decoded.role);
        setUserRole(setUserRole(decoded.role));
        dispatch(get_user_info());
      } catch (error) {
        console.log("Token decode error", error.message);
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setUserRole("");
        dispatch(setUserRole(""));
      }
    }
  }, [dispatch]);

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    console.log("User role after login:", role);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setUserRole("");
    setIsLoggedIn(false);
  };

  const Header = () => {
    if (
      ["/dashboard", "/manageCus", "/manageOwner", "valrequest", ""].includes(
        location.pathname
      )
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
      {/* <ShowNavBar userRole={userRole} /> */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<Register />} />{" "}
        <Route path="/register-owner" element={<RegisterOwner />} />
        <Route path="/customerprofiles" element={<CustomerProfile />} />
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
        <Route path="/BikeDetail/:name/:slug" element={<BikeDetail />} />
        <Route path="/support" element={<Support />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/CusFilterOptions" element={<CusFilterOptions />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/managecontract" element={<ContractManagement />} />
        <Route path="/contract" element={<CreateContract />} />
        <Route path="/valrequest" element={<AuthUser />} />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/post" element={<PostListOwner />} />
        <Route
          path="/viewtransactionhis"
          element={<ViewTransactionHistory />}
        />
        <Route path="/motorbikereview" element={<MotorbikeReview />} />
        <Route path="/rental-signup" element={<RentalSignup />} />
        {/* <Route path="/ownerchat" element={<OwnerChat />} /> */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <UserDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<CustomerIndex />} />
          <Route path="chat" element={<CustomerChat />} />
          <Route path="chat/:ownerId" element={<CustomerChat />} />
          <Route path="change-password" element={<CustomerChangePassword />} />
          <Route path="rentalstatustabs" element={<RentalStatusTabs />} />
        </Route>
        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <OwnerDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<OwnerIndex />} />
          <Route path="chat" element={<OwnerChatCustomer />} />
          <Route path="chat/:customerId" element={<OwnerChatCustomer />} />
          <Route path="chat-admin" element={<OwnerChatAdmin />} />
          <Route path="rent-bike-request" element={<OwnerRequestBike />} />

          <Route path="rent-bike-history" element={<OwnerHistoryRent />} />
          <Route path="change-password" element={<OwnerChangePassword />} />
          <Route path="list-vehicles" element={<OwnerListVehicles />} />
          <Route path="paymentowner" element={<PaymentOwner />} />
          <Route path="postlistowner" element={<PostListOwner />} />
        </Route>
        <Route path="/update-vehicle/:id" element={<UpdatePage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <CustomerProvider>
      <Router>
        <AppContent />
      </Router>
    </CustomerProvider>
  );
}

export default App;
