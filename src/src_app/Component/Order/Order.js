import React, { useState, useEffect } from "react";
import "./SlotMachine.css";
import logo from "../../asset/logo/logo2.png";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import grabUrlapp from "../Url/graburl";
import "react-toastify/dist/ReactToastify.css";
import api from "../Navigation/api";
import {
  fetchUserOrders,
  fetchUserBalance,
  fetchGrabCountShareCount,
} from "../Navigation/Allapi";

const Order = () => {
  const navigate = useNavigate();
  const [slot1, setSlot1] = useState([logo, logo, logo]);
  const [slot2, setSlot2] = useState([logo, logo, logo]);
  const [slot3, setSlot3] = useState([logo, logo, logo]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinning1, setSpinning1] = useState(false);
  const [spinning2, setSpinning2] = useState(false);
  const [spinning3, setSpinning3] = useState(false);
  const [productData, setProductData] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [grabCount, setGrabCount] = useState(0);

  const handleBackClick = () => navigate(-1);

  const isToday = (date) => {
    const today = new Date();
    const orderDate = new Date(date);
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  };

  // const todayOrders = orderDetails.filter((item) => isToday(item.buyDate));
  const todayOrders = Array.isArray(orderDetails)
    ? orderDetails.filter((item) => isToday(item.buyDate))
    : [];

  // Reverse the filtered orders for today
  const reversedTodayOrders = [...todayOrders].reverse();

  const resultDataOrder = async () => {
    try {
      const orderData = await fetchUserOrders();
      // setOrderDetails(orderData);
      setOrderDetails(Array.isArray(orderData) ? orderData : []);
      console.log("fsdfs", orderData);
    } catch (error) {
      console.error(error);
    }
  };

  const resultDataTranasaction = async () => {
    try {
      const featchData = await fetchUserBalance();
      setBalance(featchData.balance);
    } catch (error) {
      console.error(error);
    }
  };

  const resultDataGrabCount = async () => {
    try {
      const featchData = await fetchGrabCountShareCount();
   
      setGrabCount(featchData.grabCountDtl);
    } catch (error) {
      console.error(error);
    }
  };

  const getLogoImages = () => Array.from({ length: 3 }, () => logo);

  const spinSlots = () => {
    setIsSpinning(true);
    setSpinning1(true);
    setSpinning2(true);
    setSpinning3(true);

    // Spin the slots initially with logo images
    setSlot1(getLogoImages());
    setSlot2(getLogoImages());
    setSlot3(getLogoImages());

    api
      .post(grabUrlapp + "grabProduct")
      .then((response) => {
        const data = response.data;

        // Check if the statusCode is 200 and handle based on the message
        if (
          data.statusCode === 200 &&
          data.message ===
            "You have reached the maximum number of calls for today."
        ) {
          setShowModal(true);
          setIsSpinning(false);
          setSpinning1(false);
          setSpinning2(false);
          setSpinning3(false);
          return; // Exit the function early
        }

        // Handle the normal case where the API returned product data
        if (data.statusCode === 200) {
          setProductData(data.data); // Store API result in state
          // resultData(); // Your resultData function call (if necessary)
          fetchUserBalance();
          // resultDataOrder();
         
          setTimeout(() => {
            setSlot1(Array.from({ length: 3 }, () => data.data.productImg));
            setSpinning1(false);
          }, 10000);

          setTimeout(() => {
            setSlot2(Array.from({ length: 3 }, () => data.data.productImg));
            setSpinning2(false);
          }, 11000);

          setTimeout(() => {
            setSlot3(Array.from({ length: 3 }, () => data.data.productImg));
            setSpinning3(false);
            setIsSpinning(false);
          }, 12000);
        } else {
          // console.error("Unexpected response:", data);
          alert("An error occurred. Please try again later.");
          setIsSpinning(false);
          setSpinning1(false);
          setSpinning2(false);
          setSpinning3(false);
        }
      })
      .catch((error) => {
        // console.error("API Error:", error);
        alert("An error occurred while fetching product data.");
        setIsSpinning(false);
        setSpinning1(false);
        setSpinning2(false);
        setSpinning3(false);
      });
  };

  useEffect(() => {
    resultDataOrder();
    resultDataTranasaction();
    resultDataGrabCount();
  }, []);

  const handleDoneClick = () => {
    setProductData(null);
    resultDataOrder();
    resultDataTranasaction();
    resultDataGrabCount();
  };
  

  return (
    <div>
      <Header name="Vortex Vantures" onBack={handleBackClick} />
      <div style={{ textAlign: "center", marginTop: "80px",alignItems:'center' }}>
        <div className="slot-machine-card">
          <div className="slot-card">
            <div className={`slot ${spinning1 ? "spinning" : ""}`}>
              {slot1.map((img, index) => (
                <div className="image-card" key={index}>
                  <img
                    src={img}
                    alt="Symbol"
                  
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="slot-card">
            <div className={`slot ${spinning2 ? "spinning" : ""}`}>
              {slot2.map((img, index) => (
                <div className="image-card" key={index}>
                  <img
                    src={img}
                    alt="Symbol"
                    // style={{ width: "100px", height: "auto" }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="slot-card">
            <div className={`slot ${spinning3 ? "spinning" : ""}`}>
              {slot3.map((img, index) => (
                <div className="image-card" key={index}>
                  <img
                    src={img}
                    alt="Symbol"
                    // style={{ width: "100px", height: "auto" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <button
            onClick={spinSlots}
            className="tab"
            style={{
              padding: "10px 10px",
              fontSize: "20px",
              cursor: isSpinning ? "not-allowed" : "pointer",
            }}
            disabled={isSpinning}
          >
            {isSpinning ? "Vantures..." : "Vortex 🎰"}
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "0px",
            }}
          >
            <span style={{ marginLeft: "10px", fontSize: "18px" }}>
              Balance {balance.toFixed(2)}
            </span>
            <span style={{ fontSize: "18px" }}>
              Grab Count {grabCount.grabCount}
            </span>
          </div>
        </div>


        {productData && (
          <div className="modalorder">
            <div className="modal-contentOrder">
              <button
                className="close-button-order"
                // onClick={() => setProductData(null)}
                onClick={handleDoneClick}
              >
                &times;
              </button>
              <h3>Product Details</h3>
              <div style={{ flexDirection: "row", display: "flex" }}>
                <img src={productData.productImg} alt="Product" />
                <div>
                  <p className="modal-contentp">
                    Product Name: {productData.productName}
                  </p>
                  <p className="modal-contentp">
                    Price: ${productData.productPrice}
                  </p>
                  <p className="modal-contentp">
                    Commission: {productData.grabCommission}
                  </p>
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <button
                className="done-button"
                // onClick={() => setProductData(null)}
                onClick={handleDoneClick}
              >
                Done
              </button>
              </div>
            </div>
          </div>
        )}
        
        {showModal && (
          <div className="modalorder">
            <div className="modal-contentOrder">
              <button
                className="close-button-order"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h3>Your vatrex is full for today</h3>
              <p>
                You have reached the maximum number of vatrex for today. Please
                try again tomorrow.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  className="done-button"
                  onClick={() => setShowModal(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="orderGrid">
          {orderDetails.length === 0 ? (
            <p>No order details available.</p>
          ) : todayOrders.length === 0 ? (
            <p>No product found today.</p>
          ) : (
            <div className="orderGrid">
              {reversedTodayOrders.map((item) => (
                <div key={item._id} className="orderCard">
                  <div>
                    {item.productImg && (
                      <img
                        src={item.productImg}
                        alt={item.productName}
                        className="productImageOrder"
                      />
                    )}
                  </div>
                  <div className="orderContent">
                    <h6 className="productNameOrder">{item.productName}</h6>
                    <p className="priceorder">Price: ${item.productPrice}</p>
                    <p className="commissionOder">
                      Commission: ${item.grabCommission.toFixed(2)}
                    </p>
                    <p className="buyDate">
                      Buy Date: {new Date(item.buyDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;

{
  /* <div className="orderGrid">
      {orderDetails.length === 0 ? (
        <p>No order details available.</p>
      ) : (
        <div className="orderGrid">
          {(todayOrders.length > 0 ? reversedTodayOrders : orderDetails).map((item) => (
            <div key={item._id} className="orderCard">
              <div>
                {item.productImg && (
                  <img
                    src={item.productImg}
                    alt={item.productName}
                    className="productImageOrder"
                  />
                )}
              </div>
              <div className="orderContent">
                <h6 className="productNameOrder">{item.productName}</h6>
                <p className="priceorder">Price: ${item.productPrice}</p>
                <p className="commissionOder">
                  Commission: ${item.grabCommission.toFixed(2)}
                </p>
                <p className="buyDate">
                  Buy Date: {new Date(item.buyDate).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div> */
}

// const resultData = async () => {
//   const userId = localStorage.getItem("userId");
//   try {
//     const response = await api.post(grabUrlapp+`grabProductsUser?user_id=${userId}`);
//     const userData = response.data;
//     setOrderDetails(userData); // Set order details
//     console.log("User level data:", userData);
//   } catch (error) {
//     console.error("Error fetching user level:", error);
//   }
// };

// const fetchTransactions = async () => {
//   try {
//     const response = await api.get(`${baseWallet}balanceUser?userId=${userId}`);
//     if (response.data.success) {
//      setBalance(response.data.data.balance);
//     }
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//   }
// };

// const spinSlots = () => {
//   setIsSpinning(true);
//   setSpinning1(true);
//   setSpinning2(true);
//   setSpinning3(true);

//   // Spin the slots initially with logo images
//   setSlot1(getLogoImages());
//   setSlot2(getLogoImages());
//   setSlot3(getLogoImages());

//   // Fetch product data
//   const token = localStorage.getItem("accessToken");
//   const myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${token}`);

//   fetch(grabUrlapp + "grabProduct", {
//     method: "POST",
//     headers: myHeaders,
//     redirect: "follow",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Check if the statusCode is 200 and handle based on the message
//       if (data.statusCode === 200 && data.message === "You have reached the maximum number of calls for today.") {
//         // If the user has reached the max number of calls, show the alert
//         // alert("Your vatrex full for today.");
//         setShowModal(true);
//         setIsSpinning(false);  // Stop the spinning
//         setSpinning1(false);
//         setSpinning2(false);
//         setSpinning3(false);
//         return;  // Exit the function early
//       }

//       // Handle the normal case where the API returned product data
//       if (data.statusCode === 200) {
//         setProductData(data.data);  // Store API result in state
//         resultData();  // Your resultData function call (if necessary)
//         fetchTransactions();
//         // Start the slot animations
//         setTimeout(() => {
//           setSlot1(Array.from({ length: 3 }, () => data.data.productImg));
//           setSpinning1(false);
//         }, 10000); // Show logo images for the first 10 seconds

//         setTimeout(() => {
//           setSlot2(Array.from({ length: 3 }, () => data.data.productImg));
//           setSpinning2(false);
//         }, 11000); // Show logo images for the first 11 seconds

//         setTimeout(() => {
//           setSlot3(Array.from({ length: 3 }, () => data.data.productImg));
//           setSpinning3(false);
//           setIsSpinning(false);  // Stop the spinning
//         }, 12000); // Show logo images for the first 12 seconds
//       } else {
//         // If statusCode is not 200 or any other unexpected response
//         console.error("Unexpected response:", data);
//         alert("An error occurred. Please try again later.");
//         setIsSpinning(false);
//         setSpinning1(false);
//         setSpinning2(false);
//         setSpinning3(false);
//       }
//     })
//     .catch((error) => {
//       console.error("API Error:", error);
//       alert("An error occurred while fetching product data.");
//       setIsSpinning(false);
//       setSpinning1(false);
//       setSpinning2(false);
//       setSpinning3(false);
//     });
// };

// const spinSlots = () => {
//   setIsSpinning(true);
//   setSpinning1(true);
//   setSpinning2(true);
//   setSpinning3(true);
//   // setResult("");

//   // Spin the slots initially with logo images
//   setSlot1(getLogoImages());
//   setSlot2(getLogoImages());
//   setSlot3(getLogoImages());

//   // Fetch product data
//   const token = localStorage.getItem("accessToken");
//   const myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${token}`);

//   fetch(grabUrlapp+"grabProduct", {
//     method: "POST",
//     headers: myHeaders,
//     redirect: "follow",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       setProductData(data.data); // Store API result in state
//       resultData();
//       // Start the slot animations
//       setTimeout(() => {
//         // Change the slots to the product image after the loading time
//         setSlot1(Array.from({ length: 3 }, () => data.data.productImg));
//         setSpinning1(false);
//       }, 10000); // Show logo images for the first 10 seconds

//       setTimeout(() => {
//         setSlot2(Array.from({ length: 3 }, () => data.data.productImg));
//         setSpinning2(false);
//       }, 11000); // Show logo images for the first 11 seconds

//       setTimeout(() => {
//         setSlot3(Array.from({ length: 3 }, () => data.data.productImg));
//         setSpinning3(false);
//         setIsSpinning(false);
//         // setResult("🎉 Product Fetched! 🎉");
//       }, 12000); // Show logo images for the first 12 seconds
//     })
//     .catch((error) => console.error("API Error:", error));
// };

// import React, { useState } from "react";
// import "./SlotMachine.css"; // Ensure you have the necessary custom CSS here
// import logo from '../../asset/logo/logo2.png'; // Logo image
// import coin from "../../asset/images/coins/bnb.png"; // Coin image
// import Header from "../Header/Header";
// import { useNavigate } from 'react-router-dom';

// const Order = () => {
//   const navigate = useNavigate();
//   const [slot1, setSlot1] = useState([logo, logo, logo]);
//   const [slot2, setSlot2] = useState([logo, logo, logo]);
//   const [slot3, setSlot3] = useState([logo, logo, logo]);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [spinning1, setSpinning1] = useState(false);
//   const [spinning2, setSpinning2] = useState(false);
//   const [spinning3, setSpinning3] = useState(false);
//   const [result, setResult] = useState("");

//   // Function to get the initial logo image in all slots
//   const getLogoImages = () => {
//     return Array.from({ length: 3 }, () => logo); // Display logo image in all 3 slots
//   };

//   // localhost:9001/api/grab/grabProduct

//   // Function to get the coin images after 5 seconds
//   const getCoinImages = () => {
//     return Array.from({ length: 3 }, () => coin); // Display coin image in all 3 slots
//   };

//   const spinSlots = () => {
//     setIsSpinning(true);
//     setSpinning1(true);
//     setSpinning2(true);
//     setSpinning3(true);
//     setResult(""); // Clear previous result

//     // Initially spin and show logo images
//     setSlot1(getLogoImages());
//     setSlot2(getLogoImages());
//     setSlot3(getLogoImages());

//     // After 5 seconds, replace logo with coin images in each slot
//     setTimeout(() => {
//       setSlot1(getCoinImages());
//       setSpinning1(false); // Stop Slot 1 visually
//     }, 5000); // Slot 1 shows logo for 5s, then switches to coin

//     setTimeout(() => {
//       setSlot2(getCoinImages());
//       setSpinning2(false); // Stop Slot 2 visually
//     }, 5500); // Slot 2 shows logo for 5s, then switches to coin

//     setTimeout(() => {
//       setSlot3(getCoinImages());
//       setSpinning3(false); // Stop Slot 3 visually
//       setIsSpinning(false); // End spinning after all slots stop
//       setResult("🎉 Coins are here! 🎉"); // Customize the result message
//     }, 6000); // Slot 3 shows logo for 5s, then switches to coin
//   };
//   const handleBackClick = () => {
//     navigate(-1); // Navigate back to the previous page
//   };

//   return (
//     <div>
//       <Header name="Vertex Venture" onBack={handleBackClick} />
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       {/* <h1>Slot Machine - Order</h1> */}

//       {/* Slot Machine Card */}
//       <div className="slot-machine-card">
//         {/* Slot 1 */}
//         <div className="slot-card">
//           <div className={`slot ${spinning1 ? "spinning" : ""}`}>
//             {slot1.map((img, index) => (
//               <div className="image-card" key={index}>
//                 <img src={img} alt="Symbol" style={{ width: '100px', height: 'auto' }} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Slot 2 */}
//         <div className="slot-card">
//           <div className={`slot ${spinning2 ? "spinning" : ""}`}>
//             {slot2.map((img, index) => (
//               <div className="image-card" key={index}>
//                 <img src={img} alt="Symbol" style={{ width: '100px', height: 'auto' }} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Slot 3 */}
//         <div className="slot-card">
//           <div className={`slot ${spinning3 ? "spinning" : ""}`}>
//             {slot3.map((img, index) => (
//               <div className="image-card" key={index}>
//                 <img src={img} alt="Symbol" style={{ width: '100px', height: 'auto' }} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={spinSlots}
//         style={{
//           padding: "10px 20px",
//           fontSize: "20px",
//           cursor: isSpinning ? "not-allowed" : "pointer",
//         }}
//         disabled={isSpinning}
//       >
//         {isSpinning ? "Vantures..." : "Vortex 🎰"}
//       </button>

//       <div style={{ marginTop: "20px", fontSize: "24px" }}>{result}</div>
//     </div>
//     </div>
//   );
// };

// export default Order;
