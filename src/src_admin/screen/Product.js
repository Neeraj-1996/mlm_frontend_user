import React, { useEffect, useState } from 'react';
import ProductApi from '../api_controlller/apicontroller';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [plans, setPlans] = useState([]); // State to store plans
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchPlans(); // Fetch available plans on mount
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await ProductApi.getAllProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchPlans = async () => {
    try {
      const data = await ProductApi.getPlanRecords();
      console.log("data",data); // Assuming a method to get plans
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await ProductApi.deleteProduct(productId);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Find the plan name based on the selected plan_id
    const selectedPlanId = formData.get('plan_id');
    const selectedPlan = plans.find(plan => plan._id === selectedPlanId);
    
    const updatedProduct = {
      _id: currentProduct._id,
      productName: formData.get('productName'),
      ratioBetween: formData.get('ratioBetween'),
      price: formData.get('price'),
      plan_id: selectedPlanId, // Get the plan_id from form
      plan_name: selectedPlan ? selectedPlan.title : '', // Get the plan_name, or set to empty if not found
      productImg: formData.get('productImg'),
    };
  
    try {
      await ProductApi.updateProduct(updatedProduct);
      fetchProducts();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newProduct = {
      productName: formData.get('productName'),
      ratioBetween: formData.get('ratioBetween'),
      price: formData.get('price'),
      plan_id: formData.get('plan_id'), // This will be the selected plan's ID
      plan_name: plans.find(plan => plan._id === formData.get('plan_id')).title, // Get the plan name
      productImg: formData.get('productImg'),
    };
  
    try {
      await ProductApi.addProduct(newProduct);
      fetchProducts();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  const handleModalClose = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setCurrentProduct(null);
  };

  return (
    <div className="container mt-5 main_dsborad_cntenT">
      <h2>Product Table</h2>

      <Button variant="success" onClick={handleAdd}>
        Add Product
      </Button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card className="card-container">
          <Card.Body className="card-body">
            <div className="table-container">
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Ratio Between</th>
                    <th>Price</th>
                    <th>Plan Name</th>
                    <th>Product Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>{product.productName}</td>
                      <td>{product.ratioBetween}</td>
                      <td>{product.price}</td>
                      <td>{product.plan_name}</td>
                      <td>
                        {product.productImg && (
                          <img
                            src={product.productImg}
                            alt={product.productName}
                            style={{ width: '100px', height: '100px' }}
                          />
                        )}
                      </td>
                      <td>
                        <Button variant="primary" onClick={() => handleEdit(product)}>
                          Edit
                        </Button>{' '}
                        <Button variant="danger" onClick={() => handleDelete(product._id)}>
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
      )}

      {/* Modal for Adding Product */}
      <Modal show={showAddModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="productName" required />
            </Form.Group>

            <Form.Group controlId="ratioBetween">
              <Form.Label>Ratio Between</Form.Label>
              <Form.Control type="text" name="ratioBetween" required />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" required />
            </Form.Group>

            <Form.Group controlId="plan_id">
              <Form.Label>Select Plan</Form.Label>
              <Form.Control as="select" name="plan_id" required>
                <option value="">Select Plan</option>
                {plans.map(plan => (
                  <option key={plan._id} value={plan._id}>
                    {plan.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="productImg">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" name="productImg" required />
            </Form.Group>

            <Button variant="success" type="submit">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

{/* Modal for Editing Product */}
<Modal show={showEditModal} onHide={handleModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {currentProduct && (
      <Form onSubmit={handleEditSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="productName"
            defaultValue={currentProduct.productName}
            required
          />
        </Form.Group>

        <Form.Group controlId="ratioBetween">
          <Form.Label>Ratio Between</Form.Label>
          <Form.Control
            type="text"
            name="ratioBetween"
            defaultValue={currentProduct.ratioBetween}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            defaultValue={currentProduct.price}
            required
          />
        </Form.Group>

        <Form.Group controlId="plan_id">
          <Form.Label>Select Plan</Form.Label>
          <Form.Control as="select" name="plan_id" defaultValue={currentProduct.plan_id} required>
            <option value="">Select Plan</option>
            {plans.map(plan => (
              <option key={plan._id} value={plan._id}>
                {plan.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

      

        <Form.Group controlId="productImg">
          <Form.Label>Upload New Product Image (optional)</Form.Label>
          <Form.Control type="file" name="productImg" />
        </Form.Group>

  {/* Display current product image */}
  {currentProduct.productImg && (
          <Form.Group>
            <Form.Label>Current Product Image</Form.Label>
            <img
              src={currentProduct.productImg}
              alt={currentProduct.productName}
              style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
            />
          </Form.Group>
        )}
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    )}
  </Modal.Body>
</Modal>

    </div>
  );
};

export default ProductTable;


// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Card, Spinner } from 'react-bootstrap';
// import axios from 'axios';
// import baseUrl from './url';

// const ProductTable = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     productName: '',
  
//     ratioBetween: '',
//     price: '',
//     productImg: null,
//     plan_id: '',    // Plan ID
//     planName: ''   // Plan Name
//   });
//   const [editProduct, setEditProduct] = useState(null);
//   const [editImagePreview, setEditImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state

//   const handleShowForm = () => setShowForm(true);
//   const handleCloseForm = () => setShowForm(false);
//   const handleShowEditForm = () => setShowEditForm(true);
//   const handleCloseEditForm = () => setShowEditForm(false);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     setNewProduct((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   console.log("new product ",newProduct);
//   const handleEditInputChange = (e) => {
//     const { name, value, files } = e.target;
//     setEditProduct((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
  
//     if (name === "image" && files && files[0]) {
//       const file = files[0];
//       setEditImagePreview(URL.createObjectURL(file)); // Create a preview URL for the new file
//     } else if (name === "image") {
//       setEditImagePreview(null); // Reset the preview
//     }
//   };

//   const handleAddProduct = async () => {
//     const formData = new FormData();

//     formData.append('product_name', newProduct.productName);
//     // formData.append('level', newProduct.level);
//     formData.append('ratio_between', newProduct.ratioBetween);
//     formData.append('price', newProduct.price);
//     formData.append('productImg', newProduct.productImg);
//     formData.append('plan_id', newProduct.plan_id); 
//     formData.append('plan_name', newProduct.plan_name);

//     console.log("formData",formData)
//     const accessToken = localStorage.getItem('accessTokenAdmin');
//     setLoading(true); 

//     try {
//       const response = await axios.post(baseUrl+'addProduct', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
  
//       const addedProduct = {
//         ...newProduct,
//         id: response.data.id,
//         productImg: URL.createObjectURL(newProduct.productImg),
//       };
  
//       setProducts((prev) => [...prev, addedProduct]);
//       setNewProduct({  productName: '',  ratio_between: '', price: '', productImg: null, plan_id: '', planName: ''  });
//       handleCloseForm();
//     } catch (error) {
//       console.error('Error adding product:', error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const handleEditClick = (product) => {
//     console.log("product",product)
//     setEditProduct(product);
//     setEditImagePreview(product.productImg);
//     handleShowEditForm();
//   };

//   console.log("edit product",editProduct);
//   const handleEditProduct = async () => {
//     const formData = new FormData();
//     formData.append('product_id', editProduct._id);
//     formData.append('product_name', editProduct.productName);
//     // formData.append('level', editProduct.level);
//     formData.append('ratio_between', editProduct.ratioBetween);
//     formData.append('price', editProduct.price);
//     formData.append('plan_id', editProduct.plan_id);   // Sending plan ID
//     formData.append('plan_name', editProduct.plan_name); // Sending plan name
    
//     if (editProduct.image instanceof File) {
//       formData.append('productImg', editProduct.image);
//     }

//     const accessToken = localStorage.getItem('accessTokenAdmin');

//     console.log("data",formData);
//     setLoading(true); // Start loading

//     try {
//       const response = await axios.post(baseUrl+'updateProduct', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       setProducts((prev) =>
//         prev.map((product) => 
//           product._id === editProduct._id 
//             ? { ...editProduct, image: editImagePreview || product.productImg } 
//             : product
//         )
//       );

//       setEditProduct(null);
//       setEditImagePreview(null);
//       handleCloseEditForm();
//     } catch (error) {
//       console.error('Error updating product:', error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const deleteProduct = async (productId) => {
//     const accessToken = localStorage.getItem('accessTokenAdmin');
//     setLoading(true);
//     try {
//       await axios.delete(`${baseUrl}deleteProducts`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         data: { product_id: productId },
//       });
//       resultData(); 
//     } catch (error) {
//       console.error('Error deleting Product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     resultData();
//     resultDataPlan()
//     }, []);

//   const resultData = async () => {
//     const accessToken = localStorage.getItem('accessTokenAdmin');
//     setLoading(true); // Start loading

//     try {
//       const result = await axios.get(baseUrl + 'getAllProducts', {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });

//       if (result.status === 200) {
//         setProducts(result.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };
//   const [plans, setPlans] = useState([]);
//   const resultDataPlan = async () => {
//     const accessToken = localStorage.getItem('accessTokenAdmin');
//     setLoading(true);

//     try {
//       const result = await axios.get(`${baseUrl}getPlanRecords`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       if (result.status === 200) {
//         setPlans(result.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const selectedPlan = plans.find(plan => plan._id === e.target.value);
//     console.log("selectedPlan",selectedPlan);
//     setNewProduct(prev => ({
//       ...prev,
//       plan_id: e.target.value, 
//       plan_name: selectedPlan ? selectedPlan.title : ''
//     }));
//   };
  


//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between mb-3">
//         <h2>Product Table</h2>
//         <Button variant="primary" onClick={handleShowForm}>
//           Add Product
//         </Button>
//       </div>

//       {loading && <Spinner animation="border" variant="primary" />}
      
//       <Card className="card-container">
//         <Card.Body className="card-body">
//         <div className="table-container">
//           <Table striped bordered hover >
//             <thead>
//               <tr>
//               <th>S. No.</th>
//                 <th>Product Name</th>
//                 {/* <th>Level</th> */}
//                 <th>Price Ratio</th>
//                 <th>Price</th>
//                 <th>Plan Name</th>  {/* Show Plan Name */}
//                 <th>Image</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product, index) => (
//                 <tr key={product.id}>
//                   <td>{index + 1}</td>
//                   <td>{product.productName}</td>
//                   {/* <td>{product.level}</td> */}
//                   <td>{product.ratioBetween}</td>
//                   <td>{product.price}</td>
//                   <td>{product.planName}</td>
//                   <td>
//                     <img
//                       src={product.productImg}
//                       alt={product.productImg}
//                       style={{ width: '100px' }}
//                     />
//                   </td>
//                   <td>
//                     <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(product)}>
//                       Edit
//                     </Button>
//                     <Button variant="danger" size="sm" onClick={() => deleteProduct(product._id)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Add Product Form Modal */}
//       <Modal show={showForm} onHide={handleCloseForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formProductName">
//               <Form.Label>Product Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter product name"
//                 name="productName"
//                 value={newProduct.productName}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
            
//             <Form.Group className="mb-3" controlId="formRatio">
//               <Form.Label>Ratio Between</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter ratio"
//                 name="ratioBetween"
//                 value={newProduct.ratioBetween}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPrice">
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter price"
//                 name="price"
//                 value={newProduct.price}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Select Plan</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="plan_id"
//                 value={newProduct.plan_id}
//                 onChange={handleChange}
//                 // onChange={(e) => {
//                 //   const selectedPlan = plans.find(plan => plan._id === e.target.value);
//                 //   setNewProduct(prev => ({ ...prev, plan_id: e.target.value, plan_name: selectedPlan ? selectedPlan.title : '' }));
//                 // }}
//               >
//                 <option value="">Select Plan</option>
//                 {plans.map(plan => (
//                   <option key={plan._id} value={plan._id}>
//                     {plan.title}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formImage">
//               <Form.Label>Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="productImg"
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Button variant="primary" onClick={handleAddProduct}>
//               Add Product
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Edit Product Form Modal */}
//       <Modal show={showEditForm} onHide={handleCloseEditForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {editProduct && (
//             <Form>
//               <Form.Group className="mb-3" controlId="formProductName">
//                 <Form.Label>Product Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter product name"
//                   name="productName"
//                   value={editProduct.productName}
//                   onChange={handleEditInputChange}
//                 />
//               </Form.Group>
              
//               <Form.Group className="mb-3" controlId="formRatio">
//                 <Form.Label>Ratio Between</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter ratio"
//                   name="ratioBetween"
//                   value={editProduct.ratioBetween}
//                   onChange={handleEditInputChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formPrice">
//                 <Form.Label>Price</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter price"
//                   name="price"
//                   value={editProduct.price}
//                   onChange={handleEditInputChange}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//           <Form.Label>Select Plan</Form.Label>
//           <Form.Control
//             as="select"
//             name="plan_id"
//             value={editProduct.plan_id}
//             onChange={(e) => {
//               const selectedPlan = plans.find(plan => plan._id === e.target.value);
//               setEditProduct((prev) => ({
//                 ...prev,
//                 plan_id: e.target.value,
//                 plan_name: selectedPlan ? selectedPlan.title : '',
//               }));
//             }}
//           >
//             <option value="">Select Plan</option>
//             {plans.map((plan) => (
//               <option key={plan._id} value={plan._id}>
//                 {plan.title}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//               <Form.Group className="mb-3" controlId="formImage">
//                 <Form.Label>Image</Form.Label>
//                 <Form.Control
//                   type="file"
//                   name="image"
//                   onChange={handleEditInputChange}
//                 />
//                 {editImagePreview && (
//                   <img
//                     src={editImagePreview}
//                     alt="Preview"
//                     style={{ width: '100px', marginTop: '10px' }}
//                   />
//                 )}
//               </Form.Group>

//               <Button variant="primary" onClick={handleEditProduct}>
//                 Update Product
//               </Button>
//             </Form>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ProductTable;
