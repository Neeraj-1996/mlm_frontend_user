// src/components/SignUpPage.js
import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// import WorldFlag from 'react-world-flags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import LoadingButton from '../../Combutton/LoadingButton';
import { faUser, faEnvelope, faPhone, faShare, faLock, faLockOpen, faShieldAlt,faAddressCard } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import CustomDropdownHome from '../Headerhome/Flag';
import { countries } from '../../asset/data';
import { useLocation } from 'react-router-dom';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignUpPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialShareId = queryParams.get('shareId') || ''; // Extract shareId from URL


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shareId, setShareId] = useState(initialShareId);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  console.log("selectedCountry",selectedCountry);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); 

  const [countriesCode, setCountriesCode] = useState([]);

 const fetchCountries = async () => {
  try {
    const result = await axios.get("https://api.vortexvantures.com/api/users/getCountryUser");
    setCountriesCode(result.data.countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

useEffect(() => {
  fetchCountries();
}, []);

console.log("countries",countriesCode);
useEffect(() => {
  fetchCountries();
}, []);
  const navigate = useNavigate();

  const validateForm = () => {
    // Reset all errors before validating
    let isValid = true;

    // Username validation
    if (!username.trim()) {
      toast.error("Username is required");
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error("Email is required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      isValid = false;
    }

    // Phone validation (7 to 10 digits)
    const phoneRegex = /^[0-9]{7,10}$/;
    if (!phone) {
      toast.error("Phone number is required");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      toast.error("Phone must be 7 to 10 digits");
      isValid = false;
    }

    // Share ID validation
    if (!shareId.trim()) {
      toast.error("Share ID is required");
      isValid = false;
    }

    // Password validation (alphanumeric, min 5 characters)
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@&])[A-Za-z\d@&]{5,}$/;
    if (!password) {
      toast.error("Password is required");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 5 characters long and include letters, digits, and one of these special characters: @ or &");
      isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };


  const handleSignUp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoadingLogin(true);
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('mobileNo', phone);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    const apiUrl = `https://api.vortexvantures.com/api/users/register?shared_Id=${shareId}`;

    axios.post(apiUrl, formData)
      .then((response) => {
        console.log('Response:', response.data);
        navigate('/');
        setLoadingLogin(false);
        toast.success("Sign up successful!");
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoadingLogin(false);
        // toast.error("Sign up failed. Please try again.");
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
      });
  };

  const handleLogin = (e) => {

    e.preventDefault();
    navigate('/');
    
  };


  return (
    <div>
      <div className="row">
        {/* <div className="col-md-3"> */}
          <div className="dropdown-container">
            <CustomDropdownHome
              countries={countries}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
            />
          </div>
        {/* </div> */}

        <div className="col-md-9">
          <div className="login-container">
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
  <div className="d-flex align-items-center">
    <select
      value={selectedCountryCode}
      onChange={(e) => setSelectedCountryCode(e.target.value)}
      className="form-select border-end-0"
      style={{
        width: "100px",
        height: "100%",
        borderRadius: "0.375rem 0 0 0.375rem",
        padding: "0.375rem 0.75rem",
      }}
    >
      {countriesCode.map((country) => (
        <option key={country._id} value={country.countryCode}>
          {country.countryCode}
        </option>
      ))}
    </select>
    <input
      type="tel"
      className="form-control"
      style={{
        borderRadius: "0 0.375rem 0.375rem 0",
      }}
      placeholder="Phone"
      value={phone}
      onChange={(e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
          setPhone(value);
        }
      }}
      required
    />
  </div>
</div>
              {/* <div className="mb-3 position-relative">
                
                <input
                  type="tel"
                  className="form-control ps-5"
                  placeholder="Phone"
                  value={phone}
                  // onChange={(e) => setPhone(e.target.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits and enforce length between 7 and 10
                    if (/^\d{0,10}$/.test(value)) {
                      setPhone(value);
                    }
                  }}
                  required
                />

<select
      value={selectedCountryCode}
      onChange={(e) => setSelectedCountryCode(e.target.value)}
      className="form-select border-end-0"
      style={{
        width: "80px",
        height: "100%",
        borderRadius: "0.375rem 0 0 0.375rem",
        padding: "0.375rem 0.75rem",
      }}
    >
      {countriesCode.map((country) => (
        <option key={country._id} value={country.countryCode}>
          {country.countryCode}
        </option>
      ))}
    </select>
              </div> */}
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
              {/* <div className="mb-3 position-relative">
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Captcha"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faShieldAlt} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-black" />
              </div> */}
              <LoadingButton
                  onClickFunction={handleSignUp}
                  buttonText="Sign Up"
                  loading={loadingLogin}
              />
              <div style={{ marginTop: 10, textAlign: 'center' }}>
                <p style={{ marginBottom: 5 }}>Already have an account? <span style={{ fontWeight: 'bold' }}>Log in</span></p>
                <LoadingButton
                  onClickFunction={handleLogin}
                  buttonText="Log in"
                  loading={loadingLogin}
                />
              </div>

            
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;


