import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import CustomDropdownHome from '../Signup/Flag';
import CustomDropdownHome from './Flag';
import { faArrowLeft, faBell, faFlag } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import the CSS file

const countries = [
  { code: 'US', name: 'United States', nativeName: 'United States' },
  { code: 'GB', name: 'United Kingdom', nativeName: 'United Kingdom' },
  { code: 'FR', name: 'France', nativeName: 'France' },
  { code: 'DE', name: 'Germany', nativeName: 'Deutschland' },
  { code: 'IT', name: 'Italy', nativeName: 'Italia' },
  { code: 'ES', name: 'Spain', nativeName: 'España' },
  { code: 'CN', name: 'China', nativeName: '中国' },
  { code: 'JP', name: 'Japan', nativeName: '日本' },
  { code: 'KR', name: 'South Korea', nativeName: '대한민국' },
  { code: 'IN', name: 'India', nativeName: 'भारत' },
  { code: 'BD', name: 'Bangladesh', nativeName: 'বাংলাদেশ' },
  { code: 'BR', name: 'Brazil', nativeName: 'Brasil' },
  { code: 'MX', name: 'Mexico', nativeName: 'México' },
  { code: 'RU', name: 'Russia', nativeName: 'Россия' },
  { code: 'AU', name: 'Australia', nativeName: 'Australia' },
  { code: 'CA', name: 'Canada', nativeName: 'Canada' },
  { code: 'ZA', name: 'South Africa', nativeName: 'South Africa' },
  { code: 'AR', name: 'Argentina', nativeName: 'Argentina' },
  { code: 'CL', name: 'Chile', nativeName: 'Chile' },
  { code: 'CO', name: 'Colombia', nativeName: 'Colombia' },
  { code: 'PH', name: 'Philippines', nativeName: 'Pilipinas' },
  { code: 'EG', name: 'Egypt', nativeName: 'مصر' },
  { code: 'NG', name: 'Nigeria', nativeName: 'Nigeria' },
  { code: 'SA', name: 'Saudi Arabia', nativeName: 'المملكة العربية السعودية' },
  { code: 'TH', name: 'Thailand', nativeName: 'ประเทศไทย' },
  { code: 'SG', name: 'Singapore', nativeName: 'Singapore' },
  { code: 'MY', name: 'Malaysia', nativeName: 'Malaysia' },
  { code: 'ID', name: 'Indonesia', nativeName: 'Indonesia' }
];
const Header = ({ name, onBack }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  return (
    <header className="header">
      {/* <button className="flag-btn">
        <FontAwesomeIcon icon={faFlag} />
      
      </button> */}
             <div className="dropdown-container">
            <CustomDropdownHome
              countries={countries}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
            />
            </div>
      <h1 className="header-title">Venture Vertex</h1>
      <button className="notification-btn">
        <FontAwesomeIcon icon={faBell} />
      </button>
    </header>
  );
};

export default Header;
