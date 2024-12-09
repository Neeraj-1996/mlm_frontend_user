import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const LoginPage = ({ onLogin }) => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [error, setError] = useState('');
  const handleSubmit = async (event) => { 
    event.preventDefault();
    
    try {
        // Make API request using axios
        const response = await axios.post('https://api.vortexvantures.com/api/admin/adminLogin', {
            mobile_no: number,
            password: password
        });
        // localStorage.clear();

        // Assuming the response contains the tokens as shown in your structure
        const { accessToken, refreshToken } = response.data.data;
        
        // Log the access token
        console.log("accessToken", accessToken);
        
        // Save tokens in local storage
        localStorage.setItem('accessTokenAdmin', accessToken);
        localStorage.setItem('refreshTokenAdmin', refreshToken);

        // Notify parent component of successful login
        onLogin(); 

        // Redirect to home page or another route after login
        navigate('/admindnd/home'); // Change this route as needed

    } catch (error) {
        console.error('Login failed:', error);
        setError('Invalid login credentials. Please try again.');
    }
};





  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label> Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            
          </Form>
        </Card.Body>
      

      </Card>
    </Container>
  );
};

export default LoginPage;
