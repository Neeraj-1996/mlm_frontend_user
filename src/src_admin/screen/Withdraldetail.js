import React, { useState, useEffect } from "react";
import { Table, Spinner, Card, Button, Alert, Form } from "react-bootstrap";
import { fetchWithdrawal } from "../api_controlller/apicontrollerall";
import axios from "axios";
import baseUrl from "./url";

const WithdrawalRequestsTable = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    resultData();
  }, []);

  const resultData = async () => {
    setLoading(true);
    try {
      const plansData = await fetchWithdrawal(); // Use the fetchPlans function
      setFilteredUsers(plansData);
      setWithdrawalRequests(plansData);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleStatusChange = async (id, newStatus,request) => {
    // Show confirmation dialog
    console.log("request",request)
    const confirmation = window.confirm(
      `Are you sure you want to ${
        newStatus === "Approved" ? "approve" : "reject"
      } this request?`
    );

    if (!confirmation) {
      return; // Exit if the user cancels
    }

    const accessToken = localStorage.getItem("accessTokenAdmin");
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl}withdrawalrequest/status`,
         { id, status: newStatus ,userId:request.userId, address:request.address, amount:request.amount , },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        setAlertMessage(
          `Request ${
            newStatus === "Approved" ? "approved" : "rejected"
          } successfully.`
        );
   
        setWithdrawalRequests((prev) =>
          prev.map((request) =>
            request._id === id ? { ...request, status: newStatus } : request
          )
        );
        resultData();
      }
    } catch (error) {
      setAlertMessage("Error updating status");
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = withdrawalRequests.filter((user) => {
      const username = user.username?.toLowerCase() || "";
      const mobileNo = user.mobile ? user.mobile.toString() : "";
       return (
        username.includes(term) || mobileNo.includes(term)
      );
    });

    setFilteredUsers(filtered);
  };

  return (
    <div className="container mt-4 main_dsborad_cntenT">
      <div className="d-flex justify-content-between mb-3">
        <h2>Withdrawal Requests</h2>
      </div>

      {alertMessage && <Alert variant="info">{alertMessage}</Alert>}

      {loading && <Spinner animation="border" variant="primary" />}

      <div className="d-flex justify-content-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search by Username, Email, Mobile or Share ID"
          value={searchTerm}
          onChange={handleSearch}
          className="w-100" // Set width to 50%
        />
      </div>

      <Card className="card-container">
        <Card.Body>
          <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Username</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>Amount</th>
                  <th>Final Amount</th>
                  <th>Status</th>
                  <th>Date / Time</th>
                  <th>Action</th> 
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((request, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{request.username}</td>
                    <td>{request.mobile}</td>
                    <td>{request.address}</td>
                    <td>{request.amount}</td>
                    <td>{request.finalAmount}</td>
                    <td>{request.status}</td>
                    <td>{new Date(request.createdAt).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(request._id, "Approved",request)
                        }
                        disabled={request.status !== "Pending"}
                      >
                        Approve
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleStatusChange(request._id, "Cancelled by Admin",request)}
                        disabled={request.status !== "Pending"}
                      >
                        Reject
                      </Button>
                    </td>
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

export default WithdrawalRequestsTable;
