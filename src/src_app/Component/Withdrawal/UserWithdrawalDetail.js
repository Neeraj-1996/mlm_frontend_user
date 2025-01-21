import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchUserWithdrawal } from '../Navigation/Allapi';
import Header from '../Header/Header';
import axios from 'axios';
import '.././Tranasaction/DepositTransaction.css';
import baseUrlapp from '../Url/Urlapp';

const WithdrawalTransaction = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBackClick = () => navigate(-1);

  const resultDataTransaction = async () => {
    const mobileNo = localStorage.getItem("mobileNo");
    console.log("mobileNo", mobileNo);
  
    try {
      const fetchData = await fetchUserWithdrawal();
      console.log("fetchUserWithdrawal", fetchData);
  
      // Filter fetchData based on the mobile number
      const filteredData = fetchData.filter(transaction => transaction.mobile === mobileNo);
  
      console.log("Filtered Data", filteredData);
  
      // Set filtered data to the state
      setTransactions(filteredData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    resultDataTransaction();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleStatusChange = async (id, newStatus,request) => {
    const confirmation = window.confirm(
      `Are you sure you want to ${
        newStatus === "Approved" ? "approve" : "reject"
      } this request?`
    );

    if (!confirmation) {
      return; // Exit if the user cancels
    }

    const accessTokenUser = localStorage.getItem("accessToken");
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseUrlapp}withdrawalrequest/status`,

         { id, status: newStatus ,userId:request.userId, address:request.address, amount:request.amount , },
        {
          headers: { Authorization: `Bearer ${accessTokenUser}` },
        }
      );

      if (response.status === 200) {
      
        resultDataTransaction();
      }
    } catch (error) {
      // setAlertMessage("Error updating status");
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
      // setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
    }
  };

  return (
    <div className="containerDeposit">
      <Header name="Withdrawal Detail" onBack={handleBackClick} />
      <div className='bodyWithdral'>
      <div className="transaction-Withdrawal">
        
        <div className="scrollView">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction._id} className="cardTrans">
                <p className="transactionDetail">Address: {transaction.address}</p>
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-between" }}>
                  <p className="transactionDetail">Amount: {transaction.amount}</p>
                  <p className="transactionDetail">Final Amount: {transaction.finalAmount}</p>
                </div>
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-between" }}>
                  <p className="transactionDetail">Mobile: {transaction.mobile}</p>
                  <p className="transactionDetail">
                  Status: {transaction.status === 'Rejected' ? 'Cancelled by User' : transaction.status}
                </p>
                </div>
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-between" }}>
                  <p className="transactionDetail">Date: {new Date(transaction.createdAt).toLocaleString()}</p>
                  {transaction.status !== 'Cancelled by Admin' && transaction.status !== 'Rejected' && (
                    <button
                      onClick={() => handleStatusChange(transaction._id, "Rejected", transaction)}
                      className="cancelButton"
                      style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className="no-data-message">No withdrawals available</div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default WithdrawalTransaction;
