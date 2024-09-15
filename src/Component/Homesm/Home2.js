// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// // import baseUrl from "../Url/Url";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar,faLock } from '@fortawesome/free-solid-svg-icons';
// import { Colors } from "../../asset/Color";
// import {useNavigate } from 'react-router-dom';
// import './Homepart1.css'; // Import CSS file
// import { width } from "@fortawesome/free-solid-svg-icons/faBuilding";
// // import { height } from "@fortawesome/free-solid-svg-icons/faBuilding";
// const baseUrl = "https://www.smarttrade.org.in/public/api/v1/"; // Replace "your_base_url_here" with your actual base URL


// const demoUsers = [
//   { id: '1', username: 'User1', earning: 100 },
//   { id: '2', username: 'User2', earning: 150 },
//   { id: '3', username: 'User3', earning: 200 },
//   { id: '4', username: 'User4', earning: 250 },
//   { id: '5', username: 'User5', earning: 300 },
//   { id: '6', username: 'User6', earning: 350 },
//   { id: '7', username: 'User7', earning: 400 },
//   { id: '8', username: 'User8', earning: 450 },
//   { id: '9', username: 'User9', earning: 500 },
//   { id: '10', username: 'User10', earning: 550 },
// ];

// const Homeplan = ({ navigation }) => {
//   const navigate = useNavigate();
//   const [selectedButton, setSelectedButton] = useState("button1");
//   const [plans, setPlans] = useState([]);
//   const [userPlan, setUserPlan] = useState("");
//   const [users, setUsers] = useState(demoUsers);
//   const [topUserIndex, setTopUserIndex] = useState(0);


//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   useEffect(() => {
//     resultData();
//   }, []);

//   const resultData = async () => {

