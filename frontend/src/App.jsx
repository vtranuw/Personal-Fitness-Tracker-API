// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Register from './components/Register';
// import Login from './components/Login';
// import ExerciseList from './components/ExerciseList';

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/exercises" element={<ExerciseList />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// -------------------------------------------------------------------------
// import React from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Register from './components/Register';
// import Login from './components/Login';
// import ExerciseList from './components/ExerciseList';

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Navigate to="/exercises" />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/exercises" element={<ExerciseList />} />
//       </Routes>
//     </>
//   );
// };

// export default App;
// --------------------------------------------------------------------------------------
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import ExerciseList from './components/ExerciseList';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/exercises" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exercises" element={<ProtectedRoute element={<ExerciseList />} />} />
      </Routes>
    </>
  );
};

export default App;
