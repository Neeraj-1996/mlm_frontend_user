import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './ProfileComponent.css';

const ProfileComponent = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem('profileImage') || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
  );

  const userName = localStorage.getItem('username');
  const userMobile = localStorage.getItem('mobileNo');
  const userEmail = localStorage.getItem('email');

  const handleLogout = () => {
    // Clear all local storage items
    localStorage.clear();

    // Navigate to the login page
    navigate('/'); 
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-item">
          <div className="profile-label">Head portrait</div>
          <div className="profile-value">
            <span className="profile-avatar">
              <img src={profileImage} alt="Profile" className="profile-photo" />
            </span>
          </div>
        </div>

        <div className="profile-item">
          <div className="profile-label">Account</div>
          <div className="profile-value">{userName}</div>
        </div>

        <div className="profile-item">
          <div className="profile-label">Mobile number</div>
          <div className="profile-value">{userMobile}</div>
        </div>
        
        <div className="profile-item">
          <div className="profile-label">Email address</div>
          <div className="profile-value">{userEmail}</div>
        </div>

        {/* Logout Button */}
        <div className="profile-item">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
