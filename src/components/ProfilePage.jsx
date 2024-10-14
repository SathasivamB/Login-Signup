import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Web Developer at XYZ Company.',
    picture: 'https://via.placeholder.com/150'
  });

  const [editProfile, setEditProfile] = useState(profile);
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const [newPicture, setNewPicture] = useState(null); // State to handle new picture

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
    if (newPicture) {
      setProfile(prev => ({ ...prev, picture: URL.createObjectURL(newPicture) })); // Update profile picture
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPicture(file); // Store the new picture in state
    }
  };

  return (
    <animated.div style={springProps} className="profile-container">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="profile-header"
      >
        <img src={profile.picture} alt="Profile" className="profile-picture" />
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="change-picture"
        >
          <label htmlFor="upload-button" style={{ cursor: 'pointer' }}>
            Change Picture
          </label>
          <input 
            id="upload-button" 
            type="file" 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={handlePictureChange} // Handle picture change
          />
        </motion.div>
      </motion.div>

      <div className="profile-info">
        {isEditing ? (
          <>
            <input 
              type="text" 
              value={editProfile.name} 
              onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
            />
            <input 
              type="email" 
              value={editProfile.email} 
              onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
            />
            <textarea 
              value={editProfile.bio} 
              onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
            >
              Save
            </motion.button>
          </>
        ) : (
          <>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <p>{profile.bio}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </motion.button>
          </>
        )}
      </div>
    </animated.div>
  );
};

export default ProfilePage;
