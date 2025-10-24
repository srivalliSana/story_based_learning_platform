import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaCalendar, FaEdit, FaSave } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    language: user?.language || 'en'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setError('');
      const { username, firstName, lastName, bio, language } = formData;
      await updateUser({ username, firstName, lastName, bio, language });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Error updating profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      bio: user?.bio || '',
      language: user?.language || 'en'
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2><FaUser /> Your Profile</h2>
        <p>Manage your account information and preferences.</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <FaUser size={60} />
        </div>

        <div className="profile-content">
          <div className="profile-actions">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  <FaSave /> Save
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
              </div>
            )}
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="profile-fields">
            <div className="field-group">
              <label>Username</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{user?.username}</p>
              )}
            </div>

            <div className="field-group">
              <label>Email</label>
              <p><FaEnvelope /> {user?.email}</p>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label>First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user?.firstName || 'Not set'}</p>
                )}
              </div>

              <div className="field-group">
                <label>Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user?.lastName || 'Not set'}</p>
                )}
              </div>
            </div>

            <div className="field-group">
              <label>Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p>{user?.bio || 'No bio yet.'}</p>
              )}
            </div>

            <div className="field-group">
              <label>Preferred Language</label>
              {isEditing ? (
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              ) : (
                <p>{user?.language === 'en' ? 'English' : user?.language === 'es' ? 'Spanish' : user?.language === 'fr' ? 'French' : 'German'}</p>
              )}
            </div>

            <div className="field-group">
              <label>Member Since</label>
              <p><FaCalendar /> {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
