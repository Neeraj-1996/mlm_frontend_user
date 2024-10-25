import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faUsers, faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './Footer.css'; // Import the global CSS file
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const Footer = () => {
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Get current location

  const isActive = (path) => location.pathname === path; // Check if the path is active

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
