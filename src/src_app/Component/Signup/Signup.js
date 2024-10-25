// src/components/SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorldFlag from 'react-world-flags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import LoadingButton from '../../Combutton/LoadingButton';
import { faUser, faEnvelope, faPhone, faShare, faLock, faLockOpen, faShieldAlt,faAddressCard } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import CustomDropdownHome from '../Headerhome/Flag';


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
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoadingLogin(true)
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('mobileNo', phone);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    const apiUrl = `http://localhost:9001/api/users/register?shared_Id=${shareId}`;

    axios.post(apiUrl, formData)
      .then((response) => {
        console.log('Response:', response.data);
        navigate('/'); 
        setLoadingLogin(false)
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="dropdown-container">
            <CustomDropdownHome
              countries={countries}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
            />
          </div>
        </div>

        <div className="col-md-9">
          <div className="login-container">
            {/* <h1 className="mb-4">Welcome to Register</h1> */}
            <div 
                  style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "150px",
                      height: "150px",
                      background: "linear-gradient(90deg, #FF5733, #C70039)",
                      borderRadius: "15px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
                      margin: "20px auto",
                  }}
              >
                  <FontAwesomeIcon
                      icon={faAddressCard}
                      size="4x"
                      style={{
                          background: "linear-gradient(90deg, #FF5733, #C70039)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                      }}
                  />
              </div>
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
                <FontAwesomeIcon icon={faAddressCard} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-black" />
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
              {/* <button type="submit" className="btn btn-light">Sign Up</button> */}
              <LoadingButton
                            onClickFunction={handleSignUp}
                            buttonText="Sign Up"
                            loading={loadingLogin}
                        />
            
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
