const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  culture: { type: String }, // e.g., 'African', 'Asian', etc.
  languages: {
    en: {
      title: String,
      description: String,
      nodes: {
        type: Map,
        of: {
          text: String,
          choices: [{
            text: String,
            nextNode: String,
            emotionalImpact: String // e.g., 'happy', 'sad'
          }],
          learningModule: String // Interactive content
        }
      },
      startNode: String
    },
    es: { /* similar structure */ },
    fr: { /* similar structure */ }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);
