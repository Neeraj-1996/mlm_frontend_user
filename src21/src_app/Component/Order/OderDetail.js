import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './OrderDetai.css';
import Header from "../Header/Header";
import { fetchUserOrders } from "../Navigation/Allapi";
const OrderDetail = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("today");

  useEffect(() => {
    resultDataOrder();
  }, []);

  const  resultDataOrder= async () => {
    try {
      const orderData = await fetchUserOrders();
      setOrderDetails(orderData);
      setFilteredOrders(filterOrders(orderData, activeTab));
    } catch (error) {
      console.error(error);
    }
  };
 
  // Filter the orders based on the selected time period (Today, This Week, This Month)
  const filterOrders = (orders, period) => {
    const today = new Date();
    let filteredOrders;

    switch (period) {
      case "week":
        // Show orders from the past week
        const weekStart = new Date(today.setDate(today.getDate() - 7));
        filteredOrders = orders.filter(item => new Date(item.buyDate) >= weekStart);
        break;
      case "month":
        // Show orders from the past month
        const monthStart = new Date(today.setMonth(today.getMonth() - 1));
        filteredOrders = orders.filter(item => new Date(item.buyDate) >= monthStart);
        break;
      case "today":
      default:
        // Show orders from today
        const todayStart = new Date(today.setHours(0, 0, 0, 0));
        filteredOrders = orders.filter(item => new Date(item.buyDate) >= todayStart);
        break;
    }
    
    return filteredOrders;
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilteredOrders(filterOrders(orderDetails, tab)); // Filter orders when tab changes
  };

  // Handle back navigation
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="containerOrder">
      <Header name="OrderDetail" onBack={handleBackClick} />
      <div style={{ marginTop: "70px" }}>
      <div className="tabs">
        <button
          className={`tab ${activeTab === "today" ? "active" : ""}`}
          onClick={() => handleTabChange("today")}
        >
          Today
        </button>
        <button
          className={`tab ${activeTab === "week" ? "active" : ""}`}
          onClick={() => handleTabChange("week")}
        >
          This Week
        </button>
        <button
          className={`tab ${activeTab === "month" ? "active" : ""}`}
          onClick={() => handleTabChange("month")}
        >
          This Month
        </button>
      </div>

    
        {filteredOrders.length === 0 ? (
          <p>No order details available.</p>
        ) : (
          <div className="orderGrid">
            {filteredOrders.map((item) => (
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
  );
};

export default OrderDetail;

 // const resultData = async () => {
  //   const userId = localStorage.getItem("userId");
  //   const token = localStorage.getItem("accessToken");

  //   try {
  //     const response = await axios.post(
  //       grabUrlapp+`grabProductsUser?user_id=${userId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const userData = response.data;
  //     setOrderDetails(userData); // Set all order details
  //     setFilteredOrders(filterOrders(userData, activeTab)); // Filter orders based on active tab
  //     console.log("User level data:", userData);
  //   } catch (error) {
  //     console.error("Error fetching user level:", error);
  //   }
  // };