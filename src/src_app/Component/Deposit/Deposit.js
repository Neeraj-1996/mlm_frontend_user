import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import LoadingButton from "../../Combutton/LoadingButton";
import "./Deposit.css";
import baseWallet from "../../../src_admin/screen/urlWallet";
import api from "../Navigation/api";
import "react-toastify/dist/ReactToastify.css";

const Deposit = () => {
  const navigate = useNavigate();

  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleBackClick = () => navigate(-1);
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobileNo: "",
  });
  useEffect(() => {
    // Retrieve user info from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedMobileNo = localStorage.getItem("mobileNo");

    if (storedUsername && storedEmail && storedMobileNo) {
      setUser({
        username: storedUsername,
        email: storedEmail,
        mobileNo: storedMobileNo,
      });
    } else {
      console.error("No user information found.");
    }
  }, []);

  const handleNextButtonClick = () => {
    if (selectedCurrency) {
      handleSendQRForPayment({
        currencyName: "USDT",
        blockchain: selectedCurrency,
      });
    } else {
      console.log("No currency selected");
    }
  };
  
  const handleSendQRForPayment = async (currency) => {
    console.log("currency", currency);
    const userId = localStorage.getItem("userId");
    setLoadingLogin(true);
    const data = {
      currencyName: currency.currencyName,
      email: user.email,
      amount: "5",
      mobileNo: user.mobileNo,
      blockchain: currency.blockchain,
      userId:userId
    };
    console.log("data", data);

    try {
      const response = await api.post(`${baseWallet}sendQRForPayment`, data);
      if (response.data.statusCode === 200) {
        // Log the response data only when statusCode is 200
        console.log(response.data.data);
        const data = response.data.data;
        const queryString = new URLSearchParams(data).toString();
        console.log("queryString:", queryString);
        window.location.href = `/Paymoney?${queryString}`;
        setLoadingLogin(false);
      } else {
        console.error("API call was not successful:", response.data.message);
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const CurrencyButton = ({
    currencyName,
    blockchain,
    selectedCurrency,
    onSelect,
  }) => (
    <button
      style={{
        borderRadius: 15, // Rounded corners for card view
        // borderWidth: 2,

        background:
          selectedCurrency === blockchain
            ? "linear-gradient(135deg, #6a11cb, #2575fc)"
            : "linear-gradient(135deg, #ff7e5f, #feb47b)",
        width: "100%", // Adjusted width for card view
        height: "70px", // Fixed height for a consistent card size
        margin: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Shadow effect
        transition: "transform 0.3s ease", // Transition for hover effect
        cursor: "pointer",
        border: "none",
      }}
      onClick={() => onSelect(blockchain)}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Hover effect
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Reset hover effect
    >
      <img
        style={{ width: 50, height: 50, marginRight: 10 }} // Added margin for spacing
        src={require("../../asset/images/coins/usdt.png")}
        alt={currencyName}
      />

      <div style={{ margin: 7 }}>
        <span style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
          {currencyName}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#000",
            marginLeft: 5,
          }}
        >
          {blockchain}
        </span>
      </div>
      <input
        type="radio"
        checked={selectedCurrency === blockchain}
        onChange={() => onSelect(blockchain)}
        style={{ marginLeft: "auto", marginRight: 10, accentColor: "#000" }} // Style for radio input
      />
    </button>
  );



  const handlePayRequest = () => {
    navigate("/PaymentRequests");
  };
  return (
    <div className="container">
      <Header name="Deposit" onBack={handleBackClick} />

<div>
{/* /PaymentRequests */}
  {/* <button onClick={handlePayRequest}>All address</button> */}

</div>
      <div className="body1">
        <div
          style={{
            alignItems: "center",
            marginTop: "10%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CurrencyButton
            currencyName="USDT"
            blockchain="TRC20"
            selectedCurrency={selectedCurrency}
            onSelect={setSelectedCurrency}
          />
          <CurrencyButton
            currencyName="USDT"
            blockchain="BEP20"
            selectedCurrency={selectedCurrency}
            onSelect={setSelectedCurrency}
          />

          <LoadingButton
            onClickFunction={handleNextButtonClick}
            buttonText="Next"
            loading={loadingLogin}
          />
        </div>

        
        <div style={{ marginTop: 5 }}></div>
      </div>
      <LoadingButton
                  onClickFunction={handlePayRequest}
                  buttonText="All address"
                  // loading={loadingLogin}
                />
    </div>
  );
};

export default Deposit;

// const renderItem = ({ item }) => {
//   if (!item.api_address) {
//     return null;
//   }

//   const { address, datetime, trackid } = item.api_address[0];

//   const copyToClipboard = async (text) => {

//     await clipboard.writeText(text);
//     toast.success("copied");

//   };

//   return (
//     <div style={{ backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 5,width:'125%'}}>
//       <p style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{address}</p>
//       <button onClick={() => copyToClipboard(address)}>Copy Address</button>
//       <p>{`Track ID: ${trackid}`}</p>
//       <button onClick={() => copyToClipboard(trackid)}>Copy Track ID</button>
//       <p>{`Date: ${datetime}`}</p>
//     </div>
//   );
// };
{
  /* {isModalVisible && (
  <div style={styles.modalContainer}>
    <div style={styles.closeButtonContainer}>
      <button onClick={toggleModal} style={styles.closeButton}>
        Close
      </button>
    </div>
    <div style={styles.modalContent}>
      {apiAddresses.length === 0 ? (
        <p>No addresses available currently</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {apiAddresses.map((item) => (
            <li key={item.id} style={{ padding: 10 }}>{renderItem({ item })}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
)} */
}

//   const CurrencyButton = ({ currencyName, blockchain }) => (
//     <button
//       style={{
//         borderRadius: 50,
//         borderWidth: 2,
//         background: selectedCurrency === blockchain
//           ? 'linear-gradient(135deg, #6a11cb, #2575fc)'  // First gradient when selected
//           : 'linear-gradient(135deg,#ff6f61, #de6a9e)',  // Second gradient when not selected
//         width: '65%',
//         height: '17%',
//         margin: 20,
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center"
//       }}
//       onClick={() => handlePress({ currencyName, blockchain })}
//     >
//       <img
//         style={{ width: 50, height: 50 }}  // Adjusted inline image style
//         src={require('../../asset/images/coins/usdt.png')}
//         alt={currencyName}
//       />
//       <div style={{ margin: 7 }}>
//         <span style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>{currencyName}</span>
//         <span style={{ fontSize: 12, fontWeight: 'bold', color: '#fff', marginLeft: 5 }}>{blockchain}</span>
//       </div>
//     </button>
//   );

// useEffect(() => {
//   const checkLoginStatus = async () => {
//     try {
// setEmail("demo@gmail.com");
// setName("neeraj")
// const storedData = localStorage.getItem('userData');
// const storedData = "jgnskjfkjds28754289";

// if (storedData) {
//   const parsedData = JSON.parse(storedData);

// // setEmail(parsedData.user.email);
// // setName(parsedData.user.username)
// setEmail("demo@gmail.com");
// setName("neeraj")
//   // setloding(false);
// } else {
//   // setloding(false);
// }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   checkLoginStatus();
// }, []);
