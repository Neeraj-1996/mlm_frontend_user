import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../Url/Url";
import baseUrlapp from "../Url/Urlapp";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons"; // Import the QR code icon
import Header from "../Header/Header";
import './Withdrawal.css';
import LoadingButton from "../../Combutton/LoadingButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Withdrwal = () => {
  const navigate = useNavigate();
  const [upi, setUpi] = useState(false);
  const [amount, setAmount] = useState("");
  const [reducedAmount, setReducedAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  // const [amountsend, setAmountSend] = useState("");
  //   const [reversedData, setReversedData] = useState([]);

  // const handleAmountChange = (event) => {
  //   setAmount(event.target.value);
  //   // Implement logic to calculate reducedAmount if needed
  // };

  const handleAmountChange = (text) => {
    const enteredAmount = parseFloat(text);
    if (!isNaN(enteredAmount)) {
      // Calculate the reduced amount (5% less)
      const newAmount = enteredAmount - enteredAmount * 0.05;
      setAmount(text);
      // setAmountSend(newAmount);
      setReducedAmount(newAmount.toFixed(2)); // Limit the decimal places to 2
    } else {
      setAmount("");
      setReducedAmount("");
    }
  };
  const [latestBalance, setLatestBalance] = useState(0);
  useEffect(() => {
    resultDataWallet();
  }, [latestBalance]);

  const resultDataWallet = async () => {
    // const token = await AsyncStorage.getItem("tokenId");
    const token = localStorage.getItem("tokenId");
    try {
      const result = await axios.get(baseUrl + "wallet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (
        result.data.status === 200 &&
        result.data.message !== "No beds found"
      ) {
        const data = result.data.data;
        // console.log("data ram ", data);
        if (data.length > 0) {
          const lastTransaction = data[data.length - 1];
          const latestBalanceData = lastTransaction.balance;
          setLatestBalance(latestBalanceData);
          // console.log("latestBalance",latestBalance)
        } else {
          console.log("No transaction data available");
          setLatestBalance(undefined);
        }
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  // const handleAdd = () => {
  //   // Implement logic for withdrawal request
  // };

  const handleAdd = async () => {
    const withdrawal_amount = amount;
    const withdrawal_address = walletAddress;
    const enteredAmount = parseFloat(withdrawal_amount);
    //
    const latestAmount = latestBalance;
    const enteredAmountFloat = parseFloat(enteredAmount);
    const latestAmountFloat = parseFloat(latestAmount);

    console.log("enteredAmountFloat", enteredAmountFloat);
    console.log("latestAmountFloat", latestAmountFloat);
    console.log("withdrawal_address", withdrawal_address);

    if (isNaN(enteredAmount) || enteredAmount < 50) {
      alert("Please enter a valid amount greater than or equal to 50 USDT");
      setAmount("");
      setUpi("");
      setReducedAmount("");
    } else if (enteredAmount > latestAmountFloat) {
      alert("Insufficient balance");
      setAmount("");
      setUpi("");
    } else {
      const formData = new FormData();
      formData.append("withdrawal_amount", withdrawal_amount);
      formData.append("withdrawal_address", withdrawal_address);

      try {
        // const token = await AsyncStorage.getItem('tokenId');
        const token = localStorage.getItem("tokenId");
        if (token) {
          const response = await fetch(baseUrl + "withdrawal-request", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            const responseData = await response.json();
            resultdata();
            setAmount("");
            setUpi("");
            setWalletAddress("");
            toast.success(responseData.message);
          } else if (response.status === 400) {
            const errorData = await response.json();
            toast.error(errorData.errors);
          } else {
            toast.error("An error occurred: " + response.status);
          }
        } else {
          toast.error("Token is missing or not found.");
        }
      } catch (error) {
        toast.error("An error occurred: ");
      }
    }
  };
  const handleAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handleQRCode = () => {
    navigate("/QRCode");
  };

  const handleRequest = async () => {
    try {
      // Retrieve access token from local storage

      const accessToken = localStorage.getItem("accessToken");
      const mobileNo = localStorage.getItem("mobileNo");
      const username = localStorage.getItem("username");
      const userId = localStorage.getItem("userId");
      
   const requestBody = {
        userId:userId,
        address: walletAddress, // Replace with the actual address you want to send
        amount: amount,
        username: username,
        mobile: mobileNo,
      };
console.log("requestBody",requestBody);
      // Define headers for the request
      const myHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Use the retrieved token
      };
      setLoadingLogin(true);
      // Create the request body
   
      // Send POST request using Axios
      const response = await axios.post(
        baseUrlapp + "withdrawalrequest",
        requestBody,
        { headers: myHeaders }
      );

      // Check if the response status code is 200
      if (response.data.statusCode === 200) {
        console.log(response.data.data);
        toast.success(response.data.message);
        setLoadingLogin(false)
        console.log(response.data); // Log the successful response data
      } else {
        console.error("Error in request:", response.data); // Log any non-200 responses
      }
    } catch (error) {
      // Handle any errors
      toast.error("error in");
      console.error("Error posting withdrawal request:", error);
    }
  };

  const handleAddressValidation = async () => {
    try {
      // Retrieve access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      // Define headers for the request
      const myHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Use the retrieved token
      };

      // Create the request body
      const requestBody = {
        address: walletAddress, // Replace with the actual address you want to send
      };

      setLoadingLogin(true)
      // Send POST request using Axios
      const response = await axios.post(
        baseUrlapp + "withdrawalAdderss",
        requestBody,
        { headers: myHeaders }
      );

      // Check if the response status code is 200
      if (response.data.statusCode === 200) {
        console.log(response.data.data);
        setLoadingLogin(false)
        resultdata(); // Log the response data if status is 200
      } else {
        console.error("Unexpected status code:", response.status); // Handle other status codes if necessary
      }
    } catch (error) {
      // Handle any errors
      console.error("Error posting address:", error);
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    resultdata();
  }, []);
  const resultdata = async () => {
    //   const token = await AsyncStorage.getItem('tokenId');
    // const token = localStorage.getItem("tokenId");
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(
        baseUrlapp + "getWithdrawalAddress",

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          setData(response.data.data);

          // console.log("response.data.data", response.data.data)
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };





  const reversedData = data.slice().reverse();
  const renderItem = ({ item }) => {
    const createdAt = new Date(item.createdAt);
    const formattedDate = createdAt.toLocaleDateString();
    const formattedTime = createdAt.toLocaleTimeString();


    const handleItemClick = (item) => {
      console.log("item", item);
      setWalletAddress(item.address);
      setUpi(!upi);
    };

    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "99%",
          backgroundColor: "#fff", // Set background to white
          marginBottom: "2px",
          borderRadius: 10,
          flexDirection: "row",
          display: "flex",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Add shadow
          padding: "10px", // Add padding for better spacing
        }}
      >
        <div
          style={{
            marginTop: 5,
            flexDirection: "column",
            marginLeft: "1%",
            marginRight: "1%",
            width: "77%",
          }}
        >
          <button
            style={{
              background: "linear-gradient(90deg, #EC8E22, #FFC107)", // Gradient background for button
              border: "none",
              borderRadius: 5,
              padding: "10px", // Adjusted padding to fill the button better
              width: "100%", // Make button take the full width
              cursor: "pointer",
              outline: "none",
            }}
          >
            <h6
              style={{
                color: "#fff",
                fontSize: 12,
                margin: 0,
              }}
            >
              {item.address}
            </h6>
          </button>

          <h6 style={{ color: "#EC8E22", marginTop: 5 }}>
            {" "}

            {formattedDate} {formattedTime}
          </h6>

        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "33%",
            marginBottom: 15,
          }}
        >
          <button
            onClick={() => handleItemClick(item)}
            style={{
              background: "linear-gradient(90deg, #FF5733, #C70039)", // Gradient background for the withdrawal button
              border: "none",
              borderRadius: 5,
              padding: "2px", 
              width: "100%", 
              cursor: "pointer",
              outline: "none",
            }}
          >
            <h6
              style={{
                color: "white",
                fontSize: 16,
                margin: 0,
                padding: "2px",
              }}
            >
              Request Withdrawal
            </h6>
          </button>
        </div>
      </div>
    );
  };


  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="container">
      <Header name="Withdrawal" onBack={handleBackClick} />
      <div className="body">
        {upi ? (
          <div className="upi-section">
            <button className="buttonw">
              <h6>{walletAddress}</h6>
            </button>

            <div className="title">
              <span>Enter Withdrawal Amount</span>
            </div>

            <div className="amount-input-section">
              <div className="input-wrapper">
                <img
                  // size={30}
                  style={{width:25}}
                  src={require("../../asset/images/coins/usdt.png")}
                  alt="USD"
                />
              </div>
              <div className="input">
                <input
                  placeholder="Enter Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                />
              </div>
            </div>

            {reducedAmount !== "" && (
              <p className="reduced-amount">
                Amount You Get: <span>{reducedAmount}</span>
              </p>
            )}

            <div className="withdrawal-request-button">

              <LoadingButton
                  onClickFunction={handleRequest}
                  buttonText="Request"
                  loading={loadingLogin}
                />

            </div>
          </div>
        ) : (
          <div className="no-upi-section">
            <div className="terms-conditions">
              <p>Terms and Conditions</p>
              <ul>
                <li>• Minimum investment: <span>10 USDT</span></li>
                <li>• Minimum withdrawal: <span>50 USDT</span></li>
                <li>• Withdrawal confirmation time: <span>24 to 72 hours</span></li>
                <li>• Handling fee: <span>5%</span></li>
              </ul>
            </div>

            <div className="wallet-address-container">
              <div className="wallet-address">
                <span>Wallet Address</span>
              </div>

              <div className="wallet-input">
                <input
                  placeholder="Enter Wallet address"
                  value={walletAddress}
                  onChange={handleAddressChange}
                />
                <button className="qr-code-button" onClick={handleQRCode}>
                  <FontAwesomeIcon icon={faQrcode} size="lg" color="#000" />
                </button>
              </div>

              <div style={{ width: "50%", marginTop: 10,  }}>
                <LoadingButton
                  onClickFunction={handleAddressValidation}
                  buttonText="Save Address"
                  loading={loadingLogin}
                />
              </div>
            </div>

            <div className="divider"></div>

            <div className="saved-address">
              <span>Saved Address</span>
            </div>

            <div className="saved-address-list">
              {reversedData.map((item) => renderItem({ item }))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdrwal;
