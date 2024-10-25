import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TeamReportScreen.css'; // Custom CSS for styling
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { width } from '@fortawesome/free-solid-svg-icons/faBuilding';
const TeamReportScreen = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [userData, setUserData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('level1');
  // const renderUsers = () => {
  //   return users[selectedLevel].map((user, index) => (
  //     <li key={index}>{user.name}</li>
  //   ));
  // };



  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "accessToken=token; refreshToken=YOUR_REFRESH_TOKEN");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    // Fetch user data when the component mounts
    fetch("http://localhost:9001/api/users/users-at-Level?user_id=RTBs5", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // or "multipart/form-data" if needed
      }})
        .then((response) => response.json()) // Use json() to parse the response
        .then((result) => {
            if (result.success) {
                setUserData(result.data); // Set the user data
            } else {
                console.error(result.message);
            }
        })
        .catch((error) => console.error(error));
}, []);

// Filter users based on selected level
const filteredUsers = userData.filter(user => {
    if (selectedLevel === 'level1') return user.level === 1;
    if (selectedLevel === 'level2') return user.level === 2;
    if (selectedLevel === 'level3') return user.level === 3;
    return false;
});

  const renderUsers = () => {
    return users[selectedLevel].map((user, index) => (
      <div key={index} className="user-card">
        <h3>{user.name}</h3>
        <p><strong>Wallet Balance:</strong> ${user.walletBalance}</p>
        <p><strong>Total Deposit:</strong> ${user.totalDeposit}</p>
        <p><strong>Total Withdrawal:</strong> ${user.totalWithdrawal}</p>
      </div>
    ));
  };
  

  const demoData = [
    { label: 'Team Balance', value: '0' },
    { label: 'Team Cash Flow', value: '0' },
    { label: 'Team Deposit', value: '0' },
    { label: 'Team Withdrawal', value: '0' },
    { label: 'Team order comission', value: '0' },
    { label: 'Fisrt time depositor', value: '0' },
    { label: 'First level member', value: '0' },
    { label: 'Team Size', value: '0' },
    { label: 'New Members today', value: '0' },
    { label: 'Active members day', value: '0' }
  ];

  // const users = {
  //   level1: [{ name: 'User 1' }, { name: 'User 2' }],
  //   level2: [{ name: 'User 3' }, { name: 'User 4' }, { name: 'User 5' }],
  //   level3: [{ name: 'User 6' }, { name: 'User 7' }, { name: 'User 8' }],

  // };
  const users = {
    level1: [
      { name: 'User 1', walletBalance: '500', totalDeposit: '1500', totalWithdrawal: '1000' },
      { name: 'User 2', walletBalance: '700', totalDeposit: '1700', totalWithdrawal: '1200' }
    ],
    level2: [
      { name: 'User 3', walletBalance: '800', totalDeposit: '1800', totalWithdrawal: '1100' },
      { name: 'User 4', walletBalance: '900', totalDeposit: '1900', totalWithdrawal: '1300' },
      { name: 'User 5', walletBalance: '600', totalDeposit: '1600', totalWithdrawal: '1400' }
    ],
    level3: [
      { name: 'User 6', walletBalance: '1000', totalDeposit: '2000', totalWithdrawal: '1500' },
      { name: 'User 7', walletBalance: '1100', totalDeposit: '2100', totalWithdrawal: '1600' },
      { name: 'User 8', walletBalance: '1200', totalDeposit: '2200', totalWithdrawal: '1700' }
    ]
  };
  


  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="team-report-container">
       <Header name="Team Report" onBack={handleBackClick} />
      {/* Date Filter Section */}
      <div className='team-container'>
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

      {/* <div className='team-container'>
      <div className="tabs">
                <button onClick={() => setSelectedLevel('level1')} className="tab">First Level</button>
                <button onClick={() => setSelectedLevel('level2')} className="tab">Second Level</button>
                <button onClick={() => setSelectedLevel('level3')} className="tab">Third Level</button>

            </div>
      <h2>Users for {selectedLevel.replace('level', 'Level ')}:</h2>
      <ul>
        {renderUsers()}
      </ul>
      </div> */}
       <div className='team-container'>
            <div className="tabs">
                <button onClick={() => setSelectedLevel('level1')} className="tab">First Level</button>
                <button onClick={() => setSelectedLevel('level2')} className="tab">Second Level</button>
                <button onClick={() => setSelectedLevel('level3')} className="tab">Third Level</button>
            </div>

            <div className="user-list">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <div key={user.user._id} className="user-card">
                            <h3>{user.user.username}</h3>
                            <p>Email: {user.user.email}</p>
                            <p>Mobile No: {user.user.mobileNo}</p>
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
