import React from "react";
import AuthForm from "../components/AuthForm";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return <AuthForm isLogin onSubmit={handleLogin} />;
};

export default Login;
