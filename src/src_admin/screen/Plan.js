import React, { useState, useEffect } from 'react'; 
import { Table, Button, Modal, Form, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import baseUrl from './url';
const PlanTable = () => {

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [events, setEvents] = useState([]);
  const [plans, setPlans] = useState([]);


  const [currentPlan, setCurrentPlan] = useState({
    id: null,
    title: '',
    commission: '',
    price: '',
    image: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    resultData();
  }, []);

  const resultData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    setLoading(true);

    try {
      const result = await axios.get(`${baseUrl}getPlanRecords`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 200) {
        setPlans(result.data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowForm = (event = null) => {
    if (event) {
      setCurrentPlan({ ...event });
      setIsEditing(true);
      setImagePreview(event.planImg); // Set preview to existing image
    } else {
      setCurrentPlan({
        id: null,
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        image: null,
        eventImg: '',
      });
      setIsEditing(false);
      setImagePreview('');
    }
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      setCurrentPlan((prev) => ({
        ...prev,
        image: file, // Set the new image file
      }));
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the new file
    } else if (name === "image") {
      setCurrentPlan((prev) => ({
        ...prev,
        image: null, // Reset image file if no file selected
      }));
      setImagePreview(null); // Reset the preview
    } else {
      setCurrentPlan((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSavePlan = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('title', currentPlan.title);
    formData.append('commission', currentPlan.commission);
    formData.append('price', currentPlan.price);
    // formData.append('description', currentPlan.description);
  
    // Check if a new image is uploaded or use existing image
    if (currentPlan.image) {
      formData.append('planImg', currentPlan.image); // Use new image file
    } else if (isEditing && currentPlan.eventImg) {
      // Create a Blob from the existing image URL
      const response = await fetch(currentPlan.eventImg);
      const blob = await response.blob();
      const existingImageFile = new File([blob], 'existingImage.jpg', { type: blob.type });
      formData.append('planImg', existingImageFile); // Send existing image as file
    }
  
    setLoading(true);
    try {
      if (isEditing) {
        formData.append('plan_id', currentPlan._id);
        await axios.post(`${baseUrl}updatePlan`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } else {
        await axios.post(`${baseUrl}addPlan`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      resultData(); // Refresh event list
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setLoading(false);
      handleCloseForm();
    }
  };
  

  const handleDeletePlan = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}deleteEvent`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { event_id: id },
      });
      resultData(); // Refresh event list
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setLoading(false);
    }
  };

  // const [showForm, setShowForm] = useState(false);








  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage Plans</h2>
        <Button variant="primary" onClick={() => handleShowForm()}>
          Add Plan
        </Button>
      </div>

      {/* Scrollable Card for Plan Table */}
      <Card style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Title</th>
                <th>Commission</th>
                <th>Price</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, index) => (
                <tr key={plan.id}>
                  <td>{index + 1}</td>
                  <td>{plan.title}</td>
                  <td>{plan.commission}</td>
                  <td>{plan.price}</td>
                  <td>
                    <img
                      src={plan.planImg}
                      alt={plan.title}
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowForm(plan)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeletePlan(plan.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Plan Form Modal */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Plan' : 'Add New Plan'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plan title"
                name="title"
                value={currentPlan.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCommission">
              <Form.Label>Commission</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter commission percentage"
                name="commission"
                value={currentPlan.commission}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plan price"
                name="price"
                value={currentPlan.price}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
              />
               {isEditing && imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100px', marginTop: '10px' }}
                />
              )}
            </Form.Group>

            <Button variant="primary" onClick={handleSavePlan}>
              {isEditing ? 'Save Changes' : 'Add Plan'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PlanTable;
