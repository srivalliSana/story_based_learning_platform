import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaBookOpen, FaLightbulb, FaClipboardCheck } from 'react-icons/fa';
import Card from './Card';
import './SubjectViewer.css';

const SubjectViewer = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockSubject = {
        id,
        title: `Subject ${id}`,
        description: `Comprehensive learning materials for Subject ${id}`,
        modules: [
          {
            id: 1,
            title: 'Introduction',
            topics: [
              { id: 1, title: 'Overview', content: 'This module introduces the fundamental concepts of the subject.' },
              { id: 2, title: 'Key Principles', content: 'Learn about the core principles that govern this subject area.' }
            ]
          },
          {
            id: 2,
            title: 'Core Concepts',
            topics: [
              { id: 3, title: 'Theoretical Framework', content: 'Understand the theoretical underpinnings of this subject.' },
              { id: 4, title: 'Practical Applications', content: 'Explore how these concepts apply in real-world scenarios.' }
            ]
          },
          {
            id: 3,
            title: 'Advanced Topics',
            topics: [
              { id: 5, title: 'Current Research', content: 'Discover the latest research developments in this field.' },
              { id: 6, title: 'Future Directions', content: 'Learn about emerging trends and future directions in this subject area.' }
            ]
          }
        ]
      };
      setSubject(mockSubject);
      setActiveModule(mockSubject.modules[0]);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="subject-viewer-container loading">
        <div className="loading-spinner"></div>
        <p>Loading subject content...</p>
      </div>
    );
  }

  return (
    <div className="subject-viewer-container">
      <div className="subject-header">
        <Link to="/subjects" className="back-button">
          <FaArrowLeft /> Back to Subjects
        </Link>
        <h1>{subject.title}</h1>
        <p className="subject-description">{subject.description}</p>
      </div>

      <div className="subject-content">
        <div className="modules-sidebar">
          <h2>Modules</h2>
          <ul className="module-list">
            {subject.modules.map((module) => (
              <li 
                key={module.id} 
                className={activeModule && activeModule.id === module.id ? 'active' : ''}
                onClick={() => setActiveModule(module)}
              >
                <FaBookOpen className="module-icon" />
                {module.title}
                <Link 
                  to={`/subject/${id}/module/${module.id}/stories`} 
                  className="module-stories-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Stories
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="module-content">
          {activeModule ? (
            <>
              <h2 className="module-title">{activeModule.title}</h2>
              <div className="topics-container">
                {activeModule.topics.map((topic) => (
                  <Card key={topic.id} className="topic-card">
                    <div className="topic-header">
                      <FaLightbulb className="topic-icon" />
                      <h3>{topic.title}</h3>
                    </div>
                    <div className="topic-content">
                      <p>{topic.content}</p>
                    </div>
                    <div className="topic-footer">
                      <button className="complete-button">
                        <FaClipboardCheck /> Mark as Complete
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="no-module-selected">
              <p>Select a module to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectViewer;