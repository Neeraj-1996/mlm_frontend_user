import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Card } from "react-bootstrap";
import baseUrl from "./url";
import axios from "axios";
import ImageUploader from 'react-image-upload'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Utility function to check if the timestamp is within the last 48 hours
const isWithinLast48Hours = (timestamp) => {
  const now = new Date();
  const past48Hours = new Date(now.getTime() - 168 * 60 * 60 * 1000); // Subtract 48 hours from now
  return new Date(timestamp) >= past48Hours;  // Compare timestamp with 48 hours ago
};

const SupportTable = () => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  // const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState([]);
  // const [messageSend, setMessageSend] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userInput, setUserInput] = useState("");
  const handleViewMessages = async (user) => {
    console.log("USER",user);
    setSelectedUser(user);
    await getMessages(user.userId);
    await fetchNotificationMessageRemove(user.userId);
   
    setShowMessageModal(true);
  };

  const handleSendMessageSubmit = async () => {
    
    if (!userInput && !selectedImage) {
      // Show toast message if nothing is selected
      toast.warn("Please enter a message or select an image", {
      
        autoClose: 3000,  // Toast will disappear after 3 seconds
      });
      return;
    }
    const formData = new FormData();
    if (userInput) formData.append("content", userInput);
    if (selectedImage && selectedImage.file) {
      formData.append("chatImg", selectedImage.file); // Append the actual file object
    }
    console.log("FormData:", formData);
    try {
      const response = await axios.post(`${baseUrl}sendMessageAdmin?user_id=${selectedUser.userId}`,
         formData,
    
      );
      console.log("Message sent:", response.data);

      setUserInput("");
      setSelectedImage(null);
      getMessages(); 
     toast.success("Message sent successfully!", {autoClose: 2000, });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message!", {autoClose: 3000,});
    }

  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    setSelectedUser(null);
  };

  // Fetch messages for a user and check if they have any messages within the last 48 hours

