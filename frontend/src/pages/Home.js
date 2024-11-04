import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Feed from "../components/Feed";
import { Button, Typography, Box } from "@mui/material";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Box sx={{ mt: 5, p: 3 }}>
      <Typography variant="h4" align="center">
        Welcome to the Social Media App
      </Typography>
      {isAuthenticated ? (
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/register")}
            sx={{ ml: 2 }}
          >
            Register
          </Button>
        </Box>
      )}
      <Feed isAuthenticated={isAuthenticated} />
    </Box>
  );
};

export default Home;
