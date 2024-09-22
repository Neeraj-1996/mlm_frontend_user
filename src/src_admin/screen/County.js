import React, { useState, useEffect } from 'react'; 
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap'; 
import axios from 'axios'; 
import baseUrl from './url';

const CountryTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const [currentCountry, setCurrentCountry] = useState({
    id: null,
    countryName: '',
    countryCode: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    setLoading(true);
    try {
      const result = await axios.get(`${baseUrl}getCountries`, {
        headers: { Authorization: `Bearer ${accessToken}` }, // Pass token in headers
      });
      setCountries(result.data.countries);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCountry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCountry = async () => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    const endpoint = isEditing ? 'updateCountries' : 'addCountries';
    const payload = isEditing
      ? { countryId: currentCountry._id, ...currentCountry }
      : currentCountry;

    setLoading(true);
    try {
      await axios.post(`${baseUrl}${endpoint}`, payload, {
        headers: { Authorization: `Bearer ${accessToken}` }, // Pass token in headers
      });
      fetchCountries();
    } catch (error) {
      console.error('Error saving country:', error);
    } finally {
      setLoading(false);
      handleCloseForm();
    }
  };

  const handleDeleteCountry = async (id) => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}deleteCountries`, {
        headers: { Authorization: `Bearer ${accessToken}` }, // Pass token in headers
        data: { countryId: id },
      });
      fetchCountries();
    } catch (error) {
      console.error('Error deleting country:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage Countries</h2>
        <Button variant="primary" onClick={() => handleShowForm()}>
          Add Country
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Country Name</th>
            <th>Country Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {countries.map((country, index) => (
            <tr key={country._id}>
              <td>{index + 1}</td>
              <td>{country.countryName}</td>
              <td>{country.countryCode}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowForm(country)}
                >
                  Edit
                </Button>
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
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country name"
                name="countryName"
                value={currentCountry.countryName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country code"
                name="countryCode"
                value={currentCountry.countryCode}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSaveCountry}>
              {isEditing ? 'Save Changes' : 'Add Country'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {loading && <Spinner animation="border" />}
    </div>
  );
};

export default CountryTable;
