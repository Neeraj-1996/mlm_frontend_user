import React from 'react';
import './Finance.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
const Finance = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
    <div className="containerFinance">
         <Header name="Finance" onBack={handleBackClick} />
      {/* Yellow Section */}
      <div className="yellow-section">
        <div className="card">
          <div className="card2">
            <div className="sub-card">
              <span>Total Assets</span>
              <span>0.00</span>
            </div>
            <div className="sub-card">
              <span>Financial</span>
              <span>0.00</span>
            </div>
          </div>
          <div className="card2">
            <div className="sub-card">
              <span>Total Profit</span>
              <span>0.00</span>
            </div>
            <div className="sub-card">
              <span>Yesterday's Earning</span>
              <span>0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gray Section */}
      <div className="gray-section">
      <div className="sub-card2">
              <span>+0.3</span>
              <span>1 day</span>
            </div>
        <div className="card1">
          <span>Balance transfer in</span>
          <input 
            type="text" 
            className="input-box" 
            placeholder="Enter the amount to be transferred" 
          />
          <span>Balance 27.943</span>
        </div>

        <div className="button-section">
        <button className="transfer-button">Transfer In</button>
        <button className="transfer-button">Transfer Out</button>
      </div>
      </div>


    </div>
  );
};

export default Finance;
