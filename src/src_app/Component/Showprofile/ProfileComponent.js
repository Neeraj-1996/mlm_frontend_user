import React from 'react';
import './ProfileComponent.css';

const ProfileComponent = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-item">
          <div className="profile-label">Head portrait</div>
          <div className="profile-value">
            <span className="profile-avatar">
              {/* Add your profile picture here */}
              <img
                src="C:\mlm project\mlm2\src\asset\images\profile.jpg"
                alt="Profile"
                className="avatar-img"
              />
            </span>
          </div>
        </div>

        <div className="profile-item">
          <div className="profile-label">Account</div>
          <div className="profile-value">IMRANKHAN</div>
        </div>

        <div className="profile-item">
          <div className="profile-label">Mobile number</div>
          <div className="profile-value">98******24</div>
        </div>

        <div className="profile-item clickable">
          <div className="profile-label">Withdrawal method</div>
        </div>

        <div className="profile-item clickable">
          <div className="profile-label">Login password</div>
        </div>

        <div className="profile-item clickable">
          <div className="profile-label">Transaction password</div>
        </div>

        <div className="profile-item clickable">
          <div className="profile-label">Email address</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
