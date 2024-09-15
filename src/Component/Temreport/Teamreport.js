import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TeamReportScreen.css'; // Custom CSS for styling
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
const TeamReportScreen = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [selectedLevel, setSelectedLevel] = useState('level1');
  const renderUsers = () => {
    return users[selectedLevel].map((user, index) => (
      <li key={index}>{user.name}</li>
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

  const users = {
    level1: [{ name: 'User 1' }, { name: 'User 2' }],
    level2: [{ name: 'User 3' }, { name: 'User 4' }, { name: 'User 5' }],
    level3: [{ name: 'User 6' }, { name: 'User 7' }, { name: 'User 8' }],
    level4: [{ name: 'User 9' }, { name: 'User 10' }],
    level5: [{ name: 'User 11' }, { name: 'User 12' }]
  };


  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="team-report-container">
       <Header name="Team Report" onBack={handleBackClick} />
      {/* Date Filter Section */}
      <div className="date-filter-container">
        <div className="date-picker">
          <label>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="date-picker">
          <label>End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* Team Report Cards */}
      <div className="cards-container">
        {demoData.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-label">{item.label}</div>
            <div className="card-value">{item.value}</div>
          </div>
        ))}
      </div>

      <div style={styles.tabs}>
        <button onClick={() => setSelectedLevel('level1')} style={styles.tab}>First Level</button>
        <button onClick={() => setSelectedLevel('level2')} style={styles.tab}>Second Level</button>
        <button onClick={() => setSelectedLevel('level3')} style={styles.tab}>Third Level</button>
        <button onClick={() => setSelectedLevel('level4')} style={styles.tab}>Fourth Level</button>
        <button onClick={() => setSelectedLevel('level5')} style={styles.tab}>Fifth Level</button>
      </div>
      <h2>Users for {selectedLevel.replace('level', 'Level ')}:</h2>
      <ul>
        {renderUsers()}
      </ul>
    </div>
  );
};

const styles = {
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    background: 'lightblue',
    border: 'none',
    borderRadius: '5px',
  }
};

export default TeamReportScreen;
