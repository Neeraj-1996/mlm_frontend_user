import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert, Form,Card } from "react-bootstrap";

import { fetchTransactions } from "../api_controlller/apicontrollerall";
const UserTransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    resultData();
  }, []);

  const resultData = async () => {
    setLoading(true);
    try {
      const plansData = await fetchTransactions();
      setFilteredTransactions(plansData);
      setTransactions(plansData);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = transactions.filter((transaction) => {
      const username = transaction.username?.toLowerCase() || "";
      const email = transaction.email?.toLowerCase() || "";
      const mobileNo = transaction.mobileNo ? transaction.mobileNo.toString() : "";

      return (
        username.includes(term) ||
        email.includes(term) ||
        mobileNo.includes(term)
      );
    });

    setFilteredTransactions(filtered);
  };

  // Calculate total credits from filtered transactions
  const calculateTotalCredit = () => {
    return filteredTransactions.reduce((total, transaction) => {
      return total + (transaction.credit || 0);
    }, 0);
  };

  return (
    <div className="container mt-4">
      <h2>User Transactions</h2>

      {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}

      {loading && <Spinner animation="border" variant="primary" />}

      <div className="d-flex justify-content-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search by Username, Email, or Mobile No"
          value={searchTerm}
          onChange={handleSearch}
          className="w-100"
        />
      </div>

      {/* Display Total Credit Without Card */}
      <div className="text-center mb-3">
        <h5>Total Credit: {calculateTotalCredit()}</h5>
      </div>
      <Card className="card-container">
      <Card.Body  >
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile No</th>
              {/* <th>Transaction ID</th> */}
              {/* <th>Credit</th> */}
              {/* <th>Debit</th> */}
              <th>Balance</th>
              {/* <th>Transaction Type</th> */}
              <th>Reference</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <td>{index + 1}</td>
                <td>{transaction.username}</td>
                <td>{transaction.email}</td>
                <td>{transaction.mobileNo}</td>
                {/* <td>{transaction.transactionId}</td> */}
                {/* <td>{transaction.credit}</td> */}
                {/* <td>{transaction.debit}</td> */}
                <td>{transaction.balance}</td>
                {/* <td>{transaction.transactionType}</td> */}
                <td>{transaction.reference}</td>
                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </Card.Body>
      </Card>
    </div>
  );
};

export default UserTransactionsTable;
