import React, { useState ,useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import baseWallet from "../../../src_admin/screen/urlWallet";
import baseUrlapp from "../Url/Urlapp";
import ImageModal from "./Profilemodel";
import './Profile.css';  // Styling file


const Profile = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  const [isModalOpen, setModalOpen] = useState(false);
  // const [profileImage, setProfileImage] = useState("https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png");
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem('profileImage') || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
  );


  const mobileNo = localStorage.getItem("mobileNo");
  const username = localStorage.getItem("username");
  const ShareId = localStorage.getItem("sharedId");
  // const userId = localStorage.getItem("userId");
  const handleImageSelect = (image) => {
    setProfileImage(image);
    localStorage.setItem('profileImage', image); // Update the profile image
    setModalOpen(false); // Close the modal
  };

  useEffect(() => {
    getUserLevel();
    // Check for existing image in local storage when the component mounts
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }

  }, []);

  const imageAssets = Array.from({ length: 20 }, (_, i) =>
     require(`../../asset/avatar/${i + 1}.jpeg`)); // Update path as needed

  const [balance, setBalance] = useState(0);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`${baseWallet}balanceUser?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });

        if (response.data.success) {
          setBalance(response.data.data.balance);
          // setTransactions(response.data.data.transactions);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } 
    };

    fetchTransactions();
  }, []);

  const [shareCount, setShareCount] = useState(0);
  const [activePlanTitle, setActivePlanTitle] = useState(0);
  const getUserLevel = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");

    try {
      // Make the GET request using Axios
      const response = await axios.get(`${baseUrlapp}getUserLevel?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

      // Extract the values and update state
      const userData = response.data.data;
      setShareCount(userData.shareCount); // Set share count
      setActivePlanTitle(userData.activePlan.title); // Set active plan title
      console.log("User level data:", userData);
    } catch (error) {
      console.error("Error fetching user level:", error);
    }
  };

  return (
    <div className="profile-container1">
        <Header name="Profile" onBack={handleBackClick} />
      {/* First part: Profile Info */}
      <div className="cardp">
      <div className="profile-info">
          <div className="profile-photo-div" onClick={() => setModalOpen(true)}>
            <img src={profileImage} alt="Profile" className="profile-photo" />
          </div>
          <div className="profile-details">
            <h2>{username}</h2>
            <p>Invitation Code: {userId}</p>
            <p>Share Count: {shareCount}</p>
          
            <div className="level">{activePlanTitle}</div>
          </div>
        </div>


      {/* Second part: Balance and buttons */}
      <div className="balance-section">
        <div className="Avail-bal">
          <h3>Available Balance</h3>
          <p style={{ marginLeft: "10px", fontSize: '20px' }}>{balance.toFixed(2)}</p>

        </div>
        <div className="balance-buttons">
          <button  className="depositp" onClick={() => navigate("/Deposit")}>Deposit</button>
          <button  className="depositp" onClick={() => navigate("/Withdrawal")}>Withdrawal</button>
        </div>
      </div>

      {/* Third part: Cards */}
      <div className="cards-section-profile">
        <div className="cardProfile" onClick={() => navigate("/ProfileComponent")}>Personal Info</div>
        <div className="cardProfile" onClick={() => navigate("/OrderDetail")}>Order Record</div>
        <div className="cardProfile" onClick={() => navigate("/Transaction")}>Account Detail</div>
        <div className="cardProfile" onClick={() => navigate("/TeamReportScreen")}>Team Report</div>
        <div className="cardProfile" onClick={() => navigate("/VIPEvents")}>Announcement</div>
        <div className="cardProfile" onClick={() => navigate("/InviteScreen")}>Friend Invitation</div>
        <div className="cardProfile" onClick={() => navigate("/AppDownload")}>App Download</div>
        <div className="cardProfile" onClick={() => navigate("/TutorialScreen")}>Help Guide</div>
        <div className="cardProfile" onClick={() => navigate("/UpdateCheck")}>Update Check</div>
      </div>
      <div className="card-margin-bottom"></div>
      </div>

      <ImageModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        images={imageAssets} 
        onImageSelect={handleImageSelect} 
      />

      <Footer />
    </div>
  );
};

export default Profile;
