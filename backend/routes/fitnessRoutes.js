const express = require('express');
const {
  getExercises,
  addExercise,
  updateExercise,
  deleteExercise,
} = require('../controllers/fitnessController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(authMiddleware, getExercises)
  .post(authMiddleware, addExercise);

router.route('/:id')
  .put(authMiddleware, updateExercise)
  .delete(authMiddleware, deleteExercise);

module.exports = router;
