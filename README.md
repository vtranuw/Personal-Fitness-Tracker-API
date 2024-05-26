# Personal Fitness Tracker

## Project Update

### Completed Work

- **Project Setup**
  - Initialized the project with the necessary file structure.
  - Set up an Express server to handle API requests.
  - Established a connection to MongoDB using Mongoose.
  - Configured basic middleware for the server (e.g., body-parser, morgan).
  - Created a basic User model with authentication and authorization routes.
  - Implemented JWT-based authentication with the secret key.

### Work in Progress

- **CRUD Operations for Fitness Data**
  - Designing and implementing CRUD routes for tracking workouts and nutrition data.
  - Setting up Mongoose schemas for fitness-related data models.
- **Advanced MongoDB Functionalities**
  - Implementing text search, aggregations, and lookups for enhanced data querying.
- **API Testing**
  - Writing tests using Jest to ensure robust API functionality.
  - Aiming for test coverage greater than 80%.
- **Frontend Development**
  - Setting up a simple front-end using ReactJS with Vite.
  - Building components to interact with the API.
- **Documentation**
  - Creating comprehensive API documentation using Postman.
  - Adding more detailed comments and descriptions within the codebase.

### Next Steps

1. Complete the CRUD routes for fitness data.
2. Enhance the API with advanced MongoDB features.
3. Develop the frontend application with ReactJS.
4. Write and run tests to achieve the desired test coverage.
5. Finalize API documentation and create usage examples.

### Getting Started

1. Clone the repository:

   - git clone https://github.com/vtranuw/Personal-Fitness-Tracker-App.git
   - cd https://github.com/vtranuw/Personal-Fitness-Tracker-App.git

2. Install dependencies:
   - npm install
3. Set up environment variables:
   - Create a .env file in the root directory with the following content:
     - MONGO_URI=mongodb://localhost:27017/fitness-tracker
     - JWT_SECRET=myVerySecretKey042883
     - PORT=5001
4. Run the server:
   - npm start

## Project Overview

### Scenario

In today's fast-paced world, maintaining a healthy lifestyle is crucial. Many individuals struggle to keep track of their fitness activities and goals. The Personal Fitness Tracker API aims to provide a comprehensive solution for users to log, monitor, and analyze their fitness activities and progress.

### Problem Statement

The primary problem this project seeks to solve is the lack of a centralized, user-friendly platform for tracking fitness activities. Users need a reliable way to record their workouts, view their progress, and set fitness goals. This API will facilitate these needs by offering robust tracking, analysis, and user management features.

## Technical Components

### Routes

- **Authentication Routes:**

  - POST `/api/auth/register`: Register a new user.
  - POST `/api/auth/login`: Authenticate a user and return a JWT.

- **Profile Routes:**

  - GET `/api/profile`: Retrieve the logged-in user's profile.
  - PUT `/api/profile`: Update the logged-in user's profile.

- **Activity Routes:**
  - GET `/api/activities`: Retrieve all activities for the logged-in user.
  - POST `/api/activities`: Add a new activity for the logged-in user.
  - PUT `/api/activities/:id`: Update a specific activity.
  - DELETE `/api/activities/:id`: Delete a specific activity.
  - GET `/api/activities/search`: Search activities by type or date.

### Data Models

- **User Model:**

  - Attributes:
    - **Username:** A unique identifier for each user, required and indexed for uniqueness.
    - **Email:** A unique email address for each user, required and indexed for uniqueness.
    - **Password:** A securely hashed password.
    - **Fitness Goals:** An optional field for users to set and update their fitness goals.
  - Pre-save Middleware: Hashes the password before saving to ensure secure storage.
  - Methods: Includes a method to compare a given password with the hashed password for authentication.

- **Activity Model:**
  - Attributes:
    - **User:** Reference to the user who created the activity.
    - **Type:** The type of activity (e.g., running, swimming), required.
    - **Duration:** The duration of the activity, required.
    - **Date:** The date of the activity, required.
    - **Calories Burned:** Optional field for tracking calories burned.
  - Indexes: Text index on `type` and `date` for search functionality.

### External Data Sources

- No external data sources are currently planned. However, optional integration with external fitness APIs can be considered for future enhancements.

## Project Requirements Fulfillment

1. **Authentication and Authorization:**

   - Implemented using JWT for secure user authentication and authorization.

2. **Two sets of CRUD routes:**

   - User Profiles: Full CRUD operations.
   - Fitness Activities: Full CRUD operations.

3. **Indexes for performance and uniqueness:**

   - Unique indexes on `username` and `email` in the User model.
   - Text index on `type` and `date` fields in the Activity model.

4. **Advanced MongoDB feature:**

   - Text search implemented in activities.

5. **Thorough testing (coverage > 80%):**

   - Comprehensive tests using Jest and Supertest.

6. **API interaction demonstration:**

   - Postman collection provided.

7. **Simple front-end project (ReactJS):**
   - Basic React frontend to interact with the API.

## Timeline

| **Week** | **Tasks**                                                | **Deliverables**                                         |
| -------- | -------------------------------------------------------- | -------------------------------------------------------- |
| **1**    | - Set up project repo, MongoDB, and Express.             | - Basic project structure and initial DB setup.          |
|          | - Design and implement the database schema.              | - Database schema with necessary indexes.                |
|          | - Begin developing authentication mechanisms.            | - Partially completed authentication routes.             |
| **2**    | - Complete authentication with JWT tokens.               | - Fully functional authentication system.                |
|          | - Develop the first set of CRUD routes for profiles.     | - CRUD operations for user profiles.                     |
|          | - Start the second set of CRUD for fitness activities.   | - Initial CRUD operations for fitness activities.        |
| **3**    | - Finish CRUD routes for fitness activities.             | - Completion of CRUD operations for fitness activities.  |
|          | - Implement one advanced MongoDB feature.                | - Advanced MongoDB feature integrated.                   |
|          | - Start ReactJS front-end setup.                         | - Initial front-end setup and basic UI interactions.     |
| **4**    | - Review and optimize database indexes and queries.      | - Optimized backend with appropriate indexes.            |
|          | - Implement comprehensive tests for all routes.          | - Test suite with >80% coverage.                         |
|          | - Prepare Postman collection and finalize documentation. | - Complete Postman collection and project documentation. |

## GitHub Repository

The project repository, including the detailed README with this proposal, can be found at: [GitHub Project Link](https://github.com/vtranuw/Personal-Fitness-Tracker-API)
