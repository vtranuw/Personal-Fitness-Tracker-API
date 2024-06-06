# Fitness Tracker

## Project Overview

### Scenario

In today's fast-paced world, maintaining a healthy lifestyle is crucial. Many individuals struggle to keep track of their fitness activities and goals. The Fitness Tracker App aims to provide a comprehensive solution for users to log, monitor, and analyze their fitness activities and progress.

### Problem Statement

The primary problem this project seeks to solve is the lack of a centralized, user-friendly platform for tracking fitness activities. Users need a reliable way to record their workouts, view their progress, and set fitness goals. This API will facilitate these needs by offering robust tracking, analysis, and user management features.

## Technical Components

### Routes

- **Authentication Routes:**

  - POST `/api/users/register`: Register a new user.
  - POST `/api/users/login`: Authenticate a user and return a JWT.

- **Profile Routes:**

  - GET `/api/users/profile`: Retrieve the logged-in user's profile.

- **Fitness Routes:**
  - GET `/api/fitness`: Retrieve all exercises for the logged-in user.
  - POST `/api/fitness`: Add a new exercise for the logged-in user.
  - PUT `/api/fitness/:id`: Update a specific exercise.
  - DELETE `/api/fitness/:id`: Delete a specific exercise.
  - GET `/api/fitness/totalDuration`: Get the total duration of all exercises for the logged-in user.
  - GET `/api/fitness/search`: Search exercises by text query.

### Data Models

- **User Model:**

  - Attributes:
    - **Name:** The user's name, required.
    - **Email:** A unique email address for each user, required and indexed for uniqueness.
    - **Password:** A securely hashed password.
  - Pre-save Middleware: Hashes the password before saving to ensure secure storage.
  - Methods: Includes a method to compare a given password with the hashed password for authentication.

- **Fitness Model:**
  - Attributes:
    - **User:** Reference to the user who created the exercise.
    - **Exercise:** The type of exercise (e.g., running, swimming), required.
    - **Duration:** The duration of the exercise in minutes, required.
    - **Date:** The date of the exercise, default is the current date.
  - Indexes: Index on `user` and text index on `exercise` for search functionality.

### External Data Sources

- No external data sources are currently planned.

## Project Requirements Fulfillment

| **Requirement**                                             | **Description**                                                            | **Status**  |
| ----------------------------------------------------------- | -------------------------------------------------------------------------- | ----------- |
| **Authentication and Authorization**                        | Implemented using JWT for secure user authentication and authorization.    | Implemented |
| **Two sets of CRUD routes**                                 | User Profiles and Fitness Activities with full CRUD operations.            | Implemented |
| **Indexes for performance and uniqueness**                  | Unique indexes on `email` in the User model and text index on `exercise`.  | Implemented |
| **Advanced MongoDB feature**                                | Text search implemented in activities and aggregations for total duration. | Implemented |
| **Thorough testing (coverage > 80%)**                       | Comprehensive tests using Jest and Supertest with aim for >80% coverage.   | In Progress |
| **API interaction demonstration**                           | Frontend provided to demonstrate API interaction.                          | Implemented |
| **Simple front-end project (ReactJS + Vite + Material-UI)** | Basic React frontend to interact with the API.                             | Implemented |

## Timeline

| **Week** | **Tasks**                                              | **Deliverables**                                        |
| -------- | ------------------------------------------------------ | ------------------------------------------------------- |
| **1**    | - Set up project repo, MongoDB, and Express.           | - Basic project structure and initial DB setup.         |
|          | - Design and implement the database schema.            | - Database schema with necessary indexes.               |
|          | - Begin developing authentication mechanisms.          | - Partially completed authentication routes.            |
| **2**    | - Complete authentication with JWT tokens.             | - Fully functional authentication system.               |
|          | - Develop the first set of CRUD routes for profiles.   | - CRUD operations for user profiles.                    |
|          | - Start the second set of CRUD for fitness activities. | - Initial CRUD operations for fitness activities.       |
| **3**    | - Finish CRUD routes for fitness activities.           | - Completion of CRUD operations for fitness activities. |
|          | - Implement one advanced MongoDB feature.              | - Advanced MongoDB feature integrated.                  |
|          | - Start ReactJS front-end setup.                       | - Initial front-end setup and basic UI interactions.    |
| **4**    | - Review and optimize database indexes and queries.    | - Optimized backend with appropriate indexes.           |
|          | - Implement comprehensive tests for all routes.        | - Test suite with >80% coverage.                        |

## Using the App

1. **Run the Backend Server:**

   - Ensure MongoDB is running.
   - Navigate to the `backend` directory and install dependencies:

     ```sh
     cd backend
     npm install
     ```

   - Start the backend server:

     ```sh
     npm start
     ```

   - The backend server should run on port 5002 by default.

2. **Run the Frontend:**

   - Navigate to the `frontend` directory:

     ```sh
     cd frontend
     ```

   - Install frontend dependencies:

     ```sh
     npm install
     ```

   - Start the frontend development server:

     ```sh
     npm run dev
     ```

   - The frontend server should start on port 3001 by default.

3. **Access the Application:**

   - Open your web browser and go to `http://localhost:3001`.
   - You should see the homepage with options to register, login, view exercises, add exercises, and more.

4. **Register a New User:**

   - Click on the "Register" link in the navbar.
   - Fill in the required details and submit the form.
   - Upon successful registration, you can log in.

5. **Login:**

   - Click on the "Login" link in the navbar.
   - Enter your registered email and password to log in.
   - Upon successful login, a JWT token will be stored in local storage for authentication.

6. **Add a New Exercise:**

   - Click on the "Add Exercise" link in the navbar.
   - Fill in the exercise details and submit the form.
   - The new exercise should appear in the exercise list.

7. **View Exercises:**

   - Click on the "Exercises" link in the navbar.
   - You will see a list of all exercises added by the logged-in user.
   - You can edit or delete exercises from this list.

8. **View Total Exercise Duration:**

   - The total duration of all exercises will be displayed at the top of the exercise list.

## GitHub Repository

The project repository, including the detailed README with this proposal, can be found at: [GitHub Project Link](https://github.com/vtranuw/Personal-Fitness-Tracker-API)