//     const token = localStorage.getItem("tokenId");
//     try {
//       const response = await axios.get(baseUrl + 'userPlan', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200) {
//         setUserPlan(response.data.data.title);
//       } else {
//         console.log('Error: Unable to get data');
//       }
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   const fetchPlans = () => {
//     axios.get(baseUrl + 'Plan')
//       .then(response => {
//         // setPlans(response.data.data);
//         // console.log("ram",response.data.data)
//         const plansData = response.data.data;
//       const plansArray = Object.values(plansData);
//       setPlans(plansArray);
        
//       })
//       .catch(error => console.error(error));
//   };

//   console.log("plan",plans)

//   const buyPlan = (item) => {
//     console.log("jai shree ram",item)
//     if (userPlan === item.title) {
//       // navigate("/Product")
//       console.log("item",item);
//     }
//   };


//   // const [topUserIndex, setTopUserIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTopUserIndex(prevIndex => (prevIndex + 1) % users.length);
//     }, 10000);

//     return () => clearInterval(intervalId);
//   }, [users]);

//   useEffect(() => {
//     // Update earnings for all users every 5 seconds
//     const earningsInterval = setInterval(() => {
//       setUsers(prevUsers =>
//         prevUsers.map(user => ({
//           ...user,
//           earning: user.earning + Math.floor(Math.random() * 50) // Random increase
//         }))
//       );
//     }, 5000);

//     return () => clearInterval(earningsInterval);
//   }, []);

//   const displayUsers = users
//     .map((user, index) => ({
//       ...user,
//       isTopUser: index === topUserIndex,
//     }))
//     .sort((a, b) => b.earning - a.earning)
//     .slice(0, 5);
    
//   // const renderItem = ({ item }) => (
//   //   <div className="card" onClick={() => buyPlan(item)}>
//   //     <img src={`https://www.smarttrade.org.in/public/uploads/Country/${item.image}`} alt={item.title} />
//   //     <span>{item.title}</span>
//   //   </div>
//   // );

//   // const handleButtonPress = () => {
//   //   if (userPlan === "TEsting Plan") {
//   //     alert("Insufficient Balance: To activate your first plan, you need at least 100 USDT in your wallet.");
//   //   } else {
//   //     // navigation.navigate("Product");
//   //     navigate("/Product")
//   //   }
//   // };

//   // const handleButtonSell = () => {
//   //   // navigation.navigate("Sell");
//   //   navigate("/Sellproduct")
//   // };

//   // const handleButtonDirect = () => {
//   //   // navigation.navigate("Commission2");
//   //   navigate("/Direactcommission")
//   // };

//   // const handleButtonLevel = () => {
//   //   // navigation.navigate("LevelCommission");
//   //   navigate("/TeamReport")
//   // };

//   return (
//     <div>
// <div className="screenMiddle3">
//   {plans.map((item, index) => (
//     <button 
//       className={`card ${index !== 0 ? 'locked' : ''}`} 
//       key={item.id} 
//       onClick={() => buyPlan(item)} 
//     >
//       <img 
//         src={`https://www.smarttrade.org.in/public/uploads/Country/${item.image}`} 
//         alt={item.title} 
//         className="cardImage"
//       />
//       {index !== 0 && (
//         <div className="lockIcon">
//           <FontAwesomeIcon icon={faLock} /> {/* Ensure you have imported faLock */}
//         </div>
//       )}
//     </button>
//   ))}
// </div>



//     <div className="userList">
//         {displayUsers.map(user => (
//           <div
//             className={`card1 ${user.isTopUser ? 'topUser' : ''}`}
//             key={user.id}
//           >
//             <FontAwesomeIcon icon={faStar} className="icon1" />
//             <div className="username">{user.username}</div>
//             <div className="earning">${user.earning}</div>
//             {user.isTopUser && <div className="topUserTag">Top User</div>}
//           </div>
//         ))}
//       </div>
//       <div style={{marginBottom:"100px"}}></div>
//   </div>
  
//   );
// };const styles = {
//   screenMiddle3: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: '10px',  // Added gap for spacing between cards
//     marginTop: '10px',
//   },
//   card: {
//     height:'5%',
//     width: '46%',
//       // Sets width of the card to 48% to fit two cards per row
//     boxSizing: 'border-box',
//     // display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '10px',
//     borderRadius: '10px',
//     backgroundColor: '#1b1b1b',  // Change background color if needed
//     // marginBottom: '10px',  // Margin between rows
//     cursor: 'pointer', // Cursor for button style
//   },
//   cardImage: {
//     width: '100%',
//     height:"10%",  // Makes the image fill the card width
//     borderRadius: '10px',
//   },
//   // Media queries for larger screens
//   '@media (min-width: 768px)': {
//     card: {
//       flex: '0 0 20%',  // Three cards per row for medium devices
//       maxWidth: '20%',
//     },
//   },
//   '@media (min-width: 1024px)': {
//     card: {
//       flex: '0 0 20%',  // Four cards per row for larger devices
//       maxWidth: '20%',
//     },
//   },



//   card1: {
//     backgroundColor: '#fff',
//     padding: '15px',
//     margin: '10px',
//     width:"95%",
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//     textAlign: 'center',
//   },
//   username: {
//     fontSize: '18px',
//     fontWeight: 'bold',
//   },
//   earning: {
//     fontSize: '16px',
//     color: '#888',
//   },
//   topUserTag: {
//     marginTop: '5px',
//     fontSize: '14px',
//     color: 'red',
//   },
//   userList:{
//     width:'100%'
//   }
// };




// export default Homeplan;
// //   const styles = {
// //  button: {
// //   padding: '5px 5px' ,
// //   color:"#fff",
// //   width:'170px',
// //   fontSize:"16px",
// //   borderRadius:"10px",
// //   backgroundColor:Colors.backgroundBlue
// //   },
  
// //   screenMiddle3: {
// //     display: 'flex',
// //     flexWrap: 'wrap',
// //     justifyContent: 'space-between' ,
// //     marginTop:'10px',

// //   },
// //   card: {
// //     width: '100%', 

// //     boxSizing: 'border-box',

// //     display:'flex',justifyContent:'center',alignItems: "center",
// //     padding:'5px',
// //     borderRadius:'10px'
  

    
// //   },
// //   '@media (min-width: 768px)': {
// //     card: {
// //       maxWidth: 'calc(50% - 20px)' 
// //     }
// //   }

// // };


//       {/* <div className="screenMiddle2">
//   <div className="buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
//     {userPlan !== undefined ? (
//       <button style={styles.button} className={selectedButton === 'button1' ? 'selectedButton' : ''} onClick={handleButtonPress}>
//         {userPlan === 'Testing Plan' ? 'No plan active' : userPlan}
//       </button>
//     ) : (
//       <button style={styles.button}className="disabledButton">No plan active</button>
//     )}
//     <button style={styles.button} className={selectedButton === 'button2' ? 'selectedButton' : ''} onClick={handleButtonSell}>Product Sell</button>
//   </div>
// </div> */}


//       {/* <div className="endHomeScreen" style={{marginTop:"10px"}}>
//         <div className="buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
//           <button  style={styles.button}  className={selectedButton === "button1" ? 'selectedButton' : ''} onClick={handleButtonDirect}>Direct Income</button>
//           <button  style={styles.button}  className={selectedButton === "button2" ? 'selectedButton' : ''} onClick={handleButtonLevel}>Team Report</button>
//         </div>
        
//       </div> */}