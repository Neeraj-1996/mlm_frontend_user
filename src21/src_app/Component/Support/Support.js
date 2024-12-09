import React, { useState, useEffect ,useRef} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../Header/Header.js";
import ImageUploader from 'react-image-upload'
import baseUrlapp from "../Url/Urlapp.js";
import 'react-image-upload/dist/index.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Supports.css";
const Supports = () => {
  const chatEndRef = useRef(null); 
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    resultData();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options); // Format: September 29, 2024
    };
    
    const formatTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format: HH:MM AM/PM
    };
     const resultData = async () => {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      try {
        const result = await axios.get(`${baseUrlapp}getMessages?user_id=${userId}`,
          // {headers: { Authorization: `Bearer ${token}` },}
        );
    
        console.log("hello chat ", result.data);
        if (result.data) {
          setMessages(result.data); // Ensure this is an array of messages
        } else {
          console.log("error not get ezbuy data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    const groupMessagesByDate = (messages) => {
      return messages.reduce((acc, message) => {
        const date = formatDate(message.createdAt);
        if (!acc[date]) {
          acc[date] = []; // Create a new array for the date if it doesn't exist
        }
        acc[date].push(message);
        return acc;
      }, {});
    };

    
    const groupedMessages = groupMessagesByDate(messages); 
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
    const handleSend = async () => {
      // const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      // Check if userInput or image is available
      if (!userInput && !selectedImage) {
        // Show toast message if nothing is selected
        toast.warn("Please enter a message or select an image", {
          // position: toast.POSITION.TOP_RIGHT,
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
        const response = await axios.post(`${baseUrlapp}sendMessage?user_id=${userId}`,
           formData,
      
        );
        console.log("Message sent:", response.data);
    
        // Clear input after sending
        setUserInput("");
        setSelectedImage(null);
        resultData();  // Refresh or fetch the updated messages
    
        // Optionally show a success toast
        toast.success("Message sent successfully!", {
          // position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, // Toast will disappear after 2 seconds
        });
      } catch (error) {
        console.error("Error sending message:", error);
        // Show an error toast if message sending fails
        toast.error("Failed to send message!", {
          // position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    };
    
 
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
<div className="supports-container">
  {/* Fixed Header */}
  <Header name="Chat" onBack={handleBackClick} className="header" />
  <div className="support-container">
  <div className="chat-area">
      {Object.keys(groupedMessages).length > 0 ? (
        Object.keys(groupedMessages).map((date) => (
          <div key={date} className="date-group">
            <div className="date">{date}</div> {/* Display the date */}
            {groupedMessages[date].map((message) => (
              <div
                key={message._id} // Use message._id as the key
                className={`message ${message.isAdmin ? "system-message" : "user-message"}`} // Check isAdmin for class
              >
                {message.chatImg ? ( // Check if there is a chatImg
                  <img
                    src={message.chatImg} // Use chatImg URL directly
                    alt="Chatimage"
                    style={{ maxWidth: "100%" }}
                  />
                ) : (
                  <div className="message-content">
                    <p>{message.content}</p> {/* Use content for text messages */}
                    <span className="message-time">{formatTime(message.createdAt)}</span> {/* Display the time */}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No messages available</p> // Optional: Display a message when no messages are available
      )}
      <div ref={chatEndRef} /> 
    </div>

    <div className="input-containerC">
      <input
        type="text"
        className="input-box"
        placeholder="Type your message..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      
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
      
      <button className="send-button" onClick={handleSend}>
        Send
      </button>
    </div>
  </div>
</div>
);};

export default Supports;

