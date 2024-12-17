import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobile,
  faLock,
  faEye,
  faEyeSlash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Header from "../Header/Header";
import OtpInput from "react-otp-input";

import LoadingButton from "../../Combutton/LoadingButton";
import baseUrlapp from "../Url/Urlapp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("verifyEmail");
  const [mobileNumber, setMobileNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loadingSendOTP, setLoadingSendOTP] = useState(false); // For Send OTP API
  const [loadingResetPassword, setLoadingResetPassword] = useState(false); // For Reset Password API

  const [otp, setOtp] = useState("");

  const [mobileOtp, setMobileOtp] = useState("");

  const handleSendOTP = () => {
    if (!mobileNumber) {
      toast.error("Error", "Please enter a mobile number");
      return;
    }
    setLoadingSendOTP(true);
    const requestData = {
      mobileNo: mobileNumber,
    };

    axios
      .post(baseUrlapp + "sendOtp", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { statusCode, data, message } = response.data;
        if (statusCode === 200) {
          console.log("Response Data:", data);
          setMobileOtp(data.OTP);
          toast.success(message);
          setLoadingSendOTP(false);
          setStep("verifyCode");
        } else {
          toast.error("Failed to send OTP");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error", "Failed to send OTP");
      });
  };



  const handleVerifyCode = () => {
    console.log("mobileotp", mobileOtp);
    console.log("verificationCode", otp);

    // Convert values to strings and check if they are equal
    if (String(mobileOtp) === String(otp)) {
      console.log("OTP verification successful");
      setStep("resetPassword");
      // You can perform additional actions here if needed
    } else {
      console.log("OTP verification failed");
      alert("OTP verification failed");
    }
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmNewPassword) {
        toast.error("Passwords do not match");
        return;
    }

    setLoadingResetPassword(true);

    const data = {
        mobileNo: mobileNumber,
        newPassword: newPassword,
    };
    console.log("reset", data);
    
    axios
        .post(baseUrlapp + "changePassword", data)  // Ensure the correct endpoint is used
        .then((response) => {
            console.log("response", response);
            if (response.data.statusCode === 200) {  // Check response.data for statusCode
                console.log("Password reset successfully");
                navigate("/");
                toast.success("Password reset successfully");
            }
            setLoadingResetPassword(false);  // Move this outside the if statement
        })
        .catch((error) => {
            // Handle errors here
            console.error("Error resetting password", error);
            setLoadingResetPassword(false);  // Ensure loading is turned off on error

            if (error.response && error.response.status === 400) {
                // If it's a 400 error, log the error message from the response
                console.error("API Error:", error.response.data.message);  // Change to message
                toast.error(error.response.data.message);  // Show message to user
            } else {
                // Show a general error message to the user
                console.error("Network error or other error:", error);
                toast.error("Error resetting password");
            }
        });
};


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Header name="Forget Password" onBack={handleBackClick} />
      <div
        style={{
          width: "100%",
          maxWidth: "350px",
          backgroundColor: "#f0f0f0",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0px 5px 15px rgba(64, 123, 250, 0.5)",
          margin:"10px"
        }}
      >
        {step === "verifyEmail" ? (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="form-group"
              style={{ marginBottom: "15px", width: "100%" }}
            >
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

              <input
                type="number"
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              />
            </div>

            {/* Verify button */}
            <LoadingButton
              onClickFunction={handleSendOTP} // API call specific to OTP
              buttonText="Send OTP"
              loading={loadingSendOTP} // Specific loading state for this button
            />
          </div>
        ) : step === "verifyCode" ? (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* OTP Icon with gradient background */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "150px", // Width of the card
                height: "150px", // Height of the card
                background: "linear-gradient(90deg, #FF5733, #C70039)", // Gradient background
                borderRadius: "15px", // Rounded corners for card
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)", // Light shadow for card effect
                margin: "20px auto", // Center the card within its container
              }}
            >
              <FontAwesomeIcon
                icon={faKey}
                size="4x"
                style={{
                  background: "linear-gradient(90deg, #FF5733, #C70039)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
            </div>

            {/* OTP Input Fields */}
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "35px",
                    height: "35px",
                    margin: "5px",
                    fontSize: "18px",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            />

            {/* Verify OTP Button */}
            <button
              onClick={handleVerifyCode}
              style={{
                background: "linear-gradient(90deg, #FF5733, #C70039)",
                color: "#fff",
                padding: "10px 0",
                width: "100%",
                maxWidth: "300px", // Ensure the button aligns with input width
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Verify OTP
            </button>
          </div>
        ) : step === "resetPassword" ? (
          <div style={{ textAlign: "center" }}>
            {/* Lock Icon with Gradient Background */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "150px", // Width of the card
                height: "150px", // Height of the card
                background: "linear-gradient(90deg, #FF5733, #C70039)", // Gradient background
                borderRadius: "15px", // Rounded corners for card
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)", // Light shadow for card effect
                margin: "20px auto", // Center the card within its container
              }}
            >
              <FontAwesomeIcon
                icon={faLock}
                size="4x"
                style={{
                  background: "linear-gradient(90deg, #FF5733, #C70039)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
            </div>

            {/* New Password Input */}
            <div
              className="form-group"
              style={{ marginBottom: "15px", position: "relative" }}
            >
              <FontAwesomeIcon
                icon={faLock}
                size="1x"
                color="grey"
                style={{
                  marginRight: "10px",
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 40px", // Increased padding for lock icon space
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              />
            </div>

            {/* Confirm Password Input */}
            <div
              className="form-group"
              style={{ marginBottom: "20px", position: "relative" }}
            >
              <FontAwesomeIcon
                icon={faLock}
                size="1x"
                color="grey"
                style={{
                  marginRight: "10px",
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 40px", // Increased padding for lock icon space
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              />
              <button
                onClick={togglePasswordVisibility}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} size="1x" color="grey" />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} size="1x" color="grey" />
                )}
              </button>
            </div>


            <LoadingButton
              onClickFunction={handleResetPassword}
              buttonText="Reset Password"
              loading={loadingResetPassword}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ForgetPassword;

// <div style={{ height: "100vh", width: '100%', backgroundColor: '#1B334D', alignItems: 'center' }}>
//     <div style={{ height: "30%", width: "100%", backgroundColor: "#fff", borderBottomLeftRadius: "90px" }}>

//         {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px", height: "40%" }}>
//             <img src={require("../../asset/images/logo/logo.png")} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", }} alt="logo" />
//         </div> */}
//         <div style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "10%", marginTop: "100px", marginLeft: "230px" }}>
//             <p style={{ color: "#000", fontSize: "22px", fontWeight: "bold", marginLeft: "0", fontFamily: "Roboto-Medium" }}>Forget Password</p>
//         </div>
//     </div>

//     {step === 'verifyEmail' ? (
//         <div style={{ height: '60%', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>

//             <div className="form-control" style={{ display: "flex", alignItems: "center", width: "100%", flexDirection: 'row' }}>
//                 <FontAwesomeIcon icon={faMobile} size="2x" color="grey" />
//                 <input
//                     type='number'
//                     placeholder="Mobile"
//                     value={mobileNumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                     style={{ border: 'none', outline: 'none', marginLeft: '5px' }}
//                 />

//             </div>
//             {/* Button to verify mobile */}
//             <div style={{ display: "flex", marginLeft: '70px', justifyContent: "center", alignItems: "center", borderRadius: "5px", borderWidth: '2px', marginTop: "20px", backgroundColor: "#EC8E22", width: "60%" }}>
//                 <button style={{ backgroundColor: "#EC8E22" }} onClick={handleSendOTP}>
//                     <p style={{ color: "#fff", fontWeight: "bold", height: "20px", width: "230px", padding: "1px", textAlign: "center", fontSize: "20px" }}>Verify Mobile</p>
//                 </button>
//             </div>

//         </div>
//     ) : step === 'verifyCode' ? (
//         <div style={{ height: '60%', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
//             {/* OTP Inputs */}
//             {/* Button to verify OTP */}
//             <div style={{ marginLeft: '30px' }}>
//                 <OtpInput
//                     value={otp}
//                     onChange={setOtp}
//                     numInputs={6}
//                     renderSeparator={<span>-</span>}
//                     renderInput={(props) => (
//                         <input
//                             {...props}
//                             style={{
//                                 width: '40px', // Adjust the width as needed
//                                 height: '40px', // Adjust the height as needed
//                                 fontSize: '20px', // Adjust the font size as needed
//                                 textAlign: 'center', // Center the text horizontally
//                             }}
//                         />
//                     )}

//                 />
//             </div>
//             <div style={{ display: "flex", marginLeft: '70px', justifyContent: "center", alignItems: "center", borderRadius: "5px", borderWidth: '2px', marginTop: "20px", backgroundColor: "#EC8E22", width: "60%" }}>
//                 <button style={{ backgroundColor: "#EC8E22" }} onClick={handleVerifyCode}>
//                     <p style={{ color: "#fff", fontWeight: "bold", height: "20px", width: "230px", padding: "1px", textAlign: "center", fontSize: "20px" }}>Verify OTP</p>
//                 </button>
//             </div>
//         </div>
//     ) : step === 'resetPassword' ? (
//         <div style={{ height: '60%', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>

//             <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
//                 <div className="form-control" style={{ display: "flex", alignItems: "center", width: "100%", flexDirection: 'row' }}>
//                     <FontAwesomeIcon icon={faLock} size="2x" color="grey" style={{ width: '20%' }} />
//                     <input
//                         type='text'
//                         placeholder="Password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         style={{ border: 'none', outline: 'none', marginLeft: '5px' }}
//                     />

//                 </div>
//             </div>
//             <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
//                 <div className="form-control" style={{ display: "flex", alignItems: "center", width: "100%", flexDirection: 'row' }}>
//                     <FontAwesomeIcon icon={faLock} size="2x" color="grey" style={{ width: '30%' }} />
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Conform Password"
//                         value={confirmNewPassword}
//                         onChange={(e) => setConfirmNewPassword(e.target.value)}
//                         style={{ border: 'none', outline: 'none', marginLeft: '5px' }}
//                     />
//                     <button className="btn" onClick={togglePasswordVisibility} >
//                         {showPassword ? <FontAwesomeIcon icon={faEye} size="2x" color="grey" /> : <FontAwesomeIcon icon={faEyeSlash} size="2x" color="grey" />}
//                     </button>
//                 </div>
//             </div>

//             <div style={{ display: "flex", marginLeft: '70px', justifyContent: "center", alignItems: "center", borderRadius: "5px", borderWidth: '2px', marginTop: "20px", backgroundColor: "#EC8E22", width: "60%" }}>
//                 <button style={{ backgroundColor: "#EC8E22" }} onClick={handleResetPassword}>
//                     <p style={{ color: "#fff", fontWeight: "bold", height: "20px", width: "230px", padding: "1px", textAlign: "center", fontSize: "20px" }}>Reset Password</p>
//                 </button>
//             </div>

//         </div>
//     ) : null}
// </div>
