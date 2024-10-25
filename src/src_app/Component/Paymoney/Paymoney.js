import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

import { toast } from "react-toastify";
import "./Paymoney.css";
import "react-toastify/dist/ReactToastify.css";
const Paymoney = () => {
  const navigate = useNavigate();

  const [responseData, setResponseData] = useState(null);
  const [time, setTime] = useState(2700);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setTransactionMessage("Time expired");
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [transactionMessage, setTransactionMessage] = useState(
    "Transaction is not successful. Status: Waiting"
  );
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [add, setAdd] = useState("");
  const [trackId, setTrackId] = useState("");
  const [network, setNetwork] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingOne, setlodingone] = useState(false);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const data = Object.fromEntries(urlParams.entries());
    console.log("Received data:", data);
    setResponseData(data);
  }, []);
  useEffect(() => {
    if (responseData) {
      setImage(responseData.QRCode);
      setLoading(false);
      setAdd(responseData.address);
      setTrackId(responseData.trackId);
      setNetwork(responseData.network);
      setGmail(responseData.email);
      setName(responseData.description);
    }
  }, [responseData]);
  let startIndex;
  let prefix;
  if (image.includes("polygon:")) {
    startIndex = image.indexOf("polygon:") + "polygon:".length;
    prefix = "polygon:";
  }
  // Check if "bnb:" is present
  else if (image.includes("bnb:")) {
    startIndex = image.indexOf("bnb:") + "bnb:".length;
    prefix = "bnb:";
  } else if (image.includes("tron:")) {
    startIndex = image.indexOf("tron:") + "tron:".length;
    prefix = "tron:";
  } else {
    startIndex = 0;
    prefix = "";
  }

  const endIndex = image.indexOf("?amount=5");
  const addressPart = image.substring(
    startIndex,
    endIndex !== -1 ? endIndex : image.length
  );
  //   console.log("address past",addressPart);
  const newUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${addressPart}`;
  // const [sendToSecondAPICalled, setSendToSecondAPICalled] = useState(false);
  const demo = async (text) => {
    await navigator.clipboard.writeText(text);
    console.log(`Copied to clipboard: ${text}`);
    toast.success("address copied");
  };

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
    <div className="container">
      <Header name="Pay Money" onBack={handleBackClick} />

      <div className="body">
        {transactionStatus !== "Paid" ? (
          <div className="loading-container">
            {loading || loadingOne ? (
              <div className="loading-container">
                {loading && (
                  <p className="loading-text">creating wallet address...</p>
                )}
                {loadingOne && (
                  <p className="loading-text">validating wallet address...</p>
                )}
                <p className="loading-text orange">Loading...</p>
              </div>
            ) : (
              <div className="cardPymoney">
                <h6 className="minimum-deposit">
                  Minimum deposit value 5 USDT
                </h6>
                <h6 className="network">{network}</h6>
                <img src={newUrl} alt="QR Code" />
                <h6 className="gmail">{gmail}</h6>
                <div className="address">
                <h6 style={{ fontSize: "12px" }}>{add}</h6>

                </div>
                <div className="track-id">
                  <h6>{trackId}</h6>
                </div>
                <button onClick={() => demo(add)} className="paymoneybutton">Copy Wallet Address</button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {showSuccess ? (
              <div className="success-container">
                <div className="success-icon"></div>
                <div className="success-message">
                  <div className="success-text-row">
                    <p className="success-text-red">Dear</p>
                    <p className="success-text-red">
                      Your transaction is under
                    </p>
                  </div>
                  <p className="success-text-red">Process Please Wait</p>
                  <p className="success-text-green">
                    When it's done you will be redirected to the wallet screen
                  </p>
                </div>
              </div>
            ) : (
              <p>Transaction not successful</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Paymoney;

// useEffect(() => {
//   if (transactionStatus === "Paid") {
//     setShowSuccess(true);
//     setTimeout(() => {
//       navigate("/Wallet");
//     }, 10000);
//   }
// }, [transactionStatus]);

// const handleRequestMoney = async (event) => {
//   // console.log("jai shree ram")

//   try {
//     const response = await axios.post(
//       "https://api.oxapay.com/merchants/inquiry",
//       {
//         merchant: "NCV36N-GTMR3L-6XHTHD-62W176",
//         trackId: trackId,
//         // "trackId": "26186222"
//       }
//     );

//     if (response.data.result === 100) {
//       // console.log("fdasdfa hhandleRequest ", response.data);
//       const status = response.data.status;
//       if (status === "Paid" && !sendToSecondAPICalled) {
//         const amount = response.data.payAmount;
//         //   sendToSecondAPI(response.data);
//         // setSendToSecondAPICalled(true);
//         setTransactionMessage("Transaction is successful. Status: Paid");
//       } else if (status === "Waiting") {
//         setTransactionMessage(
//           "Transaction is not successful. Status: Waiting"
//         );
//       }
//     } else {
//       console.log("API Error:", response.data.message);
//       // Handle other cases here
//     }
//   } catch (error) {
//     console.error("API Error:", error);
//   }
// };

// const sendToSecondAPI = async (responceData) => {
//   // console.log(" raja ram bakth hamnuman out", responceData);
//   try {
//     const dataForSecondAPI = {
//       payment_id: responceData.trackId,
//       txid: responceData.txID,
//       address: responceData.address,
//       amount: responceData.payAmount,
//       type: "credit",
//       wallet_name: responceData.email,
//       coin_short_name: responceData.currency,
//       wallet_id: "User wallet id",
//       merchant_id: "shree ram",
//       confirmations: "yes",
//       date: responceData.date,
//       explorer_url: responceData.description,
//     };

//     const token = localStorage.getItem("tokenId");
//     const response = await axios.post(
//       baseUrl + "deposite",
//       dataForSecondAPI,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (response.data && response.data.status === 200) {
//       setTransactionStatus("Paid");
//       toast.success("Money Added  successful");
//     } else {
//       console.error(
//         "The second API response indicates an error or status is not 200:",
//         response.data
//       );
//     }
//   } catch (error) {
//     console.error("Error sending data to the second API:", error);
//   }
// };

// useEffect(() => {
//     const intervalId = setInterval(handleRequestMoney, 5000);
//     return () => clearInterval(intervalId);
//   }, [trackId, sendToSecondAPICalled]);

//   const navigate = useNavigate();
// <div style={styles.container}>
// <div style={styles.body}>
//     {/* <h1>Paymoney</h1> */}
//     {loading || !responseData ? (
//     <div>Loading...</div>
//     ) : (
//     <div>
//         <div style={{backgroundColor:Colors.backgroundBlue,width:'100%',padding:10}}>
//         <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
//         <h5 style={{color:'#fff',}}>{name}</h5>
//         <h6 style={{color:'#fff',}}>{gmail}</h6>
//         <h6 style={{color:'#fff',marginTop:30}}>{network}</h6>
//         </div>
//         <div style={{display:'flex',alignItems:'center',justifyContent:'center',}}>
//         <img src={image} alt="QR Code" />
//         </div>
//         <div style={{ border: '1px solid #EC8E22', borderRadius: '10px',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#fff' ,margin:20}}>
//         <h6 style={{color:'#000',fontSize:15}}>{add}</h6>
//         </div>
//         <div style={{display:'flex',alignItems:'center',justifyContent:'center',}}>
//         <button onClick={() => demo(add)}  >Copy Wallet Address</button>
//         </div>
//         </div>
//         <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
//             <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
//         <h6>Transaction Time</h6>
//         <h6 style={{ fontSize: 15, color:'red',fontWeight:'800',marginLeft:10}}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h6>
//         </div>
//         <p>{transactionMessage}</p>
//         </div>
//         <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
//         <button onClick={handleRequestMoney}>Check Status</button>
//         </div>
//     </div>
//     )}
// </div>
// </div>]
//   const handleBackButton = () => {
//     if (transactionStatus !== 'Paid') {
//       const confirmBack = window.confirm('Transaction is not successful. Are you sure you want to go back?');
//       if (confirmBack) {
//         history.goBack();
//       }
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('beforeunload', handleBackButton);
//     return () => window.removeEventListener('beforeunload', handleBackButton);
//   }, [transactionStatus, history]);