const hasRecentMessages = async (userId) => {
      const accessToken = localStorage.getItem('accessTokenAdmin');
  try {
    const result = await axios.get(`${baseUrl}getMessages?user_id=${userId}`,{
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    if (result.status === 200) {
      // Filter messages sent within the last 48 hours and where isAdmin is false
      console.log("hasRecentMessages",result.data)
      const recentMessages = result.data.filter(message => 
        isWithinLast48Hours(message.createdAt) && message.isAdmin === false
      );
      return recentMessages.length > 0; // Return true if any messages found
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
  return false;
};

const [notificationCount, setNotificationCounts] = useState(0);

// Fetch all users and filter those who have sent messages in the last 48 hours
    const fetchUsers = async () => {
      setLoading(true);
      const accessToken = localStorage.getItem('accessTokenAdmin');
      try {
        const result = await axios.get(`${baseUrl}getUserRecords`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (result.status === 200) {
          const allUsers = result.data.data;
          // console.log("allUsers",allUsers);
          const usersWithRecentMessages = [];
          const newNotificationCounts = {};
          // Iterate over each user and check if they have recent messages
          for (const user of allUsers) {
            const hasMessages = await hasRecentMessages(user.userId);
            const unreadCount = await fetchNotificationMessage(user.userId); // Get the unread count

        // Store the unread count for this user
        if (unreadCount !== null) {
          newNotificationCounts[user.userId] = unreadCount;
        }
            if (hasMessages) {
              usersWithRecentMessages.push(user);
            }
          }
          console.log("content",usersWithRecentMessages);
          
          setUsers(usersWithRecentMessages);
          setNotificationCounts(newNotificationCounts); 
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

  const getMessages = async (userId) => {
    const accessToken = localStorage.getItem('accessTokenAdmin');
    setLoading(true);
    try {const result = await axios.get(`${baseUrl}getMessages?user_id=${userId}`,{
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 200) {
        console.log("result result", result.data);
        setMessage(result.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  function getImageFileObject(imageFile) {
    console.log({ imageFile });
    setSelectedImage({
      file: imageFile.file,
      dataUrl: imageFile.dataUrl // Storing the dataUrl to use it directly in the chat
    });
  }
  function runAfterImageDelete(file) {
    console.log({ file })
  }

  const fetchNotificationMessageRemove = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}getAdminMessagesCountRemove?user_id=${userId}`, {});
      // console.log("remove admin", response.data);
      setNotificationCounts({})
      if (response.data.success) {
        console.log("remove admin", response.data.data);
        return response.data.data.unreadCount; // Return the unread count
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return null; // Return null on error
    }
  };

 

  const fetchNotificationMessage = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}getAdminUnreadMessageCount?user_id=${userId}`, {});
      
      if (response.data.success) {
        // console.log("fetchNotificationMessage admin", response.data.data);
        return response.data.data.unreadCount; // Return the unread count
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return null; // Return null on error
    }
  };
  

  return (
    <div className="container mt-1 main_dsborad_cntenT">
      <div className="d-flex justify-content-between mb-1">
        <h2>Support Table</h2>
      </div>
      <Card className="card-container">
        <Card.Body>
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S. No.</th>
                <th>User Name</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.mobileNo}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleViewMessages(user)}
                    >   View Messages
                    </Button>
                    {notificationCount[user.userId] > 0 && (
                      <span className="notification-badge-admin-support">
                        {notificationCount[user.userId]}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </Card.Body>
      </Card>

      {/* View Messages Modal */}
      <Modal show={showMessageModal} onHide={handleCloseMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Messages from {selectedUser?.username || "User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {message.length > 0 ? (
              message.map((msg, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: msg.isAdmin ? "flex-end" : "flex-start",
                    margin: "10px 0",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "60%",
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: msg.isAdmin ? "#e1f5fe" : "#fce4ec", // Light blue for admin, light pink for user
                      color: "#000",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: msg.isAdmin ? "flex-end" : "flex-start",
                    }}
                  >
                    {msg.chatImg && (
                      <img
                        src={msg.chatImg}
                        alt="ChatImage"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                    <p style={{ margin: "5px 0" }}>{msg.content}</p>
                    <small style={{ color: "#666" }}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </small>
                  </div>
                </li>
              ))
            ) : (
              <li>No messages found.</li>
            )}
          </ul>

          <Form>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </Form.Group>

            <ImageUploader
                id="imageUploader"
                withIcon={false}
                buttonText="Choose image"
                onFileAdded={(img) => getImageFileObject(img)}
                onFileRemoved={(img) => runAfterImageDelete(img)}
                singleImage={true}
                withLabel={false}
                buttonStyles={{ display: "none" }} // Hide the default button
              />
            <Button
              variant="primary"
              onClick={handleSendMessageSubmit}
              className="mt-3"
            >
              Send
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SupportTable;


  // console.log("notification",notificationCount);

  
  // useEffect(() => {
    

  //   fetchNotificationMessage();
  //     }, []);
//   const message = await axios.get(`${baseUrl}getPlanRecords`, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   const [rest1, reslt2]= await Promise.all([
//     axios.get(`${baseUrl}getPlanRecords`, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     }),
//     axios.get(baseUrl + 'getAllProducts', {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     }),
//   ])

//   user?.forEach((itm)=>{
// const userMessage=        message?.find(itmCh=>itmCh.userId===itm.userId);
// itm.userMessage=userMessage
//   });

// try {
//   const user = await axios.get(baseUrl + 'getAllProducts', {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   const message = await axios.get(`${baseUrl}getPlanRecords`, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   const [rest1, reslt2]= await Promise.all([
//     axios.get(`${baseUrl}getPlanRecords`, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     }),
//     axios.get(baseUrl + 'getAllProducts', {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     }),
//   ])

//   user?.forEach((itm)=>{
// const userMessage=        message?.find(itmCh=>itmCh.userId===itm.userId);
// itm.userMessage=userMessage
//   });
