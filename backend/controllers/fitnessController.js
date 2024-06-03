const Fitness = require('../models/Fitness');

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Fitness.find({ user: req.user._id });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addExercise = async (req, res) => {
  try {
    const { exercise, duration } = req.body;
    const newExercise = new Fitness({
      user: req.user._id,
      exercise,
      duration,
    });
    const createdExercise = await newExercise.save();
    res.status(201).json(createdExercise);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExercise = async (req, res) => {
  try {
    const exercise = await Fitness.findById(req.params.id);
    if (exercise) {
      exercise.exercise = req.body.exercise || exercise.exercise;
      exercise.duration = req.body.duration || exercise.duration;
      const updatedExercise = await exercise.save();
      res.json(updatedExercise);
    } else {
      res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Fitness.findById(req.params.id);
    if (exercise) {
      await exercise.deleteOne();
      res.json({ message: 'Exercise removed' });
    } else {
      res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTotalDuration = async (req, res) => {
  try {
    const totalDuration = await Fitness.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$user', totalDuration: { $sum: '$duration' } } }
    ]);
    res.json(totalDuration);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};