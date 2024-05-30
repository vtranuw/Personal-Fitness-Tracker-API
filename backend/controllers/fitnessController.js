const Fitness = require('../models/Fitness');

exports.getExercises = async (req, res) => {
  const exercises = await Fitness.find({ user: req.user._id });
  res.json(exercises);
};

exports.addExercise = async (req, res) => {
  const { exercise, duration } = req.body;

  const newExercise = new Fitness({
    user: req.user._id,
    exercise,
    duration,
  });

  const createdExercise = await newExercise.save();
  res.status(201).json(createdExercise);
};

exports.updateExercise = async (req, res) => {
  const exercise = await Fitness.findById(req.params.id);

  if (exercise) {
    exercise.exercise = req.body.exercise || exercise.exercise;
    exercise.duration = req.body.duration || exercise.duration;

    const updatedExercise = await exercise.save();
    res.json(updatedExercise);
  } else {
    res.status(404).json({ message: 'Exercise not found' });
  }
};

exports.deleteExercise = async (req, res) => {
  const exercise = await Fitness.findById(req.params.id);

  if (exercise) {
    await exercise.remove();
    res.json({ message: 'Exercise removed' });
  } else {
    res.status(404).json({ message: 'Exercise not found' });
  }
};
