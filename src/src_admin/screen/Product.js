import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import baseUrl from './url';

const ProductTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    level: '',
    ratio_between: '',
    price: '',
    productImg: null,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  const handleShowEditForm = () => setShowEditForm(true);
  const handleCloseEditForm = () => setShowEditForm(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value, files } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setEditImagePreview(URL.createObjectURL(file)); // Create a preview URL for the new file
    } else if (name === "image") {
      setEditImagePreview(null); // Reset the preview
    }
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('product_name', newProduct.productName);
    formData.append('level', newProduct.level);
    formData.append('ratio_between', newProduct.ratio_between);
    formData.append('price', newProduct.price);
    formData.append('productImg', newProduct.productImg);
    
    const accessToken = localStorage.getItem('accessToken');
    setLoading(true); // Start loading

    try {
      const response = await axios.post(baseUrl+'addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const addedProduct = {
        ...newProduct,
        id: response.data.id,
        productImg: URL.createObjectURL(newProduct.productImg),
      };
  
      setProducts((prev) => [...prev, addedProduct]);
      setNewProduct({ productName: '', level: '', ratio_between: '', price: '', productImg: null });
      handleCloseForm();
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleEditProduct = async () => {
    const formData = new FormData();
    formData.append('id', editProduct._id);
    formData.append('product_name', editProduct.productName);
    formData.append('level', editProduct.level);
    formData.append('ratio_between', editProduct.ratioBetween);
    formData.append('price', editProduct.price);
    
    if (editProduct.image instanceof File) {
      formData.append('productImg', editProduct.image);
    }

    const accessToken = localStorage.getItem('accessToken');
    setLoading(true); // Start loading

    try {
      const response = await axios.post(baseUrl+'updateProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProducts((prev) =>
        prev.map((product) => 
          product._id === editProduct._id 
            ? { ...editProduct, image: editImagePreview || product.productImg } 
            : product
        )
      );

      setEditProduct(null);
      setEditImagePreview(null);
      handleCloseEditForm();
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deleteProduct = async (productId) => {
    const accessToken = localStorage.getItem('accessToken');
    setLoading(true); // Start loading

    try {
      const response = await axios.delete(baseUrl+'deleteProducts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: { id: productId },
      });

      if (response.data.statusCode === 200 && response.data.success) {
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        console.error('Failed to delete product:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditImagePreview(product.productImg);
    handleShowEditForm();
  };

  useEffect(() => {
    resultData();
  }, []);

  const resultData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    setLoading(true); // Start loading

    try {
      const result = await axios.get(baseUrl + 'getAllProducts', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (result.status === 200) {
        setProducts(result.data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Product Table</h2>
        <Button variant="primary" onClick={handleShowForm}>
          Add Product
        </Button>
      </div>

      {loading && <Spinner animation="border" variant="primary" />}
      
      <Card style={{ maxHeight: '700px', overflowY: 'scroll' }}>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Product Name</th>
                <th>Level</th>
                <th>Price Ratio</th>
                <th>Price</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>{product.level}</td>
                  <td>{product.ratioBetween}</td>
                  <td>{product.price}</td>
                  <td>
                    <img
                      src={product.productImg}
                      alt={product.productImg}
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(product)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => deleteProduct(product._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add Product Form Modal */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={newProduct.productName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLevel">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter level"
                name="level"
                value={newProduct.level}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRatio">
              <Form.Label>Ratio Between</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ratio"
                name="ratio_between"
                value={newProduct.ratio_between}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="productImg"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Product Form Modal */}
      <Modal show={showEditForm} onHide={handleCloseEditForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editProduct && (
            <Form>
              <Form.Group className="mb-3" controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="productName"
                  value={editProduct.productName}
                  onChange={handleEditInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLevel">
                <Form.Label>Level</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter level"
                  name="level"
                  value={editProduct.level}
                  onChange={handleEditInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRatio">
                <Form.Label>Ratio Between</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ratio"
                  name="ratioBetween"
                  value={editProduct.ratioBetween}
                  onChange={handleEditInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter price"
                  name="price"
                  value={editProduct.price}
                  onChange={handleEditInputChange}
                />
              </Form.Group>

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

              <Button variant="primary" onClick={handleEditProduct}>
                Update Product
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductTable;
