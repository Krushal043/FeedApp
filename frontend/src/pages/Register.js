import React from "react";
import AuthForm from "../components/AuthForm";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const { data } = await API.post("/auth/register", formData);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return <AuthForm onSubmit={handleRegister} />;
};

export default Register;
