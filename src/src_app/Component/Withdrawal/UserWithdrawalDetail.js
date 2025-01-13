import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchUserWithdrawal } from '../Navigation/Allapi';
import Header from '../Header/Header';
import '.././Tranasaction/DepositTransaction.css';

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
                  <p className="transactionDetail">Status: {transaction.status}</p>
                </div>
                <p className="transactionDetail">
                  Date: {new Date(transaction.createdAt).toLocaleString()}
                </p>
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
