import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Sending login request...");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      localStorage.setItem("token", data.token);

      const userProfile = await axios.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(userProfile.data));

      console.log("Logged-in user info:", userProfile.data);

      navigate("/exercises");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
