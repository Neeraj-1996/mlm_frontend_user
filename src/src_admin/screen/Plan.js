import React, { useState, useEffect } from 'react'; 
import { Table, Button, Modal, Form, Card, Spinner } from 'react-bootstrap';
// import { fetchPlans, addPlan, updatePlan, deletePlan } from './apiController';im // Import the API functions
import { fetchPlans,addPlan, updatePlan, deletePlan  } from '../api_controlller/apicontrollerall';
const PlanTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({
    id: null,
    title: '',
    commission: '',
    price: '',
    image: '',
    shareLimit: '',
    grabNo: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    resultData();
  }, []);

  const resultData = async () => {
    setLoading(true);
    try {
      const plansData = await fetchPlans(); // Use the fetchPlans function
      setPlans(plansData);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowForm = (plan = null) => {
    if (plan) {
      setCurrentPlan({ ...plan });
      setIsEditing(true);
      setImagePreview(plan.planImg);
    } else {
      setCurrentPlan({
        id: null,
        title: '',
        commission: '',
        price: '',
        image: null,
        shareLimit: '',
        grabNo: ''
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
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else if (name === "image") {
      setCurrentPlan((prev) => ({
        ...prev,
        image: null,
      }));
      setImagePreview(null);
    } else {
      setCurrentPlan((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSavePlan = async () => {
    const formData = new FormData();
    formData.append('title', currentPlan.title);
    formData.append('commission', currentPlan.commission);
    formData.append('grabNo', currentPlan.grabNo);
    formData.append('shareLimit', currentPlan.shareLimit);
    formData.append('price', currentPlan.price);
  
    if (currentPlan.image) {
      formData.append('planImg', currentPlan.image);
    } else if (isEditing && currentPlan.eventImg) {
      const response = await fetch(currentPlan.eventImg);
      const blob = await response.blob();
      const existingImageFile = new File([blob], 'existingImage.jpg', { type: blob.type });
      formData.append('planImg', existingImageFile);
    }
  
    setLoading(true);
    try {
      if (isEditing) {
        formData.append('plan_id', currentPlan._id);
        await updatePlan(formData); // Use the updatePlan function
      } else {
        await addPlan(formData); // Use the addPlan function
      }
      resultData(); // Refresh plan list
    } catch (error) {
      console.error('Error saving plan:', error);
    } finally {
      setLoading(false);
      handleCloseForm();
    }
  };

  const handleDeletePlan = async (id) => {
    setLoading(true);
    try {
      await deletePlan(id); // Use the deletePlan function
      resultData(); // Refresh plan list
    } catch (error) {
      console.error('Error deleting plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between mb-1">
        <h2>Manage Plans</h2>
        <Button variant="primary" onClick={() => handleShowForm()}>
          Add Plan
        </Button>
      </div>

      <Card className="card-container">
        <Card.Body className="card-body">
          <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Title</th>
                  <th>No of Grab</th>
                  <th>Share Count</th>
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
                    <td>{plan.grabNo}</td>
                    <td>{plan.shareLimit}</td>
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
                        className="me-1"
                        onClick={() => handleShowForm(plan)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeletePlan(plan._id)}
                      >
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

      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Plan' : 'Add New Plan'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-1" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plan title"
                name="title"
                value={currentPlan.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formCommission">
              <Form.Label>Commission</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter commission percentage"
                name="commission"
                value={currentPlan.commission}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formGrabNo">
              <Form.Label>No. of grab</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Grab Count"
                name="grabNo"
                value={currentPlan.grabNo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formShareLimit">
              <Form.Label>Share Count</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Share Count"
                name="shareLimit"
                value={currentPlan.shareLimit}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plan price"
                name="price"
                value={currentPlan.price}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="image"
                onChange={handleInputChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100px', marginTop: '10px' }}
                />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForm}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSavePlan}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Save Plan'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlanTable;

// import React, { useState, useEffect } from 'react'; 
// import { Table, Button, Modal, Form, Card, Spinner } from 'react-bootstrap';
// import axios from 'axios';
// import baseUrl from './url';
// const PlanTable = () => {

//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   // const [events, setEvents] = useState([]);
//   const [plans, setPlans] = useState([]);


//   const [currentPlan, setCurrentPlan] = useState({
//     id: null,
//     title: '',
//     commission: '',
//     price: '',
//     image: '',
//     shareLimit:'',
//     grabNo:''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [imagePreview, setImagePreview] = useState('');

//   useEffect(() => {
//     resultData();
//   }, []);

//   const resultData = async () => {
//     // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmYyNDBiNDVkZGYwMTk5YThkYmZkOGMiLCJlbWFpbCI6InRlc3QxMjRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJuZWVyYWoiLCJpYXQiOjE3MjczNjU2MjUsImV4cCI6MTcyNzQ1MjAyNX0.G2UbloQMLCDxPRSwrbFY8m39y13H2VWGRK5GwAjVk6M'
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

//   const handleShowForm = (event = null) => {
//     if (event) {
//       setCurrentPlan({ ...event });
//       setIsEditing(true);
//       setImagePreview(event.planImg); // Set preview to existing image
//     } else {
//       setCurrentPlan({
//         id: null,
//         title: '',
//         startDate: '',
//         endDate: '',
//         description: '',
//         image: null,
//         eventImg: '',
//       });
//       setIsEditing(false);
//       setImagePreview('');
//     }
//     setShowForm(true);
//   };

//   const handleCloseForm = () => setShowForm(false);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "image" && files && files[0]) {
//       const file = files[0];
//       setCurrentPlan((prev) => ({
//         ...prev,
//         image: file, // Set the new image file
//       }));
//       setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the new file
//     } else if (name === "image") {
//       setCurrentPlan((prev) => ({
//         ...prev,
//         image: null, // Reset image file if no file selected
//       }));
//       setImagePreview(null); // Reset the preview
//     } else {
//       setCurrentPlan((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSavePlan = async () => {
//     const accessToken = localStorage.getItem('accessTokenAdmin');
//     const formData = new FormData();
//     formData.append('title', currentPlan.title);
//     formData.append('commission', currentPlan.commission);
//     formData.append('grabNo', currentPlan.grabNo);
//     formData.append('shareLimit', currentPlan.shareLimit);
//     formData.append('price', currentPlan.price);
//     // formData.append('description', currentPlan.description);
  
//     // Check if a new image is uploaded or use existing image
//     if (currentPlan.image) {
//       formData.append('planImg', currentPlan.image); // Use new image file
//     } else if (isEditing && currentPlan.eventImg) {
//       // Create a Blob from the existing image URL
//       const response = await fetch(currentPlan.eventImg);
//       const blob = await response.blob();
//       const existingImageFile = new File([blob], 'existingImage.jpg', { type: blob.type });
//       formData.append('planImg', existingImageFile); // Send existing image as file
//     }
  
//     setLoading(true);
//     try {
//       if (isEditing) {
//         formData.append('plan_id', currentPlan._id);
//         await axios.post(`${baseUrl}updatePlan`, formData, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//       } else {
//         await axios.post(`${baseUrl}addPlan`, formData, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//       }
//       resultData(); // Refresh event list
//     } catch (error) {
//       console.error('Error saving event:', error);
//     } finally {
//       setLoading(false);
//       handleCloseForm();
//     }
//   };
  

//   const handleDeletePlan = async (id) => {
//     const accessToken = localStorage.getItem('accessTokenAdmin');
//     setLoading(true);
//     try {
//       await axios.delete(`${baseUrl}deletePlan`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         data: { plan_id: id },
//       });
//       resultData(); // Refresh event list
//     } catch (error) {
//       console.error('Error deleting event:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const [showForm, setShowForm] = useState(false);








//   return (
//     <div className="container mt-1">
//       <div className="d-flex justify-content-between mb-1">
//         <h2>Manage Plans</h2>
//         <Button variant="primary" onClick={() => handleShowForm()}>
//           Add Plan
//         </Button>
//       </div>

//       {/* Scrollable Card for Plan Table */}
//       <Card className="card-container">
//         <Card.Body className="card-body">
//         <div className="table-container">
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>S. No.</th>
//                 <th>Title</th>
//                 <th>No of Grab</th>
//                 <th>Share Count</th>
//                 <th>Commission</th>
//                 <th>Price</th>
//                 <th>Image</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {plans.map((plan, index) => (
//                 <tr key={plan.id}>
//                   <td>{index + 1}</td>
//                   <td>{plan.title}</td>
//                   <td>{plan.grabNo}</td>
//                   <td>{plan.shareLimit}</td>
//                   <td>{plan.commission}</td>
//                   <td>{plan.price}</td>
//                   <td>
//                     <img
//                       src={plan.planImg}
//                       alt={plan.title}
//                       style={{ width: '100px' }}
//                     />
//                   </td>
//                   <td>
//                     <Button
//                       variant="warning"
//                       size="sm"
//                       className="me-1"
//                       onClick={() => handleShowForm(plan)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => handleDeletePlan(plan._id)}
//                     >
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

//       {/* Add/Edit Plan Form Modal */}
//       <Modal show={showForm} onHide={handleCloseForm}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? 'Edit Plan' : 'Add New Plan'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-1" controlId="formTitle">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter plan title"
//                 name="title"
//                 value={currentPlan.title}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-1" controlId="formCommission">
//               <Form.Label>Commission</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter commission percentage"
//                 name="commission"
//                 value={currentPlan.commission}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group className="mb-1" controlId="formCommission">
//               <Form.Label>No. of grab</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Grab Count"
//                 name="grabNo"
//                 value={currentPlan.grabNo}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group className="mb-1" controlId="formCommission">
//               <Form.Label>Share Count</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter  percentage"
//                 name="shareLimit"
//                 value={currentPlan.shareLimit}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-1" controlId="formPrice">
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter plan price"
//                 name="price"
//                 value={currentPlan.price}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-1" controlId="formImage">
//               <Form.Label>Image URL</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="image"
//                 onChange={handleInputChange}
//               />
//                {isEditing && imagePreview && (
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   style={{ width: '100px', marginTop: '10px' }}
//                 />
//               )}
//             </Form.Group>

//             <Button variant="primary" onClick={handleSavePlan}>
//               {isEditing ? 'Save Changes' : 'Add Plan'}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default PlanTable;
