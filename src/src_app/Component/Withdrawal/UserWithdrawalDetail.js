import React, { useEffect, useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import { fetchUserWithdrawal } from '../Navigation/Allapi';
import Header from '../Header/Header';
import '.././Tranasaction/DepositTransaction.css'


const WithdrawalTransaction = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleBackClick = () => navigate(-1);

  const resultDataTranasaction = async () => {
    try {
      const featchData = await fetchUserWithdrawal();
      console.log("fetchUserWithdrawal", featchData);
      setTransactions(featchData);  // Set transactions directly
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
      <Header name="Withdrawal Detail" onBack={handleBackClick} />
      <div className='transaction-deposit1'>
      
      {/* <div className='transaction-deposit1'> */}
      {/* <div className="balance-section1">
        <h2 className="balance">Current Balance: $</h2>
      </div> */}
        <div className="scrollView">
          {transactions.map((transaction) => (
            <div 
              key={transaction._id} 
              className="cardTrans1"
              // className={`cardTrans`}
            >
            {/* <h4 className="transactionType">{transaction.transactionType}</h4> */}
              {/* <h4 className="transactionType">{transaction.transactionType || "Withdrawal"}</h4> */}
              <p className="transactionDetail">Address: {transaction.address}</p>
              <div style={{flexDirection: 'row', display: 'flex', justifyContent: "space-between" ,}}>
                <p className="transactionDetail">Amount: {transaction.amount}</p>
                <p className="transactionDetail">Final Amount: {transaction.finalAmount}</p>
              
              </div>

              <div style={{flexDirection: 'row', display: 'flex', justifyContent: "space-between"}}>

                <p className="transactionDetail">Mobile: {transaction.mobile}</p>
                <p className="transactionDetail">Status: {transaction.status}</p>
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

export default WithdrawalTransaction;
