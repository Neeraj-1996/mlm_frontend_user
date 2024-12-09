import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomDropdownHome from "./Flag";
import { useNavigate } from "react-router-dom";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { countries } from "../../asset/data";

import { fetchNotificationCount } from "../Navigation/Allapi";
const Header = ({ name, onBack }) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    loadNotificationCount();
  }, []);

  const loadNotificationCount = async () => {
    try {
      const unreadCount = await fetchNotificationCount();
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <div className="dropdown-container">
        <CustomDropdownHome
          countries={countries}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
      </div>
      <h1 className="header-title">Vortex Vantures</h1>
      <button
        className="notification-btn"
        onClick={() => navigate("/Notifications")}
      >
        <FontAwesomeIcon icon={faBell} />
        {notificationCount > 0 && (
          <span className="notification-badge">{notificationCount}</span>
        )}
      </button>
    </header>
  );
};

export default Header;
