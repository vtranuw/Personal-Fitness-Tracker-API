const mongoose = require('mongoose');

const fitnessSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exercise: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Fitness = mongoose.model('Fitness', fitnessSchema);

module.exports = Fitness;
