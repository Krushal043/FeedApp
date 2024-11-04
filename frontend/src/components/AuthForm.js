import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const AuthForm = ({ isLogin, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5">
        {isLogin ? (
          <Box sx={{ mt: 5, p: 3 }}>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Back
            </Button>
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
              Login
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mt: 5, p: 3 }}>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Back
            </Button>
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
              Register
            </Typography>
          </Box>
        )}
      </Typography>
      {!isLogin && (
        <TextField
          name="username"
          label="Username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
        />
      )}
      <TextField
        name="email"
        label="Email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
      />
      {!isLogin ? (
        <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Don't have an account? <Link to="/register">Create Account</Link>
          </Typography>
        </Box>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {isLogin ? "Login" : "Register"}
      </Button>
    </Box>
  );
};

export default AuthForm;
