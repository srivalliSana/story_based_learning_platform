import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrophy, FaBookOpen, FaClock, FaStar } from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import './Progress.css';

const Progress = () => {
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState({
    totalStories: 0,
    completedStories: 0,
    totalTime: 0,
    averageScore: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('/api/progress');
        setProgress(response.data);
        calculateStats(response.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const calculateStats = (progressData) => {
    const totalStories = progressData.length;
    const completedStories = progressData.filter(p => p.completed).length;
    const totalTime = progressData.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    const averageScore = progressData.length > 0
      ? progressData.reduce((sum, p) => sum + (p.score || 0), 0) / progressData.length
      : 0;

    setStats({
      totalStories,
      completedStories,
      totalTime,
      averageScore: Math.round(averageScore)
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading your progress...</p>
      </div>
    );
  }

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h2><FaTrophy /> Your Learning Progress</h2>
        <p>Track your journey through our story-based learning platform.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FaBookOpen className="stat-icon" />
          <div className="stat-content">
            <h3>{stats.totalStories}</h3>
            <p>Total Stories</p>
          </div>
        </div>
        <div className="stat-card">
          <FaTrophy className="stat-icon" />
          <div className="stat-content">
            <h3>{stats.completedStories}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <FaClock className="stat-icon" />
          <div className="stat-content">
            <h3>{Math.round(stats.totalTime / 60)}m</h3>
            <p>Time Spent</p>
          </div>
        </div>
        <div className="stat-card">
          <FaStar className="stat-icon" />
          <div className="stat-content">
            <h3>{stats.averageScore}%</h3>
            <p>Average Score</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <h3>Progress Visualization</h3>
        <div className="charts-grid">
          <div className="chart-container">
            <h4>Completion Status</h4>
            <PieChart width={300} height={300}>
              <Pie
                data={[
                  { name: 'Completed', value: stats.completedStories, fill: '#4CAF50' },
                  { name: 'In Progress', value: stats.totalStories - stats.completedStories, fill: '#FFC107' }
                ]}
                cx={150}
                cy={150}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#4CAF50" />
                <Cell fill="#FFC107" />
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="chart-container">
            <h4>Time Spent by Story</h4>
            <BarChart width={400} height={300} data={progress.map(p => ({ name: `Story ${p._id.slice(-4)}`, time: p.timeSpent || 0 }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="time" fill="#8884d8" />
            </BarChart>
          </div>

          <div className="chart-container">
            <h4>Daily Learning Comparison</h4>
            <LineChart width={400} height={300} data={[
              { day: 'Yesterday', time: 0 }, // This would be fetched from stats
              { day: 'Today', time: stats.totalTime }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="time" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
      </div>

      <div className="progress-list">
        <h3>Story Progress</h3>
        {progress.map((item) => (
          <div key={item._id} className="progress-item">
            <div className="progress-info">
              <h4>Story {item._id.slice(-4)}</h4>
              <div className="progress-meta">
                <span>Progress: {item.completion || 0}%</span>
                <span>Time: {Math.round((item.timeSpent || 0) / 60)}m</span>
                <span>Chapters: {item.chaptersRead || 0}/5</span>
              </div>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${item.completion || 0}%` }}
              ></div>
            </div>
            {(item.completion || 0) >= 100 && <FaTrophy className="completed-icon" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
