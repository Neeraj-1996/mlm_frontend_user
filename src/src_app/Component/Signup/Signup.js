// src/components/SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorldFlag from 'react-world-flags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faShare, faLock, faLockOpen, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';


import CustomDropdown from './Flag';

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

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shareId, setShareId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captcha, setCaptcha] = useState('');


  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Perform signup logic
    console.log('Signed up with:', username, email, phone, shareId, password);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="dropdown-container">
            <CustomDropdown
              countries={countries}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
            />
          </div>
        </div>
        <div className="col-md-9">
          <div className="card bg-danger text-black p-4">
            <h1 className="mb-4">Welcome to Register</h1>
            <form onSubmit={handleSignUp}>
              <div className="mb-3 position-relative">
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faUser} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-black" />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type="email"
                  className="form-control ps-5"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faEnvelope} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-black" />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type="tel"
                  className="form-control ps-5"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faPhone} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-black" />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Share ID"
                  value={shareId}
                  onChange={(e) => setShareId(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faShare} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-black" />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type="password"
                  className="form-control ps-5"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faLock} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-black" />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type="password"
                  className="form-control ps-5"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faLockOpen} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-black" />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Captcha"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faShieldAlt} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-black" />
              </div>
              <button type="submit" className="btn btn-light">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;




// import React, { useState } from 'react';
// import Select from 'react-select';
// import { FlagIcon } from 'react-flagkit';

// // List of country options with flag icons and codes
// const countryOptions = [
//   { value: '+1', label: 'United States (+1)', icon: <FlagIcon country="US" /> },
//   { value: '+44', label: 'United Kingdom (+44)', icon: <FlagIcon country="GB" /> },
//   { value: '+91', label: 'India (+91)', icon: <FlagIcon country="IN" /> },
//   { value: '+61', label: 'Australia (+61)', icon: <FlagIcon country="AU" /> },
//   { value: '+81', label: 'Japan (+81)', icon: <FlagIcon country="JP" /> },
//   { value: '+49', label: 'Germany (+49)', icon: <FlagIcon country="DE" /> },
//   { value: '+33', label: 'France (+33)', icon: <FlagIcon country="FR" /> },
//   { value: '+7', label: 'Russia (+7)', icon: <FlagIcon country="RU" /> },
//   { value: '+91', label: 'India (+91)', icon: <FlagIcon country="IN" /> },
//   { value: '+39', label: 'Italy (+39)', icon: <FlagIcon country="IT" /> },
//   { value: '+55', label: 'Brazil (+55)', icon: <FlagIcon country="BR" /> },
//   { value: '+27', label: 'South Africa (+27)', icon: <FlagIcon country="ZA" /> },
//   { value: '+65', label: 'Singapore (+65)', icon: <FlagIcon country="SG" /> },
//   { value: '+86', label: 'China (+86)', icon: <FlagIcon country="CN" /> },
//   { value: '+92', label: 'Pakistan (+92)', icon: <FlagIcon country="PK" /> },
//   { value: '+91', label: 'India (+91)', icon: <FlagIcon country="IN" /> },
//   { value: '+92', label: 'Pakistan (+92)', icon: <FlagIcon country="PK" /> },
//   { value: '+971', label: 'United Arab Emirates (+971)', icon: <FlagIcon country="AE" /> },
//   { value: '+63', label: 'Philippines (+63)', icon: <FlagIcon country="PH" /> },
//   { value: '+60', label: 'Malaysia (+60)', icon: <FlagIcon country="MY" /> },
//   { value: '+64', label: 'New Zealand (+64)', icon: <FlagIcon country="NZ" /> },
//   { value: '+84', label: 'Vietnam (+84)', icon: <FlagIcon country="VN" /> },
//   { value: '+420', label: 'Czech Republic (+420)', icon: <FlagIcon country="CZ" /> },
//   { value: '+45', label: 'Denmark (+45)', icon: <FlagIcon country="DK" /> },
//   { value: '+41', label: 'Switzerland (+41)', icon: <FlagIcon country="CH" /> },
//   { value: '+46', label: 'Sweden (+46)', icon: <FlagIcon country="SE" /> },
//   { value: '+52', label: 'Mexico (+52)', icon: <FlagIcon country="MX" /> },
// ];

// const PhoneInput = () => {
//   const [phone, setPhone] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

//   return (
//     <div className="mb-3 position-relative">
//       <Select
//         options={countryOptions}
//         value={selectedCountry}
//         onChange={setSelectedCountry}
//         formatOptionLabel={({ icon, label }) => (
//           <div className="d-flex align-items-center">
//             {icon}
//             <span className="ms-2">{label}</span>
//           </div>
//         )}
//         className="position-absolute top-50 start-0 translate-middle-y ms-2"
//         classNamePrefix="react-select"
//         styles={{
//           container: (provided) => ({
//             ...provided,
//             width: '220px',
//             position: 'absolute',
//             top: '50%',
//             transform: 'translateY(-50%)',
//           }),
//           control: (provided) => ({
//             ...provided,
//             border: 'none',
//             boxShadow: 'none',
//             backgroundColor: 'transparent',
//           }),
//           menu: (provided) => ({
//             ...provided,
//             zIndex: 9999,
//           }),
//         }}
//       />
//       <input
//         type="tel"
//         className="form-control ps-5"
//         placeholder="Phone"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         required
//         style={{ paddingLeft: '240px' }} // Adjust padding to accommodate dropdown
//       />
//     </div>
//   );
// };

// export default PhoneInput;

