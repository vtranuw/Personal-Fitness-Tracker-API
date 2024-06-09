import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";

const AddExercise = () => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found, please login first.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/fitness",
        { exercise, duration },
        config
      );

      setSuccess("Exercise added successfully");
      setExercise("");
      setDuration("");
    } catch (error) {
      setError("Error adding exercise. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Add Exercise
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Exercise"
          name="exercise"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Duration (minutes)"
          name="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Add Exercise
        </Button>
      </form>
    </Container>
  );
};

export default AddExercise;
