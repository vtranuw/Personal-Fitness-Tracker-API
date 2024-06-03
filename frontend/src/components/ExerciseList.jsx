// // src/components/ExerciseList.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
// import '../axiosConfig'; // Import the axios config to ensure the baseURL is set

// const ExerciseList = () => {
//   const [exercises, setExercises] = useState([]);

//   useEffect(() => {
//     const fetchExercises = async () => {
//       const { data } = await axios.get('/api/fitness');
//       setExercises(data);
//     };

//     fetchExercises();
//   }, []);

//   return (
//     <Container>
//       <Typography variant="h4" component="h2" gutterBottom>
//         Exercise List
//       </Typography>
//       <List>
//         {exercises.map((exercise) => (
//           <ListItem key={exercise._id}>
//             <ListItemText
//               primary={exercise.exercise}
//               secondary={`Duration: ${exercise.duration} minutes`}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default ExerciseList;
// --------------------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';

// const ExerciseList = () => {
//   const [exercises, setExercises] = useState([]);

//   useEffect(() => {
//     const fetchExercises = async () => {
//       const { data } = await axios.get('/api/fitness');
//       setExercises(data);
//     };

//     fetchExercises();
//   }, []);

//   return (
//     <Container>
//       <Typography variant="h4" component="h2" gutterBottom>
//         Exercise List
//       </Typography>
//       <List>
//         {exercises.map((exercise) => (
//           <ListItem key={exercise._id}>
//             <ListItemText
//               primary={exercise.exercise}
//               secondary={`Duration: ${exercise.duration} minutes`}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default ExerciseList;
// -------------------------------------------------------------------
// Modify ExerciseList.js to Include the Token
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const token = localStorage.getItem('token'); // Get the token from local storage

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const { data } = await axios.get('/api/fitness', config);
          setExercises(data);
        } catch (error) {
          console.error('Error fetching exercises:', error);
        }
      } else {
        console.error('No token found');
      }
    };

    fetchExercises();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Exercise List
      </Typography>
      <List>
        {exercises.map((exercise) => (
          <ListItem key={exercise._id}>
            <ListItemText
              primary={exercise.exercise}
              secondary={`Duration: ${exercise.duration} minutes`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ExerciseList;
