import React, { useState } from "react";
import axios from "axios";

const RegisterCustomer = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", {
        ...formData,
        role: "customer",
      });
      alert(
        "Registration successful, please check your email for verification link."
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="text"
          name="first_name"
          value={first_name}
          onChange={onChange}
          placeholder="First Name"
          required
          style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
        />
        <input
          type="text"
          name="last_name"
          value={last_name}
          onChange={onChange}
          placeholder="Last Name"
          required
          style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
          style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
          style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
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
      </form>
    </div>
  );
};

export default RegisterCustomer;
