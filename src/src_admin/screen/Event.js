import React, { useState, useEffect } from 'react'; 
import { Table, Button, Modal, Form, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import baseUrl from './url';

const EventTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    id: null,
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    image: null, // This will hold the new image file
    eventImg: '', // Existing image URL
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
      const result = await axios.get(`${baseUrl}getEventRecords`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 200) {
        setEvents(result.data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowForm = (event = null) => {
    if (event) {
      setCurrentEvent({ ...event });
      setIsEditing(true);
      setImagePreview(event.eventImg); // Set preview to existing image
    } else {
      setCurrentEvent({
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
      setCurrentEvent((prev) => ({
        ...prev,
        image: file, // Set the new image file
      }));
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the new file
    } else if (name === "image") {
      setCurrentEvent((prev) => ({
        ...prev,
        image: null, // Reset image file if no file selected
      }));
      setImagePreview(null); // Reset the preview
    } else {
      setCurrentEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveEvent = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('title', currentEvent.title);
    formData.append('start_date', currentEvent.startDate);
    formData.append('end_date', currentEvent.endDate);
    formData.append('description', currentEvent.description);
  
    // Check if a new image is uploaded or use existing image
    if (currentEvent.image) {
      formData.append('eventImg', currentEvent.image); // Use new image file
    } else if (isEditing && currentEvent.eventImg) {
      // Create a Blob from the existing image URL
      const response = await fetch(currentEvent.eventImg);
      const blob = await response.blob();
      const existingImageFile = new File([blob], 'existingImage.jpg', { type: blob.type });
      formData.append('eventImg', existingImageFile); // Send existing image as file
    }
  
    setLoading(true);
    try {
      if (isEditing) {
        formData.append('event_id', currentEvent._id);
        await axios.post(`${baseUrl}updateEvent`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } else {
        await axios.post(`${baseUrl}addEvent`, formData, {
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
  

  const handleDeleteEvent = async (id) => {
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage Events</h2>
        <Button variant="primary" onClick={() => handleShowForm()}>
          Add Event
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Card style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Title</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event.id}>
                    <td>{index + 1}</td>
                    <td>{event.title}</td>
                    <td>{new Date(event.startDate).toLocaleString()}</td>
                    <td>{new Date(event.endDate).toLocaleString()}</td>
                    <td>{event.description}</td>
                    <td>
                      <img
                        src={event.eventImg}
                        alt={event.title}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowForm(event)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteEvent(event._id)}
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
      )}

      {/* Add/Edit Event Form Modal */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Event' : 'Add New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                name="title"
                value={currentEvent.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                value={currentEvent.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endDate"
                value={currentEvent.endDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter event description"
                name="description"
                value={currentEvent.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
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

            <Button variant="primary" onClick={handleSaveEvent}>
              {isEditing ? 'Save Changes' : 'Add Event'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventTable;
