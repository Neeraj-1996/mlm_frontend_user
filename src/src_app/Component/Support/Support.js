import React, { useState, useEffect ,useRef} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header.js";
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import baseUrl from "../Url/Url.js";

import "./Supports.css";
const Supports = () => {
  const chatEndRef = useRef(null); // To scroll to the bottom

  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [picture, setPicture] = useState(null);
  useEffect(() => {
    resultData();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


    // Image picker handler
//     const onDrop = (pictureFiles) => {
// console.log("gfnjksfs",pictureFiles);      
//       setPicture(pictureFiles[0]); // Get the first selected image
//     };

    console.log("jsndfnds picture",picture);
  const resultData = async () => {
    const token = localStorage.getItem("tokenId");

    try {
      const result = await axios.get(baseUrl + "getChat", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (result.status === 200) {
        setMessages(result.data.data);
      } else {
        console.log("error not get ezbuy data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  const handleSend = async () => {
    console.log("hbfsdfds",picture)
    if (userInput.trim() !== "" || picture) {
      const messageData = {
        id: new Date().getTime(),
        type: picture ? "image" : "user",
        message: picture ? "Image sent" : userInput, // Placeholder for image
        image: picture, // Handle image here
      };

      setMessages([...messages, messageData]);
      setUserInput("");
      setPicture(null); // Clear image

      // Sending the message to the server
      try {
        const token = localStorage.getItem("tokenId");
        const endpoint = "submit-chat";

        await axios.post(
          baseUrl + endpoint,
          { message: userInput },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };
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

  function getImageFileObject(imageFile) {
    console.log({ imageFile });
    setPicture({
      file: imageFile.file,
      dataUrl: imageFile.dataUrl // Storing the dataUrl to use it directly in the chat
    });
  }
  

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

      {/* Scrollable Chat Area */}
      <div className="chat-area">
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
  <div ref={chatEndRef} /> {/* Scroll to bottom */}
</div>

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


      <div className="input-container">
        {/* <FontAwesomeIcon
          icon={faImage}
          className="gallery-icon"
          onClick={() => document.getElementById("imageUploader").click()}
        /> */}
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
          // onChange={onDrop}
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
    </div>

  );
};

export default Supports;


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