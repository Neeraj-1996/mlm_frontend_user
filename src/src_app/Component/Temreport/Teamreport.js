import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TeamReportScreen.css"; // Custom CSS for styling
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import baseUrlapp from "../Url/Urlapp";
import mainlUrl from "../Url/MainUrl";
import axios from "axios";
// import { width } from "@fortawesome/free-solid-svg-icons/faBuilding";
const TeamReportScreen = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [userData, setUserData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("level1");
  const [levelOneCount, setLevelOneCount] = useState(0); 


  const [demoData, setDemoData] = useState([
    { label: "Team Balance", value: "0" },
    { label: "Team Cash Flow", value: "0" },
    { label: "Team Deposit", value: "0" },
    { label: "Team Withdrawal", value: "0" },
    { label: "Team order comission", value: "0" },
    { label: "First time depositor", value: "0" },
    { label: "First level member", value: "0" },
    { label: "Team Size", value: "0" },
    { label: "New Members today", value: "0" },
    { label: "Active members day", value: "0" },
  ]);

  useEffect(() => {
    getUsersAtLevel();
    getLevelTeamData()
  }, []);

  
  const getUsersAtLevel = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken"); // Get the token from localStorage
  
    // Set up headers with the token
    const headers = {
      "Authorization": `Bearer ${token}`, 
      "Content-Type": "application/json", // Optional, but often good to include
    };
  
    try {
      // Make the GET request using Axios
      const response = await axios.get(`${mainlUrl}users/users-at-Level?userId=${userId}`, {
        headers: headers,
      });
  
      // Handle the response
      console.log(response.data);
      setUserData(response.data);
      const levelOneUsers = response.data.filter(user => user.level === 1);
      setLevelOneCount(levelOneUsers.length);
    } catch (error) {
      console.error("Error fetching users at level:", error);
    }
  };

  console.log("userData",userData);
  const getLevelTeamData = async () => {
  
    const token = localStorage.getItem("accessToken"); 
    const userId = localStorage.getItem("userId");
  
    // Set up headers with the token
    const headers = {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json", 
    };
  
    try {
      // Make the GET request using Axios
      const response = await axios.get(`${mainlUrl}team/getTeamDataByDate?user_id=${userId}`, {
        headers: headers,
      });

      const data = response.data;

      // Map the API response to the demoData structure
      const updatedDemoData = [
        { label: "Team Balance", value: data.teamBalance?.toFixed(2) || "0" },
        { label: "Team Cash Flow", value: data.teamCredit?.toFixed(2) || "0" },
        { label: "Team Deposit", value: data.teamCredit?.toFixed(2) || "0" },
        { label: "Team Withdrawal", value: data.teamWithdraw?.toFixed(2) || "0" },
        { label: "Team order comission", value: data.teamOrderCommission?.toFixed(2) || "0" },
        { label: "First time depositor", value: data.firstTimeDepositors || "0" },
        { label: "First level member", value: levelOneCount || "0" },
        { label: "Team Size", value: data.teamSize || "0" },
        { label: "New Members today", value: "0" },
        { label: "Active members day", value: "0" }, 
      ];

      setDemoData(updatedDemoData);
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };
  // Filter users based on selected level
  const filteredUsers = userData.filter((user) => {
    if (selectedLevel === "level1") return user.level === 1;
    if (selectedLevel === "level2") return user.level === 2;
    if (selectedLevel === "level3") return user.level === 3;
    return false;
  });

  // const demoData = [
  //   { label: "Team Balance", value: "0" },
  //   { label: "Team Cash Flow", value: "0" },
  //   { label: "Team Deposit", value: "0" },
  //   { label: "Team Withdrawal", value: "0" },
  //   { label: "Team order comission", value: "0" },
  //   { label: "Fisrt time depositor", value: "0" },
  //   { label: "First level member", value: "0" },
  //   { label: "Team Size", value: "0" },
  //   { label: "New Members today", value: "0" },
  //   { label: "Active members day", value: "0" },
  // ];

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="team-report-container">
      <Header name="Team Report" onBack={handleBackClick} />
      {/* Date Filter Section */}
      <div className="team-container">
        <div className="date-filter-container">
          <div className="date-picker">
            <label>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="custom-date-picker"
              popperClassName="custom-datepicker-popper"
            />
          </div>
          <div className="date-picker">
            <label>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="custom-date-picker"
              popperClassName="custom-datepicker-popper"
            />
          </div>
        </div>

        <div className="cards-containerTeam">
          {demoData.map((item, index) => (
            <div className="cardTeam" key={index}>
              <div className="card-label">{item.label}</div>
              <div className="card-value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="team-container">
        <div className="tabs">
          <button onClick={() => setSelectedLevel("level1")} className="tab">
            First Level
          </button>
          <button onClick={() => setSelectedLevel("level2")} className="tab">
            Second Level
          </button>
          <button onClick={() => setSelectedLevel("level3")} className="tab">
            Third Level
          </button>
        </div>

        <div className="user-list">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user._id} className="user-card">
                <h3>{user.username}</h3>
                <p>Email: {user.email}</p>
                <p>Mobile No: {user.mobileNo}</p>
                <p>Balance: {user.walletBalance}</p>
              </div>
            ))
          ) : (
            <p>No users found for this level.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamReportScreen;
