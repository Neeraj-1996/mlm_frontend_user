import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { Colors } from '../../asset/Color';
import axios from 'axios';
import baseUrl from '../Url/Url';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const Paymoney = () => {
    const navigate = useNavigate();

    const [responseData, setResponseData] = useState(null);
    const [time, setTime] = useState(2700);
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    setTransactionMessage('Time expired');
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
    const [transactionMessage, setTransactionMessage] = useState('Transaction is not successful. Status: Waiting');
    const [name, setName] = useState('');
    const [gmail, setGmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState('');
    const [add, setAdd] = useState('');
    const [trackId, setTrackId] = useState('');
    const [network, setNetwork] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [loadingOne, setlodingone] = useState(false);
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const data = Object.fromEntries(urlParams.entries());
        console.log("Received data:", data);
        setResponseData(data)
    }, []);
    useEffect(() => {
        if (responseData) {
            // const intervalId = setInterval(() => {
            //     handleRequestMoney();
            //   }, 5000);
            setImage(responseData.QRCode);
            setLoading(false);
            setAdd(responseData.address);
            setTrackId(responseData.trackId);
            setNetwork(responseData.network);
            setGmail(responseData.email);
            setName(responseData.description);
            // return () => clearInterval(intervalId);

            const poll = () => {
                handleRequestMoney();
                // Use requestAnimationFrame to set up the next call to poll
                setTimeout(() => {
                  requestAnimationFrame(poll);
                }, 5000); // 5 seconds interval
              };
        
              poll();
        }
    }, [responseData]);

    // useEffect(() => {
    //     const intervalId = setInterval(handleRequestMoney, 5000); // Poll every 5 seconds
    //     return () => clearInterval(intervalId); // Clean up interval on component unmount
    //   }, [trackId, sendToSecondAPICalled]); // Add dependencies if needed
    


    let startIndex;
    let prefix;
    if (image.includes('polygon:')) {
        startIndex = image.indexOf('polygon:') + 'polygon:'.length;
        prefix = 'polygon:';
    }
    // Check if "bnb:" is present
    else if (image.includes('bnb:')) {
        startIndex = image.indexOf('bnb:') + 'bnb:'.length;
        prefix = 'bnb:';
    }
    else if (image.includes('tron:')) {
        startIndex = image.indexOf('tron:') + 'tron:'.length;
        prefix = 'tron:';
    }

    else {
        startIndex = 0;
        prefix = '';
    }

    const endIndex = image.indexOf('?amount=3');
    const addressPart = image.substring(startIndex, endIndex !== -1 ? endIndex : image.length);
    const newUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${addressPart}`;
    const [sendToSecondAPICalled, setSendToSecondAPICalled] = useState(false);
    const demo = async (text) => {
        await navigator.clipboard.writeText(text);
        console.log(`Copied to clipboard: ${text}`);
        toast.success("address copied");
    };



    const handleRequestMoney = async (event) => {
        // console.log("jai shree ram")

        try {
            const response = await axios.post(
                'https://api.oxapay.com/merchants/inquiry',
                {
                    merchant: "NCV36N-GTMR3L-6XHTHD-62W176",
                    trackId: trackId,
                    // "trackId": "26186222"


                }
            );

            if (response.data.result === 100) {
                // console.log("fdasdfa hhandleRequest ", response.data);
                const status = response.data.status;
                if (status === "Paid" && !sendToSecondAPICalled) {
                    const amount = response.data.payAmount;
                    //   sendToSecondAPI(response.data);
                    // setSendToSecondAPICalled(true);
                    setTransactionMessage("Transaction is successful. Status: Paid");
                } else if (status === "Waiting") {
                    setTransactionMessage("Transaction is not successful. Status: Waiting");
                }

            } else {
                console.log("API Error:", response.data.message);
                // Handle other cases here
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const sendToSecondAPI = async (responceData) => {
        // console.log(" raja ram bakth hamnuman out", responceData);
        try {
         const dataForSecondAPI = {
            payment_id: responceData.trackId,
            txid: responceData.txID,
            address: responceData.address,
            amount: responceData.payAmount,
            type: "credit",
            wallet_name: responceData.email,
            coin_short_name: responceData.currency,
            wallet_id: "User wallet id",
            merchant_id: "shree ram",
            confirmations: "yes",
            date: responceData.date,
            explorer_url: responceData.description,
          };

    const token = localStorage.getItem("tokenId");
          const response = await axios.post(
            baseUrl + "deposite",
            dataForSecondAPI,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
       if (response.data && response.data.status === 200) {

            setTransactionStatus("Paid");
            toast.success("Money Added  successful");
  
          } else {
            console.error('The second API response indicates an error or status is not 200:', response.data);

          }
        } catch (error) {
          console.error("Error sending data to the second API:", error);

        }
      };


    useEffect(() => {
        if (transactionStatus === "Paid") {
            setShowSuccess(true);
            setTimeout(() => {

                navigate("/Wallet")
            }, 10000);
        
        }
    }, [transactionStatus]);



    useEffect(() => {
        const intervalId = setInterval(handleRequestMoney, 5000);
        return () => clearInterval(intervalId); 
      }, [trackId, sendToSecondAPICalled]); 

    //   const navigate = useNavigate();
      const handleBackClick = () => {
        navigate(-1); // Navigates back to the previous page
      };
    return (
    <div style={styles.container}>
              <Header name="Pay Money" onBack={handleBackClick} />

            <div style={styles.body}>
                {/* <Header title="Deposit" showAlert={true} /> */}
                {transactionStatus !== "Paid" ? (
                    <div style={{ height: '100%', width: '100%' }}>
                        <div style={{ backgroundColor: '#00d1e0', height: '65%' }}>
                            {(loading || loadingOne) ? (
                                <div style={{ height: '40%', width: '100%' }}>
                                    {loading ? <p style={{ alignSelf: 'center', position: 'absolute', bottom: '20%', color: 'white' }}>creating wallet address...</p> : null}
                                    {loadingOne ? <p style={{ alignSelf: 'center', position: 'absolute', bottom: '20%', color: 'white' }}>validating wallet address...</p> : null}
                                    {/* <ActivityIndicator size={'large'} color={'#EC8E22'} style={{ alignSelf: 'center', position: 'absolute', bottom: '-20%' }} /> */}
                                    <p style={{ alignSelf: 'center', position: 'absolute', bottom: '40%', color: '#EC8E22' }}>Loading...</p>
                                </div>
                            ) : (



                                <div style={{ width: '100%' }}>
                                    <div style={{ backgroundColor: "#0fdser", width: '100%', padding: 10,display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'column' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                            {/* <h5 style={{ color: '#fff', }}>{name}</h5> */}
                                          
                                            <h6 style={{ color: "#000", }}>Minmum deposit value 5 USDT</h6>
                                         
                                            <h6 style={{ color: '#fff', marginTop: 30 }}>{network}</h6>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                            <img src={newUrl} alt="QR Code" />
                                        </div>
                                        <h6 style={{ color: '#fff', }}>{gmail}</h6>
                                        <div style={{ border: '1px solid #EC8E22', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', margin: 20 ,width: '97%',}}>
                                            <h6 style={{ color: '#000', fontSize: 15 }}>{add}</h6>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                            <button onClick={() => demo(add)}  >Copy Wallet Address</button>
                                        </div>
                                        <div style={{ border: '1px solid #EC8E22', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', margin: 20 ,width: '50%',}}>
                                            <h6 style={{ color: '#000', fontSize: 15 }}>{trackId}</h6>
                                        </div>
                                    </div>

                                </div>

                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <h6>Transaction Time</h6>
                                <h6 style={{ fontSize: 15, color: 'red', fontWeight: '800', marginLeft: 10 }}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h6>
                            </div>
                            <p>{transactionMessage}</p>
                        </div>
                        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <button onClick={handleRequestMoney}>Check Status</button>
                        </div> */}
                    </div>
                ) : (
                    <div>
                        {showSuccess ? (
                            <div style={{height: '100%',width:'100%'}}>
                                <div style={{ height: '100%',width:'100%', justifyContent: 'center',alignItems:'center',display:'flex',flexDirection:'column' }}>
                                    <div style={{height: '30%', width: '50%', marginLeft: 10, borderRadius: 50, borderColor: "green", borderWidth: 2 }}>
                                        {/* <img

                                            src={require('../../asset/images/gif/checkSmart.gif')}
                                            style={{ width: 200, height: 200, borderRadius: 10, alignSelf: "center" }} /> */}
                                    </div>
                                </div>
                                <div style={{ height: '80%', alignItems: "center" ,justifyContent: 'center',alignItems:'center',display:'flex',flexDirection:'column'}}>
                                    <div style={{ flexDirection: 'row',display:'flex' }}>
                                        <p style={{ color: 'red' ,marginRight:10}}>Dear   </p>
                                        <p style={{ color: 'red' }}> Your transaction is under </p>
                                    </div>
                                    <p style={{ color: 'red' }}>Process Please Wait</p>
                                    <p style={{ color: 'green' }}>When its done you will redirect on wallet screen</p>
                                    <p style={{ color: 'green' }}>redirect on wallet screen</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p>Transaction not successful</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Paymoney;

const styles = {
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: 70,
        marginBottom: 300


    },
};

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