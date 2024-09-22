import React, { useState } from 'react';
import { Table, Button, Modal, Form ,Card} from 'react-bootstrap';

const SupportTable = () => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', phone: '123-456-7890', messages: ['Hello!', 'How can I help you?'] },
    { id: 2, name: 'Jane Smith', phone: '098-765-4321', messages: ['Hi!', 'Is there an issue?'] },
  ]);

  const handleViewMessages = (user) => {
    setSelectedUser(user);
    setShowMessageModal(true);
  };

  const handleSendMessage = (user) => {
    setSelectedUser(user);
    setShowSendMessageModal(true);
  };

  const handleSendMessageSubmit = () => {
    if (message.trim()) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? { ...user, messages: [...user.messages, message] }
            : user
        )
      );
      setMessage('');
      setShowSendMessageModal(false);
    }
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    setSelectedUser(null);
  };

  const handleCloseSendMessageModal = () => {
    setShowSendMessageModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Support Table</h2>
      </div>
      <Card style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      <Card.Body>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => handleViewMessages(user)}>
                  View Messages
                </Button>
                <Button variant="primary" size="sm" onClick={() => handleSendMessage(user)}>
                  Send Message
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Card.Body>
      </Card>

      {/* View Messages Modal */}
      <Modal show={showMessageModal} onHide={handleCloseMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Messages from {selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {selectedUser?.messages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>

      {/* Send Message Modal */}
      <Modal show={showSendMessageModal} onHide={handleCloseSendMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Message to {selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSendMessageSubmit} className="mt-3">
              Send
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SupportTable;
