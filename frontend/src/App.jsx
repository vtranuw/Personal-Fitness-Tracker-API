import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import ExerciseList from "./components/ExerciseList";
import AddExercise from "./components/AddExercise";
import Info from "./components/Info";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/exercises" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exercises" element={<ExerciseList />} />
        <Route path="/add-exercise" element={<AddExercise />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
};

export default App;
