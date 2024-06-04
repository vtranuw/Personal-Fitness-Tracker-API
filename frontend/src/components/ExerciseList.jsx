import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [editExerciseId, setEditExerciseId] = useState(null);
  const [newExercise, setNewExercise] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const fetchExercises = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const { data } = await axios.get("/api/fitness", config);
          setExercises(data);
        } catch (error) {
          console.error("Error fetching exercises:", error);
        }
      } else {
        console.error("No token found");
      }
    };

    const fetchTotalDuration = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const { data } = await axios.get(
            "/api/fitness/totalDuration",
            config
          );
          setTotalDuration(data[0]?.totalDuration || 0);
        } catch (error) {
          console.error("Error fetching total duration:", error);
        }
      } else {
        console.error("No token found");
      }
    };

    fetchExercises();
    fetchTotalDuration();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        await axios.delete(`/api/fitness/${id}`, config);
        setExercises(exercises.filter((exercise) => exercise._id !== id));
      } catch (error) {
        console.error("Error deleting exercise:", error);
      }
    } else {
      console.error("No token found");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(
          `/api/fitness/${editExerciseId}`,
          { exercise: newExercise, duration: newDuration },
          config
        );
        setExercises(
          exercises.map((exercise) =>
            exercise._id === editExerciseId ? data : exercise
          )
        );
        setEditExerciseId(null);
        setNewExercise("");
        setNewDuration("");
      } catch (error) {
        console.error("Error updating exercise:", error);
      }
    } else {
      console.error("No token found");
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Exercise List
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Total Duration: {totalDuration} minutes
      </Typography>
      <List>
        {exercises.map((exercise) => (
          <ListItem key={exercise._id}>
            {editExerciseId === exercise._id ? (
              <Box component="form" onSubmit={handleUpdate}>
                <TextField
                  value={newExercise}
                  onChange={(e) => setNewExercise(e.target.value)}
                  label="Exercise"
                  required
                />
                <TextField
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  label="Duration"
                  type="number"
                  required
                />
                <Button type="submit">Update</Button>
                <Button onClick={() => setEditExerciseId(null)}>Cancel</Button>
              </Box>
            ) : (
              <>
                <ListItemText
                  primary={exercise.exercise}
                  secondary={`Duration: ${exercise.duration} minutes`}
                />
                <Button onClick={() => setEditExerciseId(exercise._id)}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(exercise._id)}>
                  Delete
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ExerciseList;
