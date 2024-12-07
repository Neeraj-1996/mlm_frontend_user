import React, { useEffect, useState } from "react";
import axios from "axios";
import baseWallet from "../../../src_admin/screen/urlWallet";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import "./PaymentRequests.css"; // Assuming you will add some custom styles here

const PaymentRequests = () => {
  const navigate = useNavigate();
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const fetchPaymentRequests = async () => {
      const myHeaders = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.post(
          `${baseWallet}payment-requests?userId=${userId}`,
          {},
          { headers: myHeaders }
        );

        if (response.data.success) {
          setPaymentRequests(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Error fetching payment requests");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentRequests();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="containerDeposit">
      <Header name="Payment Requests" onBack={handleBackClick} />
      <div className="bodyDepsoitY">
      <div className="cardContainer">
        {paymentRequests.length > 0 ? (
          paymentRequests.map((request) => (
            <div key={request._id} className="cardShowaddress">
              <div className="cardHeader">
                <h6>Track Id {request.transactionId}</h6>
              </div>
              <div className="cardBody">
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ width: "50%" }}>{request.email}</p>
                  <p style={{ width: "50%" }}>
                    <strong>Mobile:</strong> {request.description}
                  </p>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ width: "50%" }}>
                    <strong>Amount:</strong> {request.balance}
                  </p>
                  <p style={{ width: "50%" }}>
                    <strong>Currency:</strong> {request.currency}
                  </p>
                </div>

                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    <strong>Address:</strong>
                  </p>
                  <p style={{ fontSize: "13px" }}>{request.address}</p>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    <strong>Status:</strong> {request.reference}
                  </p>
                  <p> {new Date(request.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No payment requests found.</div>
        )}
      </div>
      </div>
    </div>
  );
};

export default PaymentRequests;
