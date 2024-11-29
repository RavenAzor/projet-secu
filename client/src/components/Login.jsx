// src/components/LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", formData);
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setErrorMessage("Identifiants incorrects");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
