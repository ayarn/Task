import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import RegisterCustomer from "./components/RegisterCustomer";
import RegisterAdmin from "./components/RegisterAdmin";
import AdminLogin from "./components/AdminLogin";
import VerifyEmailComponent from "./components/VerifyEmailComponent";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <button
        onClick={() => navigate("/register-customer")}
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Register as Customer
      </button>
      <button
        onClick={() => navigate("/register-admin")}
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Register as Admin
      </button>
      <button
        onClick={() => navigate("/admin-login")}
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Login as Admin
      </button>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-customer" element={<RegisterCustomer />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/verify/:token" element={<VerifyEmailComponent />} />
      </Routes>
    </>
  );
};

export default App;
