        import React, { useState, useEffect } from 'react';
        import { Table, Button, Modal, Form, Card, Spinner } from 'react-bootstrap';
        import axios from 'axios';
        import baseUrl from './url';

        const SliderImageTable = () => {
        const [showForm, setShowForm] = useState(false);
        const [showEditForm, setShowEditForm] = useState(false);
        const [sliderImages, setSliderImages] = useState([]);
        const [newSliderImage, setNewSliderImage] = useState({ image: null });
        const [editSliderImage, setEditSliderImage] = useState(null);
        const [editImagePreview, setEditImagePreview] = useState(null);
        const [loading, setLoading] = useState(false);

        const handleShowForm = () => setShowForm(true);
        const handleCloseForm = () => setShowForm(false);
        const handleShowEditForm = () => setShowEditForm(true);
        const handleCloseEditForm = () => setShowEditForm(false);

        const handleInputChange = (e) => {
            const { name, files } = e.target;
            setNewSliderImage((prev) => ({
            ...prev,
            [name]: files ? files[0] : null,
            }));
        };

        const handleEditInputChange = (e) => {
            const { name, files } = e.target;
            setEditSliderImage((prev) => ({
            ...prev,
            [name]: files ? files[0] : prev[name],
            }));

            if (name === 'image' && files && files[0]) {
            const file = files[0];
            setEditImagePreview(URL.createObjectURL(file));
            } else if (name === 'image') {
            setEditImagePreview(null);
            }
        };

        const handleAddSliderImage = async () => {
            const formData = new FormData();
            formData.append('sliderImg', newSliderImage.image);

            const accessToken = localStorage.getItem('accessTokenAdmin');
            setLoading(true);

            try {
            const response = await axios.post(`${baseUrl}addslider`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
                },
            });

            const addedSliderImage = {
                id: response.data.id,
                image: URL.createObjectURL(newSliderImage.image),
            };

            setSliderImages((prev) => [...prev, addedSliderImage]);
            setNewSliderImage({ image: null });
            handleCloseForm();
            } catch (error) {
            console.error('Error adding slider image:', error);
            } finally {
            setLoading(false);
            }
        };
        
        
        const handleEditSliderImage = async () => {
            const formData = new FormData();
            formData.append('id', editSliderImage._id);
        
            const accessToken = localStorage.getItem('accessTokenAdmin');
            setLoading(true);
        
            try {
                // Check if a new image file is selected
                if (editSliderImage.image instanceof File) {
                    formData.append('sliderImg', editSliderImage.image);
                } else {
                    // Fetch the existing image URL and create a Blob
                    const response = await fetch(editSliderImage.sliderImg);
                    const blob = await response.blob();
                    const existingImageFile = new File([blob], 'existingImage.jpg', { type: blob.type });
                    formData.append('sliderImg', existingImageFile);
                }
        
                // Send the updated form data
                const response = await axios.post(`${baseUrl}updateslider`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
        
                if (response.data.success) {
                    // Update the image in the sliderImages state only if successful
                    setSliderImages((prev) =>
                        prev.map((sliderImage) =>
                            sliderImage._id === editSliderImage._id
                                ? { ...sliderImage, image: editImagePreview || sliderImage.sliderImg }
                                : sliderImage
                        )
                    );
        
                    setEditSliderImage(null);
                    setEditImagePreview(null);
                    handleCloseEditForm();
                } else {
                    console.error('Error:', response.data.message);
                }
            } catch (error) {
                console.error('Error updating slider image:', error);
            } finally {
                setLoading(false);
            }
        };
        
        
        

        const deleteSliderImage = async (sliderImageId) => {
            const accessToken = localStorage.getItem('accessTokenAdmin');
            setLoading(true);

            try {
            const response = await axios.delete(`${baseUrl}deleteslider`, {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                },
                data: { id: sliderImageId },
            });

            if (response.data.success) {
                setSliderImages(sliderImages.filter((image) => image._id !== sliderImageId));
            } else {
                console.error('Failed to delete slider image:', response.data.message);
            }
            } catch (error) {
            console.error('Error deleting slider image:', error);
            } finally {
            setLoading(false);
            }
        };

        const handleEditClick = (sliderImage) => {
            setEditSliderImage(sliderImage);
            setEditImagePreview(sliderImage.sliderImg);
            handleShowEditForm();
        };

        useEffect(() => {
            fetchSliderImages();
        }, []);

        const fetchSliderImages = async () => {
            const accessToken = localStorage.getItem('accessTokenAdmin');
            setLoading(true);

            try {
            const result = await axios.get(`${baseUrl}getSliderImg`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (result.status === 200) {
                setSliderImages(result.data.data);
            }
            } catch (error) {
            console.error('Error fetching slider images:', error);
            } finally {
            setLoading(false);
            }
        };

        return (
            <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>Slider Image Table</h2>
                <Button variant="primary" onClick={handleShowForm}>
                Add Slider Image
                </Button>
            </div>

            {loading && <Spinner animation="border" variant="primary" />}

            <Card className="card-container">
                
                <Card.Body>
                <div className="table-container">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sliderImages.map((sliderImage, index) => (
                        <tr key={sliderImage.id}>
                        <td>{index + 1}</td>
                        <td>
                            <img
                            src={sliderImage.sliderImg}
                            alt="Slider"
                            style={{ width: '100px' }}
                            />
                        </td>
                        <td>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(sliderImage)}>
                            Edit
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => deleteSliderImage(sliderImage._id)}>
                            Delete
                            </Button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </div>
                </Card.Body>
            </Card>

            {/* Add Slider Image Form Modal */}
            <Modal show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Slider Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                    />
                    </Form.Group>

                    <Button variant="primary" onClick={handleAddSliderImage}>
                    Add Slider Image
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Slider Image Form Modal */}
            <Modal show={showEditForm} onHide={handleCloseEditForm}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Slider Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {editSliderImage && (
                    <Form>
                    <Form.Group className="mb-3" controlId="formImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                        type="file"
                        name="image"
                        onChange={handleEditInputChange}
                        />
                        {editImagePreview && (
                        <img
                            src={editImagePreview}
                            alt="Preview"
                            style={{ width: '100px', marginTop: '10px' }}
                        />
                        )}
                    </Form.Group>

                    <Button variant="primary" onClick={handleEditSliderImage}>
                        Update Slider Image
                    </Button>
                    </Form>
                )}
                </Modal.Body>
            </Modal>
            </div>
        );
        };

        export default SliderImageTable;
