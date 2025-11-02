import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    const requiredFields = [
      "name",
      "email",
      "password",
      "confirmPassword",
      "phone",
      "age",
      "gender",
      "address",
    ];
    for (let field of requiredFields) {
      if (!form[field]) {
        alert(`⚠ Please fill in ${field}`);
        return;
      }
    }

    if (form.password !== form.confirmPassword) {
      alert("⚠ Passwords do not match");
      return;
    }

    try {
      // ✅ Backend API call
      const res = await axios.post("https://fullstack-telimedicine-backend.onrender.com", {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        age: form.age,
        gender: form.gender,
        address: form.address,
      });

      console.log("✅ Registration Response:", res.data);

      // ✅ On successful registration
      if (res.status === 200 || res.status === 201) {
        alert("✅ Registration successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert("⚠ Unexpected response from server.");
      }
    } catch (err) {
      console.error("❌ Registration error:", err.response || err.message);

      if (err.response?.status === 400) {
        alert("⚠ Invalid input or missing fields. Please check again.");
      } else if (err.response?.status === 409) {
        alert("⚠ Email already registered. Try logging in instead.");
        navigate("/login");
      } else {
        alert("❌ Server error during registration. Please try again later.");
      }
    }
  };

  return (
    <div style={outerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            style={{ ...inputStyle, height: "70px", resize: "none" }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#007BFF",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

// --- Styles ---
const outerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",

};

const cardStyle = {
  maxWidth: "440px",
  width: "100%",
  padding: "35px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
};

const titleStyle = {
  textAlign: "center",
  color: "#007BFF",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  marginBottom: "15px",
  border: "1.5px solid #ccc",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
  transition: "all 0.3s ease",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};
