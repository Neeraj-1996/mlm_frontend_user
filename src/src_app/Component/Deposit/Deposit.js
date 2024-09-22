import React, { useState, useEffect } from 'react';
import axios from "axios";
// import baseUrl from "../Url/Url";
import baseUrl from '../Url/Url';

import {useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import * as clipboard from "clipboard-polyfill";
import Header from '../Header/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const baseUrl = ''; // Define baseUrl


// const Header = ({ title }) => <h1>{title}</h1>; // Define Header component

const Deposit = () => {
    const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [allowedCoins, setAllowedCoins] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [apiAddresses, setApiAddresses] = useState([]); // Assuming apiAddresses are used


  const handleNext = () => {
    if (selectedCurrency) {
      // Handle the next step with selectedCurrency
      console.log(`Selected currency: ${selectedCurrency}`);
      // Add your navigation or processing logic here
    } else {
      console.log('No currency selected');
    }
  };


  const handleSendData = async (data) => {
    // console.log('data handledsenddata ', data);
    // console.log('fsjdhfsnd',new Date(data.createdAt * 1000).toISOString());
    // const token = localStorage.getItem('tokenId');
    const token = "28654|rLRwbVKY0wlyZE9qAp62HRLnGS4IDIdOT2s3TH5y";
    console.log("token",token);
    const apiEndpoint = 'https://www.smarttrade.org.in/public/api/v1/api-address';
  
    fetch(apiEndpoint, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "api_address": [
          {
            "address": data.address,
            "trackid": data.trackId,
            "datetime": new Date(data.createdAt * 1000).toISOString(), 
            "network": data.network,
            "user_gmail": data.email
          }
        ]
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
      })
      .catch(error => {
    
        console.error('Error sending data to API:', error);
      });
  };

  const handleNextButtonClick = () => {
    if (selectedCurrency) {
      handlePress({ currencyName: "USDT", blockchain: selectedCurrency });
    } else {
      console.log("No currency selected");
    }
  };
const handlePress = (currency) => {
    console.log('currency', currency);
    setSelectedCurrency(currency.blockchain);
    axios.post(
      'https://api.oxapay.com/merchants/request/whitelabel',
      {

        merchant: "NCV36N-GTMR3L-6XHTHD-62W176",
      currency: currency.currencyName,
        payCurrency: currency.currencyName,
        amount: "3",
        email: email,
        description: name,
        network: currency.blockchain
      }
    )
    .then(response => {
      if (response.data.result === 100) {
        console.log("cureny fdskfdsj handler",response.data);
        handleSendData(response.data);
        console.log("response.data",response.data)
        const data = response.data;
        const queryString = new URLSearchParams(data).toString();
        console.log("queryString:", queryString);
        window.location.href = `/Paymoney?${queryString}`;
      
      } else {
        console.log("API Error:", response.data.message);
      }
    })
    .catch(error => {
      console.error("API Error:", error);
    });
  };



  
 const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


 

const CurrencyButton = ({ currencyName, blockchain, selectedCurrency, onSelect }) => (
  <button
    style={{
      borderRadius: 50,
      borderWidth: 2,
      background: selectedCurrency === blockchain
        ? 'linear-gradient(135deg, #6a11cb, #2575fc)'  
        : 'linear-gradient(135deg,#ff6f61, #de6a9e)', 
      width: '65%',
      height: '17%',
      margin: 20,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
    onClick={() => onSelect(blockchain)}
  >

    <img
      style={{ width: 50, height: 50 }}
      src={require('../../asset/images/coins/usdt.png')}
      alt={currencyName}
    />
   
    <div style={{ margin: 7 }}>
      <span style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>{currencyName}</span>
      <span style={{ fontSize: 12, fontWeight: 'bold', color: '#000', marginLeft: 5 }}>{blockchain}</span>
    </div>
    <input
      type="radio"
      checked={selectedCurrency === blockchain}
      onChange={() => onSelect(blockchain)}
      style={{ marginRight: 10 ,background:"#000" ,color:'#000', }}
    />
  </button>
);


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
  


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setEmail("demo@gmail.com");
        setName("neeraj")
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
      } catch (error) {
        console.error(error);
      }
    };
  
    checkLoginStatus();
  }, []);

  useEffect(() => {
    resData();
  }, [name,email]);

const resData = async () => {

// const token = localStorage.getItem('tokenId');
const token = "28654|rLRwbVKY0wlyZE9qAp62HRLnGS4IDIdOT2s3TH5y";
// console.log("token",token);

  const result = await axios.get(baseUrl + "api-address", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (result.status === 200 ) {

    const parsedData = result.data.result.map(item => {
      return {
        ...item,
        api_address: item.api_address ? JSON.parse(item.api_address) : null,
      };
    });
// console.log("pasre data",parsedData);
setApiAddresses(parsedData);
  } else {
    console.log("error not get ezbuy data ");
  }
};

  const renderItem = ({ item }) => {
    if (!item.api_address) {
      return null;
    }

    const { address, datetime, trackid } = item.api_address[0];

    const copyToClipboard = async (text) => {

      await clipboard.writeText(text);
      toast.success("copied");

    };

    return (
      <div style={{ backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 5,width:'125%'}}>
        <p style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{address}</p>
        <button onClick={() => copyToClipboard(address)}>Copy Address</button>
        <p>{`Track ID: ${trackid}`}</p>
        <button onClick={() => copyToClipboard(trackid)}>Copy Track ID</button>
        <p>{`Date: ${datetime}`}</p>
      </div>
    );
  };

//   const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
    <div style={styles.container}>
              <Header name="Deposit" onBack={handleBackClick} />

      <div style={styles.body}>
        {/* <Header title="Add Money" /> */}
        <div style={{ alignItems: 'center', marginTop: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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
      <button
        onClick={handleNextButtonClick}
        style={{
          marginTop: 20,
          padding: 10,
          borderRadius: 5,
          backgroundColor: '#4CAF50',  // Green background
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Next
      </button>
    </div>
        {/* <div style={{   display:'flex',
    justifyContent:'center',
    alignItems:'center',
    }}>
          <button style={{ alignSelf: 'center', backgroundColor: '#EC8E22', width: '70%', height: '25%', borderRadius: 40 }} onClick={toggleModal}>
            All Address related to You
          </button>
        </div> */}
        <div style={{ marginTop: 5, height: 500 }}></div>
      </div>

{isModalVisible && (
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
)}



    </div>
  )
}

export default Deposit;

const styles = {
  container: {
    height: '100%',
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    backgroundColor: "#CDF1E5"
  },
  body: {
    height: '100%',
    width: '100%',
    backgroundColor: "white",
    // display:'flex',
    // justifyContent:'center',
    // alignItems:'center',
    // flexDirection:'column'
  },
  imageUsdt: {
    width: "15%",
    height: "15%",
    borderRadius: 10,
    borderWidth:'5px',

   margin:5
  },

modalContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#EC8E22',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '100%',
    maxHeight: '60%',
    overflowY: 'auto', 
marginBottom:100
  },
  closeButtonContainer: {
    width: '100%',
    // height: '20%',
    padding: '10px',
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: "#1B334D",
    width: "25%",
    height: '20%',
    borderRadius: 10,
  },
};
