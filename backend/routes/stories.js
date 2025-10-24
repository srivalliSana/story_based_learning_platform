const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// GET all stories
router.get('/', async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const stories = await Story.find({});
    const localizedStories = stories.map(story => ({
      id: story._id,
      title: story.languages[lang]?.title || story.title,
      description: story.languages[lang]?.description || story.description,
      culture: story.culture
    }));
    res.json(localizedStories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET story by ID
router.get('/:id', async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });
    const localizedStory = {
      id: story._id,
      title: story.languages[lang]?.title || story.title,
      description: story.languages[lang]?.description || story.description,
      culture: story.culture,
      nodes: story.languages[lang]?.nodes || {},
      startNode: story.languages[lang]?.startNode || 'start'
    };
    res.json(localizedStory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
