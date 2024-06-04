import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

const AddExercise = () => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/fitness",
        { exercise, duration },
        config
      );
      console.log("Exercise added:", data);

      // Reset form fields
      setExercise("");
      setDuration("");
    } catch (error) {
      console.error("Error adding exercise:", error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Add Exercise
      </Typography>
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
