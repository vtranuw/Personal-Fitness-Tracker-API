import React from "react";
import { Container, Typography } from "@mui/material";

const Info = () => {
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        About Fitness Tracker
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the Fitness Tracker App! This application allows you to log,
        monitor, and analyze your fitness activities and progress. Whether you
        are aiming to improve your health, track your workouts, or set fitness
        goals, this app provides all the tools you need to stay on track.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Features include:
      </Typography>
      <ul>
        <li>User registration and login with secure authentication.</li>
        <li>Ability to add, update, and delete fitness activities.</li>
        <li>View a list of your exercises and total exercise duration.</li>
        <li>Search your fitness activities.</li>
      </ul>
      <Typography variant="body1" gutterBottom>
        Get started by registering an account and logging your first exercise!
      </Typography>
    </Container>
  );
};

export default Info;
