import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import baseUrl from "./url";
import baseWallet from "./urlWallet";
import '../App.css'
const UserRecords = () => {
  const [users, setUsers] = useState([]);

  // State for modals
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [amount, setAmount] = useState(""); 
  const [newPassword, setNewPassword] = useState('');


  const handleAddBalanceShow = (user) => {
    setSelectedUser(user);
    setShowAddBalanceModal(true);
  };


  const handleEditUserShow = (user) => {
    setSelectedUser(user);
    setNewPassword(''); 
    setShowEditUserModal(true)
  
  };

  const handleModalCloseWallet = () => {
    // Reset state when closing the modal
   
    setShowAddBalanceModal(false)

  };
  const handleModalClose = () => {
    // Reset state when closing the modal
    setSelectedUser(null);
    setNewPassword('');
    setShowEditUserModal(false)

  };


//   const handleDeleteUser = (user) =>{
// console.log("user.dfd",user._id)
//   }
  // const handleAddBalance = (e) => {
  //   e.preventDefault();
  //   console.log("Add balance for user:", selectedUser._id);
  //   handleModalClose();
  // };



const handleAddBalance = async (e) => {
  e.preventDefault();
  console.log("Add balance for user:", selectedUser._id);

  // Get access token from localStorage
  const accessToken = localStorage.getItem("accessTokenAdmin");
  
  // Ensure the token exists before making the request
  if (!accessToken) {
    console.error("Access token not found");
    return;
  }

  const myHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,  // Use the token from localStorage
  };

  const requestBody = {
    deposit_amount: amount,  // You can modify this value to be dynamic based on user input
  };

  try {
    const response = await axios.post(
      `${baseWallet}depositAmountAdmin?userId=${selectedUser._id}`,
      requestBody,
      { headers: myHeaders }
    );

    // Check if the response has statusCode 200
    if (response.data.statusCode === 200) {
      console.log("Amount added successfully:", response.data.message);
      handleModalCloseWallet();
      fetchUserRecords();  
    } else {
      console.error("Failed to add balance:", response.data.message);
    }

  } catch (error) {
    console.error("Error while adding balance:", error);
  }
};


const handleDeleteUser = async (user) => {
  console.log("Deleting user:", user._id);

  // Retrieve the access token from localStorage
  const accessToken = localStorage.getItem("accessTokenAdmin");

  if (!accessToken) {
    console.error("Access token not found");
    return;
  }

  // Set up the headers
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`, // Pass token dynamically
  };

  try {
    // Make the DELETE request
    const response = await axios.delete(
      `${baseUrl}deleteUser/${user._id}`,
      { headers }  // Pass headers to the request
    );

    // Handle success
    if (response.data.statusCode === 200) {
      console.log("User deleted successfully:", response.data);
      fetchUserRecords();  
      // Optionally, update the UI or handle further actions
    } else {
      console.error("Failed to delete user:", response.data.message);
    }
  } catch (error) {
    console.error("Error while deleting user:", error);
  }
};



  // const handleEditUser = (e) => {
  //   e.preventDefault();
  //   console.log("Edit user details:", selectedUser);
  //   handleModalClose();
  // };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessTokenAdmin");
    const payload = {
      mobileNo: selectedUser.mobileNo, // Keep the current mobile number
      newPassword: newPassword, // Use the new password entered by the user
    };

    try {
      const response = await axios.post(
        'http://localhost:9001/api/users/changePassword',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Set the Authorization header
          },
        }
      );

      // Check if the response has statusCode 200
      if (response.data.statusCode === 200) {
        handleModalClose();
        setShowEditUserModal(false);
        } 
    } catch (error) {
      console.error('Error changing password:', error); // Log any error
      // setErrorMessage('An error occurred while changing the password.'); // Set a generic error message
    } 
  };

  useEffect(() => {
    fetchUserRecords();
  }, []);

  const fetchUserRecords = async () => {
    const accessToken = localStorage.getItem("accessTokenAdmin");
    setLoading(true);

    try {
      const result = await axios.get(`${baseUrl}getUserRecords`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (result.status === 200) {
        setUsers(result.data.data);
        setFilteredUsers(result.data.data);
      }
    } catch (error) {
      console.error("Error fetching slider images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search function to filter users based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter((user) => {
      const username = user.username?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const mobileNo = user.mobileNo ? user.mobileNo.toString() : ""; // Convert mobileNo to string
      const sharedId = user.sharedId
        ? user.sharedId.toString().toLowerCase()
        : ""; // Convert sharedId to string and lowercase

      return (
        username.includes(term) ||
        email.includes(term) ||
        mobileNo.includes(term) ||
        sharedId.includes(term)
      );
    });

    setFilteredUsers(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format date and time
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-CA', options); // YYYY-MM-DD
    const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // HH:MM
  
    return `${formattedDate} ${formattedTime}`; // Combine formatted date and time
  };

  return (
    <div className="container mt-4">
      <h2>User Records</h2>

      {/* Search input */}
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
        <Card.Body  >
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <div className="table-container">
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>User ID</th>
                    <th>Share ID</th>
                    <th>Wallet Balance</th>
                    <th>Add Wallet Balance</th>
                    <th>Action</th>
                    <th>Joining Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.mobileNo}</td>
                      <td>{user.userId}</td>
                      <td>{user.sharedId}</td>
                  
                      <td>{user.walletBalance}</td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleAddBalanceShow(user)}
                        >
                          Add Balance
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleEditUserShow(user)}
                        >
                          Edit
                        </Button>{" "}
                        <Button variant="danger" size="sm"
                         onClick={() => handleDeleteUser(user)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td>{formatDate(user.createdAt)}</td>

                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add Balance Modal */}
      <Modal show={showAddBalanceModal} onHide={handleModalCloseWallet}>
        <Modal.Header closeButton>
          <Modal.Title>Add Wallet Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form onSubmit={handleAddBalance}>
              <Form.Group controlId="formWalletAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}  // Update amount state
                required
              />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Balance
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Edit User Modal */}

      {/* Edit User Modal */}
      <Modal show={showEditUserModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form onSubmit={handleEditUser}>
              <Form.Group controlId="formMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.mobileNo} // Show mobile number
                  readOnly // Make the mobile number readonly if you don't want it to be editable
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Change Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} // Update the new password state
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserRecords;
{
  /* <Modal show={showEditUserModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form onSubmit={handleEditUser}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.username}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={selectedUser.email}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.mobile}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formShareId">
                <Form.Label>Share ID</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.shareId}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formResponderId">
                <Form.Label>Responder ID</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.responderId}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal> */
}
