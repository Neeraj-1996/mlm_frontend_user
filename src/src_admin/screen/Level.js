import React, { useState ,useEffect} from 'react';
import { Table, Button, Modal, Card ,Form } from 'react-bootstrap';
import axios from 'axios';
import baseUrl from './url';
const LevelTable = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [dataLevel, setDataLevel] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('level1');

  const handleShowDetails = async (userId) => {

    console.log("User ID:", userId);
    setSelectedUser(userId);
    setShowDetails(true);
  
    const token = localStorage.getItem("accessToken");
    
    try {
      // Make the request with Axios
      const response = await axios.get(`http://localhost:9001/api/users/users-at-Level?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // or "multipart/form-data" if needed
        },
      });
  
      const result = response.data; // Get the data from the response
  
      console.log("level",result)
      if (result.success) {
        setDataLevel(result.data);
        // setUserData(result.data); // Set the user data
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
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


  const handleCloseDetails = () => setShowDetails(false);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter((user) => {
      const username = user.username?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const mobileNo = user.mobileNo ? user.mobileNo.toString() : ""; // Convert mobileNo to string
     
      return (
        username.includes(term) ||
        email.includes(term) ||
        mobileNo.includes(term) 
      );
    });

    setFilteredUsers(filtered);
  };


  // console.log('datalevel',dataLevel)
  const filteredUsersLevel = dataLevel?.filter(user => {
    if (selectedLevel === 'level1') return user.level === 1;
    if (selectedLevel === 'level2') return user.level === 2;
    if (selectedLevel === 'level3') return user.level === 3;
    return false;
  }) || [];


  // console.log('Filtered Users:', filteredUsersLevel);
  return (
    <div className="container mt-4">
      <h2>Manage Levels</h2>

      <div className="d-flex justify-content-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search by Username, Email, Mobile or Share ID"
          value={searchTerm}
          onChange={handleSearch}
          className="w-100" // Set width to 50%
        />
      </div>
      {/* Scrollable Card for User Table */}
      <Card className="card-container">
        <Card.Body className="card-body">
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNo}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleShowDetails(user.sharedId)}
                    >
                      View Levels
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </Card.Body>
      </Card>

      {/* User Levels Details Modal */}
      <Modal show={showDetails} onHide={handleCloseDetails}>
      <Modal.Header closeButton>
        <Modal.Title>User Levels</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedUser && (
          <>
            {/* <h5>User ID: {selectedUser}</h5> */}

            {/* Level Buttons */}
            <div className='team-container'>
              <div className="tabs mb-3">
                <Button variant="primary" onClick={() => setSelectedLevel('level1')} className="tab">First Level</Button>
                <Button variant="primary" onClick={() => setSelectedLevel('level2')} className="tab mx-2">Second Level</Button>
                <Button variant="primary" onClick={() => setSelectedLevel('level3')} className="tab">Third Level</Button>
              </div>

              {/* User List */}
              <div className="user-list">
                {filteredUsersLevel.length > 0 ? (
                  filteredUsersLevel.map(user => (
                    <div key={user.user._id} className="user-card mb-3">
                      <p>Name: {user.user.username}</p>
                      <p>Email: {user.user.email}</p>
                      <p>Mobile No: {user.user.mobileNo}</p>
                      <p>Wallet Balance: {user.walletBalance}</p>
                    </div>
                  ))
                ) : (
                  <p>No users found for this level.</p>
                )}
              </div>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDetails}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
     
    </div>
  );
};

export default LevelTable;
