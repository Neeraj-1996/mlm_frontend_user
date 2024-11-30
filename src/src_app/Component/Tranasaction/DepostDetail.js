import React, { useEffect, useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import { fetchUserBalance } from '../Navigation/Allapi';
import Header from '../Header/Header';
import '.././Tranasaction/DepositTransaction.css'

const DepositDetail= () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const handleBackClick = () => navigate(-1);

  const resultDataTranasaction = async () => {
    try {
      const featchData = await fetchUserBalance();
      setBalance(featchData.balance);
      console.log("fetchUserWithdrawal", featchData);
      const depositAndBonusTransactions = featchData.transactions.filter(
        transaction => transaction.transactionType === 'Deposit' || transaction.transactionType === 'Bonus'
      );
      
      setTransactions(depositAndBonusTransactions);  // Set transactions directly
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    resultDataTranasaction();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Header name="Credit Amount" onBack={handleBackClick} />
      
      <div className='transaction-deposit1'>
      <div className="balance-section1">
        <h2 className="balance">Current Balance: ${balance.toFixed(2)}</h2>
      </div>
      {/* <div className='transaction-deposit1'> */}
        <div className="scrollView">
        {transactions.map((transaction) => (
            <div 
              key={transaction._id} 
              className={`cardTrans ${transaction.transactionType === 'Deposit' ? 'deposit' : 'bonus'}`}
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
<p className="transactionDetail">Balance: ${transaction.balance.toFixed(2)}</p>

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

export default DepositDetail;
