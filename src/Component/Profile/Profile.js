import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Profile.css';  // Styling file


const Profile = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
    <div className="profile-container">
        <Header name="Profile" onBack={handleBackClick} />
      {/* First part: Profile Info */}
      <div className="profile-info">
        <div className="profile-photo-div">
          <img
            src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
            alt="Profile"
            className="profile-photo"
          />
        </div>
        <div className="profile-details">
          <h2>John Doe</h2>
          <p>Invitation Code: ABC123</p>
          {/* <span className="level">Bronze</span> */}
          <div class="level">Bronze</div>
        </div>
      </div>

      {/* Second part: Balance and buttons */}
      <div className="balance-section">
        <div className="Avail-bal">
          <h3>Available Balance</h3>
          <p>$500</p>
        </div>
        <div className="balance-buttons">
          <button onClick={() => navigate("/Deposit")}>Deposit</button>
          <button onClick={() => navigate("/Withdrawal")}>Withdrawal</button>
        </div>
      </div>

      {/* Third part: Cards */}
      <div className="cards-section-profile">
        <div className="cardProfile" onClick={() => navigate("/ProfileComponent")}>Personal Info</div>
        <div className="cardProfile" onClick={() => navigate("/OrderRecord")}>Order Record</div>
        <div className="cardProfile" onClick={() => navigate("/AccountDetail")}>Account Detail</div>
        <div className="cardProfile" onClick={() => navigate("/TeamReport")}>Team Report</div>
        <div className="cardProfile" onClick={() => navigate("/Announcement")}>Announcement</div>
        <div className="cardProfile" onClick={() => navigate("/FriendInvitation")}>Friend Invitation</div>
        <div className="cardProfile" onClick={() => navigate("/AppDownload")}>App Download</div>
        <div className="cardProfile" onClick={() => navigate("/HelpGuide")}>Help Guide</div>
        <div className="cardProfile" onClick={() => navigate("/UpdateCheck")}>Update Check</div>
      </div>
      <div className="card-margin-bottom"></div>
      <Footer />
    </div>
  );
};

export default Profile;
