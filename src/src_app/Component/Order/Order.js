import React, { useState, useEffect } from "react";
import "./SlotMachine.css";
import logo from "../../asset/logo/logo2.png";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const navigate = useNavigate();
  const [slot1, setSlot1] = useState([logo, logo, logo]);
  const [slot2, setSlot2] = useState([logo, logo, logo]);
  const [slot3, setSlot3] = useState([logo, logo, logo]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinning1, setSpinning1] = useState(false);
  const [spinning2, setSpinning2] = useState(false);
  const [spinning3, setSpinning3] = useState(false);
  const [result, setResult] = useState("");
  const [productData, setProductData] = useState(null);

  const getLogoImages = () => Array.from({ length: 3 }, () => logo);

  const spinSlots = () => {
    setIsSpinning(true);
    setSpinning1(true);
    setSpinning2(true);
    setSpinning3(true);
    setResult("");

    // Spin the slots initially with logo images
    setSlot1(getLogoImages());
    setSlot2(getLogoImages());
    setSlot3(getLogoImages());

    // Fetch product data
    const token = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch("http://localhost:9001/api/grab/grabProduct", {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        setProductData(data.data); // Store API result in state

        // Start the slot animations
        setTimeout(() => {
          // Change the slots to the product image after the loading time
          setSlot1(Array.from({ length: 3 }, () => data.data.productImg));
          setSpinning1(false);
        }, 10000); // Show logo images for the first 10 seconds

        setTimeout(() => {
          setSlot2(Array.from({ length: 3 }, () => data.data.productImg));
          setSpinning2(false);
        }, 11000); // Show logo images for the first 11 seconds

        setTimeout(() => {
          setSlot3(Array.from({ length: 3 }, () => data.data.productImg));
          setSpinning3(false);
          setIsSpinning(false);
          setResult("🎉 Product Fetched! 🎉");
        }, 12000); // Show logo images for the first 12 seconds
      })
      .catch((error) => console.error("API Error:", error));
  };

  const handleBackClick = () => navigate(-1);

  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    resultData();
  }, []);

  const resultData = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `http://localhost:9001/api/grab/grabProductsUser?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const userData = response.data;
      setOrderDetails(userData); // Set order details
      console.log("User level data:", userData);
    } catch (error) {
      console.error("Error fetching user level:", error);
    }
  };

  return (
    <div>
      <Header name="Vertex Venture" onBack={handleBackClick} />
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <div className="slot-machine-card">
          <div className="slot-card">
            <div className={`slot ${spinning1 ? "spinning" : ""}`}>
              {slot1.map((img, index) => (
                <div className="image-card" key={index}>
                  <img
                    src={img}
                    alt="Symbol"
                    // style={{ width: "50px", height: "auto" }}
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

        <button
          onClick={spinSlots}
          style={{
            // padding: "10px 10px",
            // fontSize: "20px",
            // cursor: isSpinning ? "not-allowed" : "pointer",
          }}
          disabled={isSpinning}
        >
          {isSpinning ? "Vantures..." : "Vortex 🎰"}
        </button>

        {/* <div style={{ marginTop: "20px", fontSize: "24px" }}>{result}</div> */}

        {productData && (
          <div className="modal">
            <div className="modal-content">
              <button
                className="close-button-order"
                onClick={() => setProductData(null)}
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
              <button
                className="done-button"
                onClick={() => setProductData(null)}
              >
                Done
              </button>
            </div>
          </div>
        )}

        <div className="orderGrid">
          {orderDetails.length === 0 ? (
            <p>No order details available.</p>
          ) : (
            <div className="orderGrid">
              {orderDetails.map((item) => (
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
