const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
  currentNode: { type: String, default: 'start' },
  choices: [{ node: String, choiceId: Number }],
  emotionalState: { type: String, default: 'neutral' },
  completion: { type: Number, default: 0 }, // percentage
  timeSpent: { type: Number, default: 0 }, // in minutes
  chaptersRead: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }, // for daily tracking
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', progressSchema);
