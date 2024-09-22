import React, { useState } from 'react';
import { Table, Button, Modal, Card } from 'react-bootstrap';

const LevelTable = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Demo data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com' },
  ];

  const userLevels = {
    1: [
      { level: 1, name: 'John Doe', email: 'john@example.com' },
      { level: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { level: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    ],
    2: [
      { level: 1, name: 'Jane Smith', email: 'jane@example.com' },
      { level: 2, name: 'Alice Johnson', email: 'alice@example.com' },
      { level: 3, name: 'Bob Brown', email: 'bob@example.com' },
    ],
    // Add more user levels as needed
  };

  const handleShowDetails = (userId) => {
    setSelectedUser(userId);
    setShowDetails(true);
  };

  const handleCloseDetails = () => setShowDetails(false);

  return (
    <div className="container mt-4">
      <h2>Manage Levels</h2>

      {/* Scrollable Card for User Table */}
      <Card style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleShowDetails(user.id)}
                    >
                      View Levels
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
              <h5>User ID: {selectedUser}</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {userLevels[selectedUser]?.map((levelUser, index) => (
                    <tr key={index}>
                      <td>{levelUser.level}</td>
                      <td>{levelUser.name}</td>
                      <td>{levelUser.email}</td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan="3" className="text-center">No Levels Available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
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
