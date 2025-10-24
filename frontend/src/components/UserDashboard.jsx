import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import {
  FaBook,
  FaTrophy,
  FaUsers,
  FaGlobe,
  FaPlay,
  FaChartLine,
  FaUser,
  FaBookOpen,
  FaLightbulb,
  FaRocket,
  FaArrowRight,
  FaRegClock,
  FaRegCalendarAlt,
  FaRegStar
} from 'react-icons/fa';
import './UserDashboard.css';

const UserDashboard = () => {
  const { t, i18n } = useTranslation();
  const { user } = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState({
    totalStories: 0,
    completedStories: 0,
    totalTime: 0,
    totalChapters: 0
  });
  const [language, setLanguage] = useState(i18n.language);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchStories(), fetchUserProgress()]);
      setIsLoading(false);
    };

    fetchData();

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchUserProgress();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [language]);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`/api/stories?lang=${language}`);
      setStories(response.data.slice(0, 6)); // Show first 6 stories
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const response = await axios.get('/api/progress');
      setProgress(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const calculateStats = (progressData) => {
    const totalStories = progressData.length;
    const completedStories = progressData.filter(p => p.completed).length;
    const totalTime = progressData.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    const totalChapters = progressData.reduce((sum, p) => sum + (p.chaptersRead || 0), 0);

    setStats({
      totalStories,
      completedStories,
      totalTime,
      totalChapters
    });
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  // Format minutes into hours and minutes
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to StoryScape, <span className="highlight">{user?.username || user?.email}</span>!
            </h1>
            <p className="hero-subtitle">
              Your gateway to immersive, emotion-driven learning through storytelling.
            </p>
            <Link to="/stories" className="hero-cta">
              <span>Explore Stories</span>
              <FaArrowRight className="icon-right" />
            </Link>
          </div>

          <div className="stats-cards">
            <div className="stat-card">
              <FaBookOpen className="section-icon" />
              <div className="stat-content">
                <h3>{stats.totalStories}</h3>
                <p>Stories Started</p>
              </div>
            </div>

            <div className="stat-card">
              <FaTrophy className="section-icon" />
              <div className="stat-content">
                <h3>{stats.completedStories}</h3>
                <p>Completed</p>
              </div>
            </div>

            <div className="stat-card">
              <FaRegClock className="section-icon" />
              <div className="stat-content">
                <h3>{formatTime(stats.totalTime)}</h3>
                <p>Learning Time</p>
              </div>
            </div>

            <div className="stat-card">
              <FaBook className="section-icon" />
              <div className="stat-content">
                <h3>{stats.totalChapters}</h3>
                <p>Chapters Read</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">
          <FaLightbulb className="section-icon" />
          <span>Why StoryScape Works</span>
        </h2>
        <div><br></br></div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaBook />
            </div>
            <h3>Interactive Stories</h3>
            <p>Engage with culturally diverse narratives that adapt to your choices and learning pace.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaGlobe />
            </div>
            <h3>Multi-Language Support</h3>
            <p>Learn in your preferred language with stories from around the world.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaChartLine />
            </div>
            <h3>Track Your Progress</h3>
            <p>Monitor your learning journey and celebrate your achievements.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaRocket />
            </div>
            <h3>Accelerated Learning</h3>
            <p>Emotional connections in stories help you remember vocabulary and cultural contexts.</p>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="section-spacer"></div>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <h2 className="section-title">
          <FaPlay className="section-icon" />
          <span>Continue Your Journey</span>
        </h2>
        <div><br></br></div>

        <div className="actions-grid">
          <Link to="/subjects" className="action-card">
            <FaBook className="action-icon" />
            <h3>Browse Subjects</h3>
            <p>Explore our collection of interactive learning subjects</p>
          </Link>
          <Link to="/progress" className="action-card">
            <FaChartLine className="action-icon" />
            <h3>View Progress</h3>
            <p>Check your learning achievements</p>
          </Link>
          <Link to="/profile" className="action-card">
            <FaUser className="action-icon" />
            <h3>Update Profile</h3>
            <p>Manage your account settings</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
