import React, { useEffect, useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './DepositTransaction.css'; // Import the CSS file
import Header from '../Header/Header';

const DepositTransaction = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  // const userId = '66f240b45ddf0199a8dbfd8c'; // Replace with the actual user ID
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`http://localhost:9001/api/wallet/balanceUser?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });

        if (response.data.success) {
          setBalance(response.data.data.balance);
          setTransactions(response.data.data.transactions);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader component
  }

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="container">
      <Header name="Transaction" onBack={handleBackClick} />
      <div className="balance-section1">
        <h2 className="balance">Current Balance: ${balance.toFixed(2)}</h2>
      </div>
      <div className='transaction-deposit1'>
        <div className="scrollView">
          {transactions.map((transaction) => (
            <div 
              key={transaction._id} 
              className={`cardTrans ${transaction.transactionType === 'Deposit' ? 'deposit' : transaction.transactionType === 'withdrawal' ? 'withdrawal' : ''}`}
            >
              <h4 className="transactionType">{transaction.transactionType}</h4>
              <p className="transactionDetail">Transaction ID: {transaction.transactionId}</p>
              <div style={{flexDirection:'row',display:'flex',justifyContent:"space-between"}}>
              {/* <p className="transactionDetail">Credit: ${transaction.credit}</p> */}
              {transaction.transactionType === 'withdrawal' ? (
                <p className="transactionDetail">Debit: ${transaction.debit}</p> // Show debit for withdrawals
              ) : (
                <p className="transactionDetail">Credit: ${transaction.credit}</p> // Show credit for deposits
              )}
              <p className="transactionDetail">Balance: ${transaction.balance}</p>
              </div>
              <p className="transactionDetail">
                Date: {new Date(transaction.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepositTransaction;
