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
    
      try {
        const result = await axios.get(baseUrlapp + "getMessages/66f240b45ddf0199a8dbfd8c", {
          headers: { Authorization: `Bearer ${token}` },
        });
    
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
    const handleSend = async () => {
      const token = localStorage.getItem("accessToken");
    
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
        const response = await axios.post(
          baseUrlapp+"sendMessage/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
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
    
  function runAfterImageDelete(file) {
    console.log({ file })
  }
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



// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faImage } from "@fortawesome/free-solid-svg-icons";
    // Image picker handler
//     const onDrop = (pictureFiles) => {
// console.log("gfnjksfs",pictureFiles);      
//       setPicture(pictureFiles[0]); // Get the first selected image
//     };

    // console.log("jsndfnds picture",picture);

  
    {/* <div className="chat-area">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.type === "user" ? "user-message" : "system-message"}`}
        >
          {message.image ? (
            <img
              src={message.image.dataUrl ? message.image.dataUrl : URL.createObjectURL(message.image.file)}
              alt="Selected"
              style={{ maxWidth: "100%" }}
            />
          ) : (
            <p>{message.message}</p>
          )}
        </div>
      ))}
      <div ref={chatEndRef} /> 
    </div> */}
    

 // const handleSend = async () => {
  //   console.log("hbfsdfds",picture)
  //   if (userInput.trim() !== "" || picture) {
  //     const messageData = {
  //       id: new Date().getTime(),
  //       type: picture ? "image" : "user",
  //       message: picture ? "Image sent" : userInput, 
  //       image: picture, // Handle image here
  //     };

  //     setMessages([...messages, messageData]);
  //     setUserInput("");
  //     setPicture(null); // Clear image

  //     // Sending the message to the server
  //     try {
  //       const token = localStorage.getItem("tokenId");
  //       const endpoint = "submit-chat";

  //       await axios.post(
  //         baseUrl + endpoint,
  //         { message: userInput },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };
  // const handleSend = async () => {

  //   const messageData = {
  //     id: new Date().getTime(),
  //     type: picture ? "image" : "user",
  //     message: picture ? "Image sent" : userInput, // Placeholder for image
  //     image: picture, // Can be handled separately
  //   };

  //   if (userInput.trim() !== "") {
  //     const newMessage = {
  //       id: messages.length + 1,
  //       message: userInput,
  //       type: "user",
  //     };
  //     setMessages([...messages,messageData]);
  //     setUserInput("");

  //     try {
  //       const token = localStorage.getItem("tokenId");
  //       const endpoint = "submit-chat";

  //       await axios.post(
  //         baseUrl + endpoint,
  //         { message: userInput },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };


  


  

      {/* <div className="chat-area">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.type === "user" ? "user-message" : "system-message"}`}
          >
            <p>{message.message}</p>
          </div>
        ))}
      </div> */}

      {/* Fixed Input Box */}
  {/* <div className="input-container">
        <input
          className="input-box"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
           <ImageUploader
      onFileAdded={(img) => getImageFileObject(img)}
      onFileRemoved={(img) => runAfterImageDelete(img)}
    />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div> */}

    // <div style={{ height: "100%", width: "100%", flex: 1, backgroundColor: "white" }}>
    //   {/* <Header title="Supports" /> */}
    //   <Header name="Header" onBack={handleBackClick} />
    //   <div style={{ marginTop: 100, paddingHorizontal: 10,padding:'5px' }}>
    //     {messages.map((message) => (
    //       <div
    //         key={message.id}
    //         style={
    //           message.type === "user"
    //             ? {
    //                 backgroundColor: "gray",
    //                 alignSelf: "flex-end",
    //                 padding: 5,
    //                 borderTopLeftRadius: 10,
    //                 borderBottomRightRadius: 10,
    //                 borderBottomLeftRadius: 10,
    //                 marginTop: 10,
    //                 marginLeft:"100px"
                    
    //               }
    //             : {
    //                 backgroundColor: "#1B334D",
    //                 alignSelf: "flex-start",
    //                 padding: 5,
    //                 borderTopRightRadius: 25,
    //                 borderBottomRightRadius: 20,
    //                 borderBottomLeftRadius: 15,
    //                 marginTop: 10,
    //                 width:"90%"
    //               }
    //         }
    //       >
    //         <p style={{ color: "white", fontSize: 16 }}>{message.message}</p>
    //       </div>
    //     ))}
    //   </div>

    //   <div style={{   marginTop: 240, marginBottom: 20, width: "100%" ,marginLeft:'20px',}}>
    //     <input
    //       style={{ flex: 1, backgroundColor: "white", borderWidth: 1, borderColor: "#EC8E22", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15, marginRight: 10,width:"70%" ,}}
    //       placeholder="Type your message..."
    //       value={userInput}
    //       onChange={(e) => setUserInput(e.target.value)}
    //     />
    //     <button style={{ backgroundColor: "#1B334D", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5, borderWidth: 1, borderColor: "#EC8E22", color: "#EC8E22", fontSize: 16, fontWeight: "bold" }} onClick={handleSend}>Send</button>
    //   </div>
    // </div>