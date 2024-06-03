const express = require("express");
const {
  getExercises,
  addExercise,
  updateExercise,
  deleteExercise,
  getTotalDuration,
} = require("../controllers/fitnessController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getExercises)
  .post(authMiddleware, addExercise);

router
  .route("/:id")
  .put(authMiddleware, updateExercise)
  .delete(authMiddleware, deleteExercise);

router.route("/totalDuration").get(authMiddleware, getTotalDuration);

module.exports = router;
