import React, { useState, useEffect } from 'react';
import { Table, Spinner, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import baseUrl from './url';

const WithdrawalRequestsTable = () => {
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        fetchWithdrawalRequests();
    }, []);

    const fetchWithdrawalRequests = async () => {
        const accessToken = localStorage.getItem('accessToken');
        setLoading(true);

        try {
            const result = await axios.get(`${baseUrl}withdrawalrequests`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (result.status === 200) {
                setWithdrawalRequests(result.data.data);
            }
        } catch (error) {
            console.error('Error fetching withdrawal requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        // Show confirmation dialog
        const confirmation = window.confirm(
            `Are you sure you want to ${newStatus === 'Approved' ? 'approve' : 'reject'} this request?`
        );

        if (!confirmation) {
            return; // Exit if the user cancels
        }

        const accessToken = localStorage.getItem('accessToken');
        setLoading(true);

        try {
            const response = await axios.post(
                `${baseUrl}withdrawalrequest/status`,
                { id, status: newStatus },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            if (response.status === 200) {
                setAlertMessage(`Request ${newStatus === 'Approved' ? 'approved' : 'rejected'} successfully.`);
                setWithdrawalRequests((prev) =>
                    prev.map((request) =>
                        request._id === id ? { ...request, status: newStatus } : request
                    )
                );
            }
        } catch (error) {
            setAlertMessage('Error updating status');
            console.error('Error updating status:', error);
        } finally {
            setLoading(false);
            setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>Withdrawal Requests</h2>
            </div>

            {alertMessage && <Alert variant="info">{alertMessage}</Alert>}

            {loading && <Spinner animation="border" variant="primary" />}

            <Card style={{ maxHeight: '700px', overflowY: 'scroll' }}>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Username</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Amount</th>
                                <th>Final Amount</th>
                                <th>Status</th>
                                <th>Action</th> {/* New column for actions */}
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawalRequests.map((request, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{request.username}</td>
                                    <td>{request.mobile}</td>
                                    <td>{request.address}</td>
                                    <td>{request.amount}</td>
                                    <td>{request.finalAmount}</td>
                                    <td>{request.status}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => handleStatusChange(request._id, 'Approved')}
                                            disabled={request.status !== 'Pending'}
                                        >
                                            Approve
                                        </Button>{' '}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleStatusChange(request._id, 'Cancelled by Admin')}
                                            disabled={request.status !== 'Pending'}
                                        >
                                            Reject
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default WithdrawalRequestsTable;
