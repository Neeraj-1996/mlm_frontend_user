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
import { countries } from '../../asset/data';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const apiUrl = `http://api.vortexvantures.com/api/users/register?shared_Id=${shareId}`;

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



  // const handleSignUp = (e) => {
  //   e.preventDefault();
  //   setLoadingLogin(true)
  //   const formData = new FormData();
  //   formData.append('username', username);
  //   formData.append('email', email);
  //   formData.append('mobileNo', phone);
  //   formData.append('password', password);
  //   formData.append('confirmPassword', confirmPassword);
  //   const apiUrl = `http://localhost:9001/api/users/register?shared_Id=${shareId}`;

  //   axios.post(apiUrl, formData)
  //     .then((response) => {
  //       console.log('Response:', response.data);
  //       navigate('/'); 
  //       setLoadingLogin(false)
        
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //       setLoadingLogin(false)
  //     });
  // };
