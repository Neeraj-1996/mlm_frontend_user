import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Card, Spinner } from "react-bootstrap";
import { fetchUsers ,fetchOrderAsPerUser ,deleteUser ,handleAddBalance,handleEditUser } from "../api_controlller/apicontrollerall";
import '../App.css'


const UserRecords = () => {
  const [users, setUsers] = useState([]);

  // State for modals
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showOrder, setShowOrderModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [amount, setAmount] = useState(""); 
  const [newPassword, setNewPassword] = useState('');
  const [orderDetails, setOrderDetails] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("today");

  const handlleShowOrder = (user) => {
    console.log(user.userId)
    // setSelectedUser(user);
    resultDataOrder(user?.userId)
    setShowOrderModel(true);
  };

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
    setShowAddBalanceModal(false)
  };
  const handleModalClose = () => {
    setSelectedUser(null);
    setNewPassword('');
    setShowEditUserModal(false)
};
  const handleModalOrder = () => {
    setShowOrderModel(false)
  };

  const addBalance = async (event) => {
    event.preventDefault();
    await handleAddBalance(selectedUser.userId, amount, () => {
      handleModalCloseWallet();
      resultDataUser();
    });
  };

  const changeUserPassword = async (event) => {
    event.preventDefault(); 
    await handleEditUser(selectedUser.mobileNo, newPassword, () => {
      handleModalClose();
      setShowEditUserModal(false);
    });
  };

  useEffect(() => {
    resultDataUser();
  }, []);

  const handleDeleteUser = async (user) => {
    setLoading(true);
    try {
      const userDataOrder = await deleteUser(user._id);
      console.log("User deleted successfully:", userDataOrder);
      resultDataUser();
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const resultDataUser = async () => {
    setLoading(true);
    try {
      const userData = await fetchUsers();
      console.log(userData)
      setUsers(userData);
      const sortedData = userData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFilteredUsers(sortedData);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const resultDataOrder = async (userId) => {
    setLoading(true);
    try {
      const userDataOrder = await fetchOrderAsPerUser(userId);
      console.log("userDataOrder",userDataOrder);
      
      setOrderDetails(userDataOrder);
      setFilteredOrders(userDataOrder);
    } catch (error) {
      console.error('Error fetching plans:', error);
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
        : ""; 

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

  // Filter the orders based on the selected time period (Today, This Week, This Month)
   const filterOrders = (orders, period) => {
    const today = new Date();
    let filteredOrders;

    switch (period) {
      case "week":
        // Show orders from the past week
        const weekStart = new Date(today.setDate(today.getDate() - 7));
        filteredOrders = orders.filter(item => new Date(item.buyDate) >= weekStart);
        break;
      case "month":
        // Show orders from the past month
        const monthStart = new Date(today.setMonth(today.getMonth() - 1));
        filteredOrders = orders.filter(item => new Date(item.buyDate) >= monthStart);
        break;
      case "today":
      default:
        // Show orders from today
        const todayStart = new Date(today.setHours(0, 0, 0, 0));
        filteredOrders = orders.filter(item => new Date(item.buyDate) >= todayStart);
        break;
    }
     return filteredOrders;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilteredOrders(filterOrders(orderDetails || [], tab));
  };

  

  return (
    <div className="container mt-4 main_dsborad_cntenT ">
      <h2>User Records</h2>

      {/* Search input */}
      <div className="d-flex justify-content-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search by Username, Email, Mobile or Share ID"
          value={searchTerm}
          onChange={handleSearch}
          className="w-100" 
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
                    <th>All Order</th>
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
                  
                      <td>{user.walletBalance.toFixed(2)}</td>

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
                          variant="success"
                          size="sm"
                          onClick={() => handlleShowOrder(user)}
                        >
                          All Order
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
            <Form onSubmit={addBalance}>
              <Form.Group controlId="formWalletAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}  
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
      <Modal show={showEditUserModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form onSubmit={changeUserPassword}>
              <Form.Group controlId="formMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.mobileNo} 
                  readOnly 
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Change Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} 
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

       {/* Edit User Modal */}
       <Modal show={showOrder} onHide={handleModalOrder}>
        <Modal.Header closeButton>
          <Modal.Title>All order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div style={{ marginTop: "70px" }}>
      <div className="tabs">
        <button
          className={`tab ${activeTab === "today" ? "active" : ""}`}
          onClick={() => handleTabChange("today")}
        >
          Today
        </button>
        <button
          className={`tab ${activeTab === "week" ? "active" : ""}`}
          onClick={() => handleTabChange("week")}
        >
          This Week
        </button>
        <button
          className={`tab ${activeTab === "month" ? "active" : ""}`}
          onClick={() => handleTabChange("month")}
        >
          This Month
        </button>
      </div>

    
        {filteredOrders.length === 0 ? (
          <p>No order details available.</p>
        ) : (
          <div className="orderGrid">
            {filteredOrders.map((item) => (
              <div key={item._id} className="orderCard">
                <div>
                  {item.productImg && (
                    <img
                      src={item?.productImg}
                      alt={item?.productName}
                      className="productImageOrder"
                    />
                  )}
                </div>
                <div className="orderContent">
                  <h6 className="productNameOrder">{item?.productName}</h6>
                  <p className="priceorder">Price: ${item?.productPrice}</p>
                  <p className="commissionOder">
                    Commission: ${item.grabCommission.toFixed(2)}
                  </p>
                  <p className="buyDate">
                    Buy Date: {new Date(item.buyDate).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserRecords;



  // const handleEditUser = async (e) => {
  //   e.preventDefault();
  //   const accessToken = localStorage.getItem("accessTokenAdmin");
  //   const payload = {
  //     mobileNo: selectedUser.mobileNo, 
  //     newPassword: newPassword, 
  //   };

  //   try {
  //     const response = await axios.post(
  //       baseUrlapp+'changePassword',
  //       payload,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${accessToken}`, 
  //         },
  //       }
  //     );

  //     // Check if the response has statusCode 200
  //     if (response.data.statusCode === 200) {
  //       handleModalClose();
  //       setShowEditUserModal(false);
  //       } 
  //   } catch (error) {
  //     console.error('Error changing password:', error); // Log any error
  //     // setErrorMessage('An error occurred while changing the password.'); // Set a generic error message
  //   } 
  // };

// const handleAddBalance = async (e) => {
//   e.preventDefault();
//   console.log("Add balance for user:", selectedUser._id);

//   // Get access token from localStorage
//   const accessToken = localStorage.getItem("accessTokenAdmin");
  
//   // Ensure the token exists before making the request
//   if (!accessToken) {
//     console.error("Access token not found");
//     return;
//   }

//   const myHeaders = {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${accessToken}`,  // Use the token from localStorage
//   };

//   const requestBody = {
//     deposit_amount: amount,  // You can modify this value to be dynamic based on user input
//   };

//   try {
//     const response = await axios.post(
//       `${baseWallet}depositAmountAdmin?userId=${selectedUser.userId}`,
//       requestBody,
//       { headers: myHeaders }
//     );

//     // Check if the response has statusCode 200
//     if (response.data.statusCode === 200) {
//       console.log("Amount added successfully:", response.data.message);
//       handleModalCloseWallet();
//       resultDataUser();
//       // fetchUserRecords();  
//     } else {
//       console.error("Failed to add balance:", response.data.message);
//     }

//   } catch (error) {
//     console.error("Error while adding balance:", error);
//   }
// };




// const handleDeleteUser = async (user) => {
//   console.log("Deleting user:", user._id);

//   // Retrieve the access token from localStorage
//   const accessToken = localStorage.getItem("accessTokenAdmin");

//   if (!accessToken) {
//     console.error("Access token not found");
//     return;
//   }

//   // Set up the headers
//   const headers = {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${accessToken}`, // Pass token dynamically
//   };

//   try {
//     // Make the DELETE request
//     const response = await axios.delete(
//       `${baseUrl}deleteUser/${user._id}`,
//       { headers }  // Pass headers to the request
//     );

//     // Handle success
//     if (response.data.statusCode === 200) {
//       console.log("User deleted successfully:", response.data);
//       resultDataUser();
//       // fetchUserRecords();  
//       // Optionally, update the UI or handle further actions
//     } else {
//       console.error("Failed to delete user:", response.data.message);
//     }
//   } catch (error) {
//     console.error("Error while deleting user:", error);
//   }
// };

  
  // useEffect(() => {
  //   resultData();
  // }, []);

  // const resultDataOrder = async (userId) => {
  //   // const userId = localStorage.getItem("userId");
  //   const accessToken = localStorage.getItem("accessTokenAdmin");

  //   try {
  //     const response = await axios.post(
  //       grabUrlapp+`grabProductsUser?user_id=${userId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const userData = response.data;
  //     setOrderDetails(userData); 
  //     setFilteredOrders(filterOrders(userData, activeTab)); 
  //     console.log("User level data:", userData);
  //   } catch (error) {
  //     console.error("Error fetching user level:", error);
  //   }
  // };

          {/* {selectedUser && (
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
          )} */}

  // const fetchUserRecords = async () => {
  //   const accessToken = localStorage.getItem("accessTokenAdmin");
  //   setLoading(true);

  //   try {
  //     const result = await axios.get(`${baseUrl}getUserRecords`, {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     });

  //     if (result.status === 200) {
  //       setUsers(result.data.data);
  //       setFilteredUsers(result.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching slider images:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


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
