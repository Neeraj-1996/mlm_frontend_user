import { Spinner, Card } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { fetchTransactions } from "../api_controlller/apicontrollerall";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0]; // Today's date in 'YYYY-MM-DD' format

  const fetchTransactionData = async () => {
    setLoading(true);
    try {
      const transactionData = await fetchTransactions();
      setTransactions(transactionData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchTransactionData();
  }, []);

  // Calculate total credit
  const totalCredit = transactions.reduce((acc, transaction) => acc + transaction.credit, 0);

  // Calculate total withdrawal
  const totalWithdrawal = transactions.reduce((acc, transaction) => acc + transaction.debit, 0);

  // Calculate today's total deposit (credit transactions)
  const todayTotalDeposit = transactions
    .filter((transaction) => transaction.createdAt.startsWith(today))
    .reduce((acc, transaction) => acc + transaction.credit, 0);

  // Calculate today's total withdrawal (debit transactions)
  const todayTotalWithdrawal = transactions
    .filter((transaction) => transaction.createdAt.startsWith(today))
    .reduce((acc, transaction) => acc + transaction.debit, 0);

  // Calculate today's user credit
  const todayUserCredit = transactions
    .filter((transaction) => 
      transaction.createdAt.startsWith(today) &&
      transaction.transactionType === "Credit Amount" &&
      transaction.reference === "self"
    )
    .reduce((acc, transaction) => acc + transaction.credit, 0);

  // Calculate today's admin credit
  const todayAdminCredit = transactions
    .filter((transaction) => 
      transaction.createdAt.startsWith(today) &&
      transaction.transactionType === "Deposit" &&
      transaction.reference === "Admin Deposit"
    )
    .reduce((acc, transaction) => acc + transaction.credit, 0);

  return (
    <div className="transaction-summary">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="d-flex justify-content-around flex-wrap">
          {/* Existing Cards */}
          <Card style={{ width: '18rem' }} className="m-2">
            <Card.Body>
              <Card.Title>Total Credit</Card.Title>
              <Card.Text>{totalCredit.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className="m-2">
            <Card.Body>
              <Card.Title>Total Withdrawal</Card.Title>
              <Card.Text>{totalWithdrawal.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className="m-2">
            <Card.Body>
              <Card.Title>Today's Total Deposit</Card.Title>
              <Card.Text>{todayTotalDeposit.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className="m-2">
            <Card.Body>
              <Card.Title>Today's Total Withdrawal</Card.Title>
              <Card.Text>{todayTotalWithdrawal.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>

          {/* New Cards */}
          <Card style={{ width: '18rem' }} className="m-2">
            <Card.Body>
              <Card.Title>Today's User Credit</Card.Title>
              <Card.Text>{todayUserCredit.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className="m-2">
            <Card.Body>
              <Card.Title>Today's Admin Credit</Card.Title>
              <Card.Text>{todayAdminCredit.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

