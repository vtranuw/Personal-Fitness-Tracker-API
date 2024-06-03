// // src/components/Login.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, TextField, Button, Typography } from '@mui/material';
// import '../axiosConfig'; // Import the axios config to ensure the baseURL is set

// const Login = () => {
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
//         '/api/users/login',
//         { email, password },
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
//         Login
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Email Address"
//           name="email"
//           autoComplete="email"
//           autoFocus
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
//           Login
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default Login;
// --------------------------------------------------------
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, TextField, Button, Typography } from '@mui/material';

// const Login = () => {
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
//         '/api/users/login',
//         { email, password },
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
//         Login
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Email Address"
//           name="email"
//           autoComplete="email"
//           autoFocus
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
//           Login
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default Login;
// -----------------------------------------------------
// Update Login.js component to store the token in local storage after a successful login
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, TextField, Button, Typography } from '@mui/material';

// const Login = () => {
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
//         '/api/users/login',
//         { email, password },
//         config
//       );

//       localStorage.setItem('token', data.token); // Store the token
//       console.log(data);
//     } catch (error) {
//       console.error(error.response.data.message);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Typography component="h1" variant="h5">
//         Login
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Email Address"
//           name="email"
//           autoComplete="email"
//           autoFocus
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
//           Login
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default Login;

// -------------------------------------------------------------------------
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      localStorage.setItem('token', data.token); // Store the token
      console.log(data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
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
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
