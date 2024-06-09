const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5002;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
