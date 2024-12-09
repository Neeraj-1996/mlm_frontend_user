import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrlapp from '../Url/Urlapp';
import CustomDropdownHome from '../Headerhome/Flag';
import LoadingButton from "../../Combutton/LoadingButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash,faMobile } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { countries } from '../../asset/data';
import 'react-toastify/dist/ReactToastify.css';
import './Loginpage.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle between true and false
  };




  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Check for empty fields
    if (!email || !password) {
      toast.error("Please enter mobile number and password"); // Show error message
      return; // Exit the function if validation fails
    }
  
    const myHeaders = {
      'Content-Type': 'application/json',
    };
  
    const data = {
      mobile_no: email, // Assuming 'email' represents the mobile number here
      password: password,
    };
    
    setLoadingLogin(true); // Set loading state
  
    try {
      const response = await axios.post(baseUrlapp + 'login', data, { headers: myHeaders });
  
      if (response.data.statusCode === 200) {
        // console.log("data", response.data.data);
        // Save accessToken, refreshToken, and user info to localStorage
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('username', response.data.data.user.username);
        localStorage.setItem('email', response.data.data.user.email);
        localStorage.setItem('mobileNo', response.data.data.user.mobileNo);
        localStorage.setItem('userId', response.data.data.user.userId);
        localStorage.setItem('sharedId', response.data.data.user.sharedId);
        
        console.log("Tokens and user information saved successfully.");
        navigate('/Homepage'); 
      } else {
        console.error('Login failed:', response.data.message);
        toast.error(response.data.message || 'Login failed'); // Show error message from API
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("User does not exist"); // General error message
      // toast.error("An error occurred during login. Please try again."); // General error message
    } finally {
      setLoadingLogin(false); 
    }
  };
  
  const handleRegister = () => {
    navigate('/SignUpPage');
  };

  const handleForgotPassword = () => {
    navigate('/FogetPassword');
  };

  return (
    <div>
    <div className="dropdown-container">
        <CustomDropdownHome
            countries={countries}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
        />
    </div>
    <div className="login-container">
        <h1>Login</h1>

        {/* Card with Mobile Icon */}
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
                icon={faMobile}
                size="4x"
                style={{
                    background: "linear-gradient(90deg, #FF5733, #C70039)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            />
        </div>

        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label>Mobile:</label>
                <input
                    type="number"
                    className="form-control no-spinner"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Password:</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ paddingRight: '40px' }} // Create space for the eye icon
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        {showPassword ? (
                            <FontAwesomeIcon icon={faEye} size="1x" color="grey" />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} size="1x" color="grey" />
                        )}
                    </button>
                </div>
            </div>

            <button className="btn btn-link forgot-password forgeT_butN" onClick={handleForgotPassword}>
                Forgot Password?
            </button>


            <div className="button-row1">
                        {/* Use LoadingButton for Login */}
                        <LoadingButton
                            onClickFunction={handleLogin}
                            buttonText="Login"
                            loading={loadingLogin}
                        />
                        {/* <LoadingButton
                            onClickFunction={handleRegister}
                            buttonText="Register"
                            // loading={loadingRegister}
                            style={{ background: 'linear-gradient(90deg, #007BFF, #0056b3)' }} // Different color for Register
                        /> */}
                        <button 
    onClick={handleRegister}
    style={{
      background: 'linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%)',
      color: "#fff",
        padding: "10px 0",
        width: "100%",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        transition: 'background 0.3s ease',
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
    }}
    onMouseEnter={(e) => e.target.style.background = 'linear-gradient(90deg, #0056b3, #007BFF)'} // Hover effect
    onMouseLeave={(e) => e.target.style.background = 'linear-gradient(90deg, #007BFF, #0056b3)'} // Revert on hover out
>
    Register
</button>

                    </div>


        </form>
    </div>
</div>
  );
};

export default LoginPage;


 {/* <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn"
              onClick={togglePasswordVisibility}
              style={{ marginLeft: '1px' }}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} size="1x" color="grey" />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size="1x" color="grey" />
              )}
            </button>
          </div> */}
// Inside your handleLogin function
// const handleLogin = async (e) => {
//   e.preventDefault();

//   const myHeaders = {
//     'Content-Type': 'application/json',
//   };

//   const data = {
//     mobile_no: email,   // Assuming 'email' is used for mobile number as well
//     password: password,
//   };

//   try {
//     const response = await axios.post(
//       'http://localhost:9001/api/users/login',
//       data,
//       { headers: myHeaders }
//     );
//     console.log(response.data);
//     // Handle login success (e.g., save tokens, navigate, etc.)
//     navigate('/Homepage');
//   } catch (error) {
//     console.error('Login error:', error);
//     // Handle login error (e.g., show error message to the user)
//   }
// };