const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET progress for user
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST update progress
router.post('/', auth, async (req, res) => {
  try {
    const { storyId, choiceId, nodeId, timeSpent, chaptersRead } = req.body;
    let progress = await Progress.findOne({ user: req.user, story: storyId });
    if (!progress) {
      progress = new Progress({ user: req.user, story: storyId });
    }
    if (choiceId !== undefined && nodeId) {
      progress.choices.push({ node: nodeId, choiceId });
      progress.currentNode = nodeId;
    }
    if (timeSpent !== undefined) {
      progress.timeSpent += timeSpent; // Accumulate time
    }
    if (chaptersRead !== undefined) {
      progress.chaptersRead = Math.max(progress.chaptersRead, chaptersRead); // Update to max
    }
    // Calculate completion based on chapters read (assuming 5 chapters per story)
    progress.completion = Math.min((progress.chaptersRead / 5) * 100, 100);
    // Update emotional state based on choice (simplified)
    progress.emotionalState = 'happy'; // Logic to determine
    progress.updatedAt = Date.now();
    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET daily progress stats
router.get('/stats', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayProgress = await Progress.find({
      user: req.user,
      date: { $gte: today }
    });

    const yesterdayProgress = await Progress.find({
      user: req.user,
      date: { $gte: yesterday, $lt: today }
    });

    const todayTime = todayProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    const yesterdayTime = yesterdayProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);

    res.json({
      todayTime,
      yesterdayTime,
      progress: todayProgress
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
