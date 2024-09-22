import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faUsers, faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './Footer.css'; // Import the global CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerItem">
        <a href="/HomePage">
          <FontAwesomeIcon icon={faHome} size="lg" />
          <h6>Home</h6>
        </a>
      </div>
      <div className="footerItem">
        <a href="/order">
          <FontAwesomeIcon icon={faBox} size="lg" />
          <h6>Order</h6>
        </a>
      </div>
      <div className="footerItem">
        <a href="/TeamReportScreen">
          <FontAwesomeIcon icon={faUsers} size="lg" />
          <h6>Team</h6>
        </a>
      </div>
      <div className="footerItem">
        <a href="/Supports">
          <FontAwesomeIcon icon={faGlobe} size="lg" />
          <h6>Chat</h6>
        </a>
      </div>
      <div className="footerItem">
        <a href="/Profile">
          <FontAwesomeIcon icon={faUser} size="lg" />
          <h6>Profile</h6>
        </a>
      </div>
     
    </footer>
  );
};

export default Footer;
