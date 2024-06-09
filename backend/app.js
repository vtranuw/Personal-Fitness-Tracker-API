const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const fitnessRoutes = require("./routes/fitnessRoutes");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();
console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

app.use("/api/users", userRoutes);
app.use("/api/fitness", authMiddleware, fitnessRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
module.exports.connectDB = connectDB;
