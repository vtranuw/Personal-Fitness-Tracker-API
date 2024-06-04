import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import ExerciseList from "./components/ExerciseList";
import AddExercise from "./components/AddExercise";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/exercises" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exercises" element={<ExerciseList />} />
        <Route path="/add-exercise" element={<AddExercise />} />{" "}
        {/* New route */}
      </Routes>
    </>
  );
};

export default App;
