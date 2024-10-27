import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrlapp from "../Url/Urlapp";
import './OrderDetai.css';
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
const OrderDetail = () => {
    const navigate = useNavigate();
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

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
    <div className="containerOrder">
      {/* <h1>Order Details</h1> */}
      <Header name="OrderDetail" onBack={handleBackClick} />
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
  );
};

export default OrderDetail;
