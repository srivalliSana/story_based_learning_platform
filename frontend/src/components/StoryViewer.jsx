import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaBookOpen, FaHistory, FaStar } from 'react-icons/fa';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from './Card';
import './StoryViewer.css';
import { getStoryById } from '../data/mockStories';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const StoryViewer = () => {
  const { storyId, subjectId, moduleId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    fetchStory();
  }, [storyId]);

  useEffect(() => {
    if (!story || !user) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 60000); // in minutes
      if (timeSpent > 0) {
        axios.post('/api/progress', { storyId, timeSpent, chaptersRead: 1 }).catch(err => console.error('Error updating progress:', err));
      }
    }, 30000); // Update every 30 seconds

    return () => {
      clearInterval(interval);
      const timeSpent = Math.floor((Date.now() - startTime) / 60000); // in minutes
      if (timeSpent > 0) {
        axios.post('/api/progress', { storyId, timeSpent, chaptersRead: 1 }).catch(err => console.error('Error updating progress:', err));
      }
    };
  }, [story, storyId, user]);

  const fetchStory = () => {
    try {
      // Use mock data instead of API call
      const storyData = getStoryById(subjectId, moduleId, storyId);
      
      if (storyData) {
        // Create a simple story structure for display
        const formattedStory = {
          title: storyData.title,
          description: storyData.description,
          content: storyData.content,
          readTime: storyData.readTime,
          difficulty: storyData.difficulty,
          nodes: {
            "start": {
              text: storyData.content,
              choices: {}
            }
          },
          startNode: "start"
        };
        
        setStory(formattedStory);
      } else {
        console.error('Story not found in mock data');
      }
    } catch (error) {
      console.error('Error fetching story:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChoice = (choiceId) => {
    // For mock data, we don't need to save progress
    console.log('Choice selected:', choiceId);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading your adventure...</p>
    </div>
  );

  if (!story) return (
    <div className="error-container">
      <p>Story not found. Please try another story.</p>
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> <span>Go Back</span>
      </button>
    </div>
  );

  const currentNode = story.startNode;
  const node = story.nodes[currentNode];

  return (
    <div className="story-viewer-container">
      <div className="story-controls">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> <span>Back</span>
        </button>
      </div>
      
      <Card className="story-card">
        <CardHeader>
          <CardTitle>
            <FaBookOpen className="story-icon" /> {story.title}
          </CardTitle>
          <div className="story-meta">
            <span className="story-badge">
              <FaHistory /> {story.readTime}
            </span>
            <span className="story-badge">
              {story.difficulty}
            </span>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="story-node">
            <p className="story-text">{node.text}</p>
          </div>
        </CardContent>
        
        <CardFooter>
          <button onClick={() => navigate(-1)} className="primary-button">
            Back to Stories
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StoryViewer;
