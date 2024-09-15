import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import the CSS file

const Header = ({ name, onBack }) => {
  return (
    <header className="header">
      <button className="back-btn" onClick={onBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="header-title">{name}</h1>
    </header>
  );
};

export default Header;
