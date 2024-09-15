import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBell, faFlag } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import the CSS file

const Header = ({ name, onBack }) => {
  return (
    <header className="header">
      <button className="flag-btn">
        <FontAwesomeIcon icon={faFlag} />
      </button>
      <h1 className="header-title">Venture</h1>
      <button className="notification-btn">
        <FontAwesomeIcon icon={faBell} />
      </button>
    </header>
  );
};

export default Header;
