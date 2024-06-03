// // src/components/Register.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, TextField, Button, Typography } from '@mui/material';
// import '../axiosConfig'; // Import the axios config to ensure the baseURL is set

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       const { data } = await axios.post(
//         '/api/users/register',
//         { name, email, password },
//         config
//       );

//       console.log(data);
//     } catch (error) {
//       console.error(error.response.data.message);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Typography component="h1" variant="h5">
//         Register
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Name"
//           name="name"
//           autoComplete="name"
//           autoFocus
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Email Address"
//           name="email"
//           autoComplete="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           name="password"
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//         >
//           Register
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default Register;
// ---------------------------------------------
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/register',
        { name, email, password },
        config
      );

      console.log(data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
