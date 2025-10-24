import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaBookOpen, FaLightbulb } from 'react-icons/fa';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from './Card';
import { getStoriesBySubjectAndModule } from '../data/mockStories';
import './ModuleStories.css';

const ModuleStories = () => {
  const { subjectId, moduleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState(null);
  const [module, setModule] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock data for demonstration
      const mockSubject = {
        id: subjectId,
        title: `Subject ${subjectId}`,
      };

      const mockModule = {
        id: moduleId,
        title: `Module ${moduleId}`,
      };

      // Get stories from our mock data
      const moduleStories = getStoriesBySubjectAndModule(subjectId, moduleId);

      setSubject(mockSubject);
      setModule(mockModule);
      setStories(moduleStories);
      setLoading(false);
    }, 1000);
  }, [subjectId, moduleId]);

  if (loading) {
    return (
      <div className="module-stories-container loading">
        <div className="loading-spinner"></div>
        <p>Loading stories...</p>
      </div>
    );
  }

  return (
    <div className="module-stories-container">
      <div className="module-stories-header">
        <Link to={`/subject/${subjectId}`} className="back-button">
          <FaArrowLeft /> Back to Subject
        </Link>
        <h1>{subject.title} - {module.title} Stories</h1>
        <p className="module-stories-description">
          Learn through engaging stories that explain concepts in a memorable way.
        </p>
      </div>

      <div className="stories-grid">
        {stories.map(story => (
          <Card key={story.id} className="story-card">
            <CardHeader>
              <div className="story-icon">
                <FaBookOpen />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>{story.title}</CardTitle>
              <p className="story-description">{story.description}</p>
              <div className="story-meta">
                <span className="meta-item">
                  <FaLightbulb /> {story.difficulty}
                </span>
                <span className="meta-item">
                  {story.readTime} read
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/subject/${subjectId}/module/${moduleId}/story/${story.id}`} className="read-story-btn">
                Read Story
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModuleStories;