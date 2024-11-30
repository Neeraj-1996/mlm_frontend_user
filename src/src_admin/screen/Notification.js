import React, { useState, useEffect } from 'react'; 
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap'; 
import axios from 'axios'; 
import baseUrl from './url';
import { faL } from '@fortawesome/free-solid-svg-icons';

const Notification = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  const [currentCountry, setCurrentCountry] = useState({
    id: null,
    countryName: '',
    countryCode: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
     const accessToken = localStorage.getItem('accessTokenAdmin'); 

    setLoading(true);
    try {
        // http://localhost:9001/api/admin/getNotifications
      const result = await axios.get(`${baseUrl}getNotifications`, {
        headers: { Authorization: `Bearer ${accessToken}` }, // Pass token in headers
      });
      console.log("resultdata",result.data.data)
      setCountries(result.data.data); 
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowForm = (country = null) => {
    if (country) {
      setCurrentCountry({ ...country });
      setIsEditing(true);
    } else {
      setCurrentCountry({
        id: null,
        countryName: '',
        countryCode: '',
      });
      setIsEditing(false);
    }
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Handle the change for currentCountry or message
    if (name === "message") {
      setMessage(value); // Update the message state
    } else {
      setCurrentCountry({ ...currentCountry, [name]: value }); // Update currentCountry (if needed)
    }
  };

const handleSaveCountry = async () => {
    const accessToken = localStorage.getItem('accessTokenAdmin');
    setLoading(true);
    const payload = {
        message: message, // Sample payload you want to send
    };
  
    try {
      // Make the POST request using axios without the Authorization header
      const response = await axios.post(
        baseUrl+'addNotification',
        payload, // the body/payload being sent
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
  
      // If successful, call fetchNotification or show a success message
      console.log('Notification added:', response.data);
      fetchNotification()
      setLoading(false)
      setShowForm(false)
    //   fetchNotification(); // If you want to fetch the latest data
    } catch (error) {
      console.error('Error saving notification:', error);
    } 
  };
  

  const handleDeleteCountry = async (id) => {
    const accessToken = localStorage.getItem('accessTokenAdmin'); // Retrieve token from localStorage
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}deleteNotification`, {
        headers: { Authorization: `Bearer ${accessToken}` }, // Pass token in headers
        data: { id: id },
      });
      fetchNotification();
    } catch (error) {
      console.error('Error deleting country:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between mb-1">
        <h2>Manage Notification</h2>
        <Button variant="primary" onClick={() => handleShowForm()}>
          Add Notification
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Message</th>
            {/* <th>Country Code</th>*/}
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          
          {countries.map((country, index) => (
            <tr key={country._id}>
              <td>{index + 1}</td>
              <td>{country.message}</td>
             
              <td>
           
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteCountry(country._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Country' : 'Add New Country'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              {/* <Form.Label>Notification</Form.Label> */}
              <Form.Control
            type="text"
            placeholder="Enter notification message"
            name="message" // This is important to update the message state
            value={message} // Bind the message state to the value
            onChange={handleInputChange} // Update state when user types
          />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country code"
                name="countryCode"
                value={currentCountry.countryCode}
                onChange={handleInputChange}
              />
            </Form.Group> */}

            <Button variant="primary" onClick={handleSaveCountry}>
              {isEditing ? 'Save Changes' : 'Add Notification'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {loading && <Spinner animation="border" />}
    </div>
  );
};

export default Notification;


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentCountry((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveCountry = async () => {
//     const accessToken = localStorage.getItem('accessTokenAdmin'); // Retrieve token from localStorage
//     const endpoint= 'addNotification';
//     const payload = isEditing
//       ? { countryId: currentCountry._id, ...currentCountry }
//       : currentCountry;

//     setLoading(true);
//     try {
//       await axios.post(`${baseUrl}${endpoint}`, payload, {
//         headers: { Authorization: `Bearer ${accessToken}` }, // Pass token in headers
//       });
//       fetchNotification();
//     } catch (error) {
//       console.error('Error saving country:', error);
//     } finally {
//       setLoading(false);
//       handleCloseForm();
//     }
//   };