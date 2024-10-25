import React, { useState, useEffect } from 'react'; 
import { Table, Button, Modal, Form, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import baseUrl from './url';

const CreateLevel = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState({
    _id: null,
    levelFirst: '',
    levelSecond: '',
    levelThird: '',
    firstPartyCommission: '',
    secondPartyCommission: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLevelData();
  }, []);

  const fetchLevelData = async () => {
    const accessToken = localStorage.getItem('accessTokenAdmin');
    setLoading(true);

    try {
      const result = await axios.get("http://localhost:9001/api/grab/getLevel", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 200) {
        setLevels(result.data);
      }
    } catch (error) {
      console.error('Error fetching levels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowForm = (level = null) => {
    if (level) {
      setCurrentLevel({ ...level });
      setIsEditing(true);
    } else {
      setCurrentLevel({
        _id: null,
        levelFirst: '',
        levelSecond: '',
        levelThird: '',
        firstPartyCommission: '',
        secondPartyCommission: '',
      });
      setIsEditing(false);
    }
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentLevel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveLevel = async () => {
    const accessToken = localStorage.getItem('accessTokenAdmin');
    const data = {
      id: currentLevel._id,
      levelFirst: currentLevel.levelFirst,
      levelSecond: currentLevel.levelSecond,
      levelThird: currentLevel.levelThird,
      firstPartyCommission: currentLevel.firstPartyCommission,
      secondPartyCommission: currentLevel.secondPartyCommission,
    };

    setLoading(true);
    try {
      if (isEditing) {
        await axios.post(`http://localhost:9001/api/grab/updateLevel`, data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      fetchLevelData(); // Refresh level list
    } catch (error) {
      console.error('Error saving level:', error);
    } finally {
      setLoading(false);
      handleCloseForm();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage Levels</h2>
        {/* <Button variant="primary" onClick={() => handleShowForm()}>
          Add Level
        </Button> */}
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Card className="card-container">
          <Card.Body>
            <div className="table-container">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>First Level</th>
                    <th>Second Level</th>
                    <th>Third Level</th>
                    <th>First Level Commission</th>
                    <th>Second Level Commission</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {levels.map((level, index) => (
                    <tr key={level._id}>
                      <td>{index + 1}</td>
                      <td>{level.levelFirst}</td>
                      <td>{level.levelSecond}</td>
                      <td>{level.levelThird}</td>
                      <td>{level.firstPartyCommission}</td>
                      <td>{level.secondPartyCommission}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleShowForm(level)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Add/Edit Level Form Modal */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Level' : 'Add New Level'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formLevelFirst">
              <Form.Label>First Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first level"
                name="levelFirst"
                value={currentLevel.levelFirst}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLevelSecond">
              <Form.Label>Second Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter second level"
                name="levelSecond"
                value={currentLevel.levelSecond}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLevelThird">
              <Form.Label>Third Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter third level"
                name="levelThird"
                value={currentLevel.levelThird}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFirstPartyCommission">
              <Form.Label>First Level Commission</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first party commission"
                name="firstPartyCommission"
                value={currentLevel.firstPartyCommission}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSecondPartyCommission">
              <Form.Label>Second Level Commission</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter second party commission"
                name="secondPartyCommission"
                value={currentLevel.secondPartyCommission}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSaveLevel}>
              {isEditing ? 'Save Changes' : 'Add Level'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateLevel;
