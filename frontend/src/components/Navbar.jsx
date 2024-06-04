import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/login"); // Navigate to the login page
    window.location.reload(); // Reload the page to clear the state
  };

  const handleReset = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/login"); // Navigate to the login page
    window.location.reload(); // Reload the page to clear the state
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fitness Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/exercises">
          Exercises
        </Button>
        <Button color="inherit" component={Link} to="/add-exercise">
          Add Exercise
        </Button>
        <Button color="inherit" onClick={handleReset}>
          Reset
        </Button>{" "}
        {/* Reset button */}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>{" "}
        {/* Logout button */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
