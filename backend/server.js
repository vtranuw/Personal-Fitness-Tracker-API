const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Debug log
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debug log

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process with failure
  });
