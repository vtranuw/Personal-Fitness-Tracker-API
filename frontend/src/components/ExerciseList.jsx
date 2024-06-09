import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }

    const fetchExercises = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

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
    };

    const fetchTotalDuration = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get("/api/fitness/totalDuration", config);
        setTotalDuration(data[0]?.totalDuration || 0);
      } catch (error) {
        console.error("Error fetching total duration:", error);
      }
    };

    fetchExercises();
    fetchTotalDuration();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

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
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

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
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `/api/fitness/search?query=${searchQuery}`,
        config
      );
      setExercises(data);
    } catch (error) {
      console.error("Error searching exercises:", error);
    }
  };

  return (
    <Container>
      {user && (
        <Typography variant="h5" component="h3" gutterBottom>
          Welcome, {user.name}
        </Typography>
      )}
      <Typography variant="h4" component="h2" gutterBottom>
        Exercise List
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Total Duration: {totalDuration} minutes
      </Typography>
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 2 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Search Exercises"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>
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
