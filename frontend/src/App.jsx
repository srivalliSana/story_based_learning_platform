import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import UserDashboard from './components/UserDashboard';
import StoryViewer from './components/StoryViewer';
import Subjects from './components/Subjects';
import SubjectViewer from './components/SubjectViewer';
import ModuleStories from './components/ModuleStories';
import Progress from './components/Progress';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                <Route path="/home" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                <Route path="/stories" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
                <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/story/:id" element={<ProtectedRoute><StoryViewer /></ProtectedRoute>} />
                <Route path="/subject/:id" element={<ProtectedRoute><SubjectViewer /></ProtectedRoute>} />
                <Route path="/subject/:subjectId/module/:moduleId/stories" element={<ProtectedRoute><ModuleStories /></ProtectedRoute>} />
                <Route path="/subject/:subjectId/module/:moduleId/story/:storyId" element={<ProtectedRoute><StoryViewer /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
