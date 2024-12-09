import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../Header/Header";
import './ProfileComponent.css';

const ProfileComponent = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem('profileImage') || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
  );

  const userName = localStorage.getItem('username');
  const userMobile = localStorage.getItem('mobileNo');
  const userEmail = localStorage.getItem('email');
  const handleBackClick = () => navigate(-1);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('mobileNo');
    localStorage.removeItem('userId');
    localStorage.removeItem('sharedId');
    navigate('/'); 
  };

  return (
    <div className="container">
   <Header name="Transaction" onBack={handleBackClick} />
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
    </div>
  );
};

export default ProfileComponent;
