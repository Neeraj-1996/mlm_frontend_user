import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faUsers, faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { fetchUnreadMessageCount } from '../Navigation/Allapi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; 

const Footer = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const isActive = (path) => location.pathname === path; 
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    loadNotificationCount();
  }, []);

  const loadNotificationCount = async () => {
    try {
      const unreadCount = await fetchUnreadMessageCount();
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error(error);
    }
  };

 
  return (
    <footer className="footer">
      <div
        className={`footerItem ${isActive('/HomePage') ? 'activeTint' : ''}`}
        onClick={() => navigate('/HomePage')}
      >
        <FontAwesomeIcon icon={faHome} size="lg" />
        <h6>Home</h6>
      </div>
      <div
        className={`footerItem ${isActive('/order') ? 'activeTint' : ''}`}
        onClick={() => navigate('/Order')}
      >
        <FontAwesomeIcon icon={faBox} size="lg" />
        <h6>Order</h6>
      </div>
      <div
        className={`footerItem ${isActive('/TeamReportScreen') ? 'activeTint' : ''}`}
        onClick={() => navigate('/TeamReportScreen')}
      >
        <FontAwesomeIcon icon={faUsers} size="lg" />
        <h6>Team</h6>
      </div>
      <div
        className={`footerItem ${isActive('/Supports') ? 'activeTint' : ''}`}
        onClick={() => navigate('/Supports')}
      >
        {notificationCount > 0 && (
          <span className="notification-badge-message">{notificationCount}</span>
        )}
        <FontAwesomeIcon icon={faGlobe} size="lg" />
        
        <h6>Chat</h6>
      </div>
      <div
        className={`footerItem ${isActive('/Profile') ? 'activeTint' : ''}`}
        onClick={() => navigate('/Profile')}
      >
        <FontAwesomeIcon icon={faUser} size="lg" />
        <h6>Profile</h6>
      </div>
    </footer>
  );
};

export default Footer;
