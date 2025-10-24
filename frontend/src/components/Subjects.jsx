import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaGraduationCap, FaAtom, FaCalculator, FaGlobe, FaHistory, FaFlask, FaLanguage, FaMusic, FaCode, FaLeaf, FaSearch, FaArrowRight } from 'react-icons/fa';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from './Card';
import './Subjects.css';

const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Predefined subjects with topics and modules
  const subjects = [
    {
      id: '1',
      title: 'Mathematics',
      icon: <FaCalculator />,
      description: 'Explore the world of numbers, patterns, and problem-solving',
      category: 'STEM',
      topics: [
        { name: 'Algebra', modules: 5 },
        { name: 'Geometry', modules: 4 },
        { name: 'Calculus', modules: 3 },
        { name: 'Statistics', modules: 4 }
      ]
    },
    {
      id: '2',
      title: 'Physics',
      icon: <FaAtom />,
      description: 'Understand the fundamental laws that govern the universe',
      category: 'STEM',
      topics: [
        { name: 'Mechanics', modules: 4 },
        { name: 'Thermodynamics', modules: 3 },
        { name: 'Electromagnetism', modules: 5 },
        { name: 'Quantum Physics', modules: 3 }
      ]
    },
    {
      id: '3',
      title: 'Biology',
      icon: <FaLeaf />,
      description: 'Discover the science of life and living organisms',
      category: 'STEM',
      topics: [
        { name: 'Cell Biology', modules: 4 },
        { name: 'Genetics', modules: 5 },
        { name: 'Ecology', modules: 3 },
        { name: 'Human Anatomy', modules: 6 }
      ]
    },
    {
      id: '4',
      title: 'Chemistry',
      icon: <FaFlask />,
      description: 'Explore the composition, structure, and properties of matter',
      category: 'STEM',
      topics: [
        { name: 'Organic Chemistry', modules: 5 },
        { name: 'Inorganic Chemistry', modules: 4 },
        { name: 'Biochemistry', modules: 3 },
        { name: 'Analytical Chemistry', modules: 3 }
      ]
    },
    {
      id: '5',
      title: 'Computer Science',
      icon: <FaCode />,
      description: 'Learn programming, algorithms, and computational thinking',
      category: 'STEM',
      topics: [
        { name: 'Programming Fundamentals', modules: 6 },
        { name: 'Data Structures', modules: 4 },
        { name: 'Algorithms', modules: 5 },
        { name: 'Web Development', modules: 7 }
      ]
    },
    {
      id: '6',
      title: 'History',
      icon: <FaHistory />,
      description: 'Journey through time and understand human civilization',
      category: 'Humanities',
      topics: [
        { name: 'Ancient Civilizations', modules: 5 },
        { name: 'Medieval History', modules: 4 },
        { name: 'Modern History', modules: 6 },
        { name: 'World Wars', modules: 3 }
      ]
    },
    {
      id: '7',
      title: 'Geography',
      icon: <FaGlobe />,
      description: 'Explore the Earth\'s landscapes, environments, and societies',
      difficulty: 'Intermediate',
      category: 'Humanities',
      topics: [
        { name: 'Physical Geography', modules: 4 },
        { name: 'Human Geography', modules: 3 },
        { name: 'Cartography', modules: 2 },
        { name: 'Environmental Geography', modules: 5 }
      ]
    },
    {
      id: '8',
      title: 'Literature',
      icon: <FaBook />,
      description: 'Discover great works of fiction, poetry, and drama',
      category: 'Humanities',
      topics: [
        { name: 'Classical Literature', modules: 4 },
        { name: 'Modern Literature', modules: 5 },
        { name: 'Poetry', modules: 3 },
        { name: 'Drama', modules: 3 }
      ]
    },
    {
      id: '9',
      title: 'Languages',
      icon: <FaLanguage />,
      description: 'Learn new languages and explore linguistic structures',
      category: 'Humanities',
      topics: [
        { name: 'Spanish', modules: 8 },
        { name: 'French', modules: 8 },
        { name: 'German', modules: 7 },
        { name: 'Mandarin', modules: 10 }
      ]
    },
    {
      id: '10',
      title: 'Music Theory',
      icon: <FaMusic />,
      description: 'Understand the principles behind musical composition',
      category: 'Arts',
      topics: [
        { name: 'Rhythm and Meter', modules: 3 },
        { name: 'Harmony', modules: 4 },
        { name: 'Melody', modules: 3 },
        { name: 'Musical Forms', modules: 5 }
      ]
    }
  ];

  const uniqueCategories = [...new Set(subjects.map(subject => subject.category))];

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && subject.category.toLowerCase() === filter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading subjects and learning modules...</p>
      </div>
    );
  }

  return (
    <div className="subjects-container">
      <div className="subjects-header">
        <h2 className="section-title">
          <span className="section-icon"><FaGraduationCap /></span>
          Explore Our Subjects
        </h2>
        <p className="section-description">
          Discover a wide range of subjects with story-based explanations to enhance your learning experience.
        </p>
      </div>
      
      <div className="subjects-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search subjects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {uniqueCategories.map(category => (
            <button 
              key={category} 
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="subjects-grid">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <Card key={subject.id} className="subject-card">
              <CardHeader>
                <div className="subject-banner" style={{ background: getRandomColor(subject.id) }}>
                  <span className="subject-icon">{subject.icon}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle>{subject.title}</CardTitle>
                <p className="subject-description">{subject.description}</p>
                <div className="subject-topics">
                  <h4>Topics:</h4>
                  <ul className="topics-list">
                    {subject.topics.map((topic, index) => (
                      <li key={index} className="topic-item">
                        <span className="topic-name">{topic.name}</span>
                        <span className="topic-modules">{topic.modules} modules</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="subject-meta">
                  <span className="meta-tag category-tag">
                    <FaGraduationCap className="meta-icon" /> {subject.category}
                  </span>
                  <span className="meta-tag modules-tag">
                    <FaBook className="meta-icon" /> {subject.topics.reduce((sum, topic) => sum + topic.modules, 0)} Total Modules
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/subject/${subject.id}`} className="subject-action-btn">
                  Start Learning <FaArrowRight className="btn-icon" />
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="no-subjects">
            <p>No subjects found matching your search criteria.</p>
            <button className="reset-btn" onClick={() => {setSearchTerm(''); setFilter('all');}}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to generate consistent colors based on subject ID
const getRandomColor = (id) => {
  const colors = [
    'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', // Indigo
    'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', // Blue
    'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', // Purple
    'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', // Pink
    'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', // Amber
    'linear-gradient(135deg, #10B981 0%, #059669 100%)'  // Emerald
  ];
  
  const index = parseInt(id) % colors.length;
  return colors[index];
};

export default Subjects;
