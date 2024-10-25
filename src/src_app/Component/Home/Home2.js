import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faLock } from '@fortawesome/free-solid-svg-icons';
import { Colors } from "../../asset/Color";
import {useNavigate } from 'react-router-dom';
import { fetchPlans } from "../../../src_admin/api_controlller/apicontrollerall";
import { width } from "@fortawesome/free-solid-svg-icons/faBuilding";
// import { height } from "@fortawesome/free-solid-svg-icons/faBuilding";
const baseUrl = "https://www.smarttrade.org.in/public/api/v1/"; // Replace "your_base_url_here" with your actual base URL

const demoUsers = [
  { id: '1', username: 'Aarav', earning: 100, img: require('../../asset/avatar/1.jpeg'), country: 'India' },
  { id: '2', username: 'Sofia', earning: 150, img: require('../../asset/avatar/2.jpeg'), country: 'India' },
  { id: '3', username: 'Liam', earning: 200, img: require('../../asset/avatar/3.jpeg'), country: 'India' },
  { id: '4', username: 'Chloe', earning: 250, img: require('../../asset/avatar/4.jpeg'), country: 'India' },
  { id: '5', username: 'Noah', earning: 300, img: require('../../asset/avatar/5.jpeg'), country: 'India' },
  { id: '6', username: 'Maya', earning: 350, img: require('../../asset/avatar/6.jpeg'), country: 'India' },
  { id: '7', username: 'Ethan', earning: 400, img: require('../../asset/avatar/7.jpeg'), country: 'India' },
  { id: '8', username: 'Isabella', earning: 450, img: require('../../asset/avatar/8.jpeg'), country: 'USA' },
  { id: '9', username: 'Lucas', earning: 500, img: require('../../asset/avatar/9.jpeg'), country: 'Germany' },
  { id: '10', username: 'Olivia', earning: 550, img: require('../../asset/avatar/10.jpeg'), country: 'France' },
  { id: '11', username: 'Yuki', earning: 600, img: require('../../asset/avatar/11.jpeg'), country: 'Brazil' },
  { id: '12', username: 'Lena', earning: 650, img: require('../../asset/avatar/12.jpeg'), country: 'Canada' },
  { id: '13', username: 'Jamal', earning: 700, img: require('../../asset/avatar/13.jpeg'), country: 'Italy' },
  { id: '14', username: 'Anika', earning: 750, img: require('../../asset/avatar/14.jpeg'), country: 'Spain' },
  { id: '15', username: 'Mateo', earning: 800, img: require('../../asset/avatar/15.jpeg'), country: 'Russia' },
  { id: '16', username: 'Saanvi', earning: 850, img: require('../../asset/avatar/16.jpeg'), country: 'Australia' },
  { id: '17', username: 'Kai', earning: 900, img: require('../../asset/avatar/17.jpeg'), country: 'Singapore' },
  { id: '18', username: 'Nia', earning: 950, img: require('../../asset/avatar/18.jpeg'), country: 'Malaysia' },
  { id: '19', username: 'Omar', earning: 1000, img: require('../../asset/avatar/19.jpeg'), country: 'Philippines' },
  { id: '20', username: 'Leila', earning: 1050, img: require('../../asset/avatar/20.jpeg'), country: 'Indonesia' },
  { id: '21', username: 'Dante', earning: 1100, img: require('../../asset/avatar/1.jpeg'), country: 'Australia' },
  { id: '22', username: 'Amina', earning: 1150, img: require('../../asset/avatar/2.jpeg'), country: 'France' },
  { id: '23', username: 'Hiro', earning: 1200, img: require('../../asset/avatar/3.jpeg'), country: 'Germany' },
  { id: '24', username: 'Freya', earning: 1250, img: require('../../asset/avatar/4.jpeg'), country: 'Brazil' },
  { id: '25', username: 'Thiago', earning: 1300, img: require('../../asset/avatar/5.jpeg'), country: 'Canada' },
  { id: '26', username: 'Zara', earning: 1350, img: require('../../asset/avatar/6.jpeg'), country: 'Italy' },
  { id: '27', username: 'Nico', earning: 1400, img: require('../../asset/avatar/7.jpeg'), country: 'Spain' },
  { id: '28', username: 'Sofia', earning: 1450, img: require('../../asset/avatar/8.jpeg'), country: 'Russia' },
  { id: '29', username: 'Ravi', earning: 1500, img: require('../../asset/avatar/9.jpeg'), country: 'Australia' },
  { id: '30', username: 'Clara', earning: 1550, img: require('../../asset/avatar/10.jpeg'), country: 'Japan' },
  { id: '31', username: 'Hassan', earning: 1600, img: require('../../asset/avatar/11.jpeg'), country: 'Indonesia' },
  { id: '32', username: 'Elena', earning: 1650, img: require('../../asset/avatar/12.jpeg'), country: 'Vietnam' },
  { id: '33', username: 'Yara', earning: 1700, img: require('../../asset/avatar/13.jpeg'), country: 'Thailand' },
  { id: '34', username: 'Luca', earning: 1750, img: require('../../asset/avatar/14.jpeg'), country: 'Germany' },
  { id: '35', username: 'Iman', earning: 1800, img: require('../../asset/avatar/15.jpeg'), country: 'Singapore' },
  { id: '36', username: 'Kenji', earning: 1850, img: require('../../asset/avatar/16.jpeg'), country: 'India' },
  { id: '37', username: 'Mila', earning: 1900, img: require('../../asset/avatar/17.jpeg'), country: 'India' },
  { id: '38', username: 'Santiago', earning: 1950, img: require('../../asset/avatar/18.jpeg'), country: 'India' },
  { id: '39', username: 'Aisha', earning: 2000, img: require('../../asset/avatar/19.jpeg'), country: 'India' },
  { id: '40', username: 'Diego', earning: 2050, img: require('../../asset/avatar/20.jpeg'), country: 'India' },
  { id: '41', username: 'Evelyn', earning: 2100, img: require('../../asset/avatar/1.jpeg'), country: 'USA' },
  { id: '42', username: 'Rina', earning: 2150, img: require('../../asset/avatar/2.jpeg'), country: 'Brazil' },
  { id: '43', username: 'Pablo', earning: 2200, img: require('../../asset/avatar/3.jpeg'), country: 'France' },
  { id: '44', username: 'Fatima', earning: 2250, img: require('../../asset/avatar/4.jpeg'), country: 'Germany' },
  { id: '45', username: 'Zain', earning: 2300, img: require('../../asset/avatar/5.jpeg'), country: 'Japan' },
  { id: '46', username: 'Ayla', earning: 2350, img: require('../../asset/avatar/6.jpeg'), country: 'Vietnam' },
  { id: '47', username: 'Arjun', earning: 2400, img: require('../../asset/avatar/7.jpeg'), country: 'Indonesia' },
  { id: '48', username: 'Kiara', earning: 2450, img: require('../../asset/avatar/8.jpeg'), country: 'Australia' },
  { id: '49', username: 'Rafael', earning: 2500, img: require('../../asset/avatar/9.jpeg'), country: 'Germany' },
  { id: '50', username: 'Nina', earning: 2550, img: require('../../asset/avatar/10.jpeg'), country: 'France' },
];




const Homeplan = ({ navigation }) => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("button1");
  const [plans, setPlans] = useState([]);
  const [userPlan, setUserPlan] = useState("");
  const [users, setUsers] = useState(demoUsers);
  const [topUserIndex, setTopUserIndex] = useState(0);

  

  useEffect(() => {
    resultData();
    resultDataFeatch();
  }, []);

  const resultData = async () => {

    const token = localStorage.getItem("tokenId");
    try {
      const response = await axios.get(baseUrl + 'userPlan', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        console.log("response",response)
        setUserPlan(response.data.data.title);
      } else {
        console.log('Error: Unable to get data');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };



  const resultDataFeatch = async () => {
    // setLoading(true);
    try {
      const plansData = await fetchPlans();
      setPlans(plansData);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      // setLoading(false);
    }
  };



  console.log("plan",plans)

  const buyPlan = (item) => {
    console.log("jai shree ram",item)
    if (userPlan === item.title) {
      // navigate("/Product")
      console.log("item",item);
    }
  };


  // const [topUserIndex, setTopUserIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTopUserIndex(prevIndex => (prevIndex + 1) % users.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [users]);

  useEffect(() => {
    // Update earnings for all users every 5 seconds
    const earningsInterval = setInterval(() => {
      setUsers(prevUsers =>
        prevUsers.map(user => ({
          ...user,
          earning: user.earning + Math.floor(Math.random() * 50) // Random increase
        }))
      );
    }, 5000);

    return () => clearInterval(earningsInterval);
  }, []);

  const displayUsers = users
    .map((user, index) => ({
      ...user,
      isTopUser: index === topUserIndex,
    }))
    .sort((a, b) => b.earning - a.earning)
    .slice(0, 5);
    
  // const renderItem = ({ item }) => (
  //   <div className="card" onClick={() => buyPlan(item)}>
  //     <img src={`https://www.smarttrade.org.in/public/uploads/Country/${item.image}`} alt={item.title} />
  //     <span>{item.title}</span>
  //   </div>
  // );

  // const handleButtonPress = () => {
  //   if (userPlan === "TEsting Plan") {
  //     alert("Insufficient Balance: To activate your first plan, you need at least 100 USDT in your wallet.");
  //   } else {
  //     // navigation.navigate("Product");
  //     navigate("/Product")
  //   }
  // };

  // const handleButtonSell = () => {
  //   // navigation.navigate("Sell");
  //   navigate("/Sellproduct")
  // };

  // const handleButtonDirect = () => {
  //   // navigation.navigate("Commission2");
  //   navigate("/Direactcommission")
  // };

  // const handleButtonLevel = () => {
  //   // navigation.navigate("LevelCommission");
  //   navigate("/TeamReport")
  // };

  return (
    <div>
      <div className="screenMiddle3">
  {plans.map((item, index) => (
    <button 
      className={`cardPlan ${index !== 0 ? 'locked' : ''}`} 
      key={item._id} // Updated to use _id from the fetched data
      onClick={() => buyPlan(item)}
    >
      <img 
        src={item.planImg} // Use the dynamic plan image from the fetched data
        alt={item.title}
        className="cardImage"
      />
      {index !== 0 && (
        <div className="lockIcon">
          <FontAwesomeIcon icon={faLock} style={{color:'#000'}} />
        </div>
      )}
    </button>
  ))}
</div>

{/* <div className="screenMiddle3">
  {plans.map((item, index) => (
    <button 
      className={`cardPlan ${index !== 0 ? 'locked' : ''}`} 
      key={item.id} 
      onClick={() => buyPlan(item)} 
    >
      <img 
        src={`https://www.smarttrade.org.in/public/uploads/Country/${item.image}`} 
        alt={item.title} 
        className="cardImage"
      />
      {index !== 0 && (
        <div className="lockIcon">
        <FontAwesomeIcon icon={faLock}  style={{color:'#000'}} />
        </div>
      )}
    </button>
  ))}
</div> */}


<div className="userListH"> 
  {displayUsers.map((user, index) => (
    <div
      className={`cardH ${user.isTopUser ? 'topUserH' : ''}`}
      key={user.id}
    >
      <div className="userInfoRowH">
        {/* <img
          src={require(`../../asset/avatar/${index + 1}.jpeg`)} // Dynamically load images from 1.jpeg to 10.jpeg
          alt="Profile"
          className="avatar-imgH"
        /> */}
         <img
              src={user.img} // Use the img property directly
              alt="Profile"
              className="avatar-imgH"
            />
      </div>
      <div className="userInfoColumnH">
        <div className="usernameH">{user.username}</div>
        <div className="earningH">${user.earning}</div>
        <div className="countryH">{user.country}</div>
      </div>
      <div>
      
      <FontAwesomeIcon icon={faStar} className="icon1H" />
      {user.isTopUser && <div className="topUserTagH">Top User</div>}
      </div>
    </div>
  ))}
</div>


   

      <div style={{marginBottom:"100px"}}></div>
  </div>
  
  );
};




export default Homeplan;
//   const styles = {
//  button: {
//   padding: '5px 5px' ,
//   color:"#fff",
//   width:'170px',
//   fontSize:"16px",
//   borderRadius:"10px",
//   backgroundColor:Colors.backgroundBlue
//   },
  
//   screenMiddle3: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between' ,
//     marginTop:'10px',

//   },
//   card: {
//     width: '100%', 

//     boxSizing: 'border-box',

//     display:'flex',justifyContent:'center',alignItems: "center",
//     padding:'5px',
//     borderRadius:'10px'
  

    
//   },
//   '@media (min-width: 768px)': {
//     card: {
//       maxWidth: 'calc(50% - 20px)' 
//     }
//   }

// };

 {/* <div className="userList">
        {displayUsers.map(user => (
          <div
            className={`card1 ${user.isTopUser ? 'topUser' : ''}`}
            key={user.id}
          >
        <img
  src={require('../../asset/avatar/1.jpeg')} // for Webpack
  alt="Profile"
  className="avatar-img"
/>

            
            <FontAwesomeIcon icon={faStar} className="icon1" />
            <div className="username">{user.username}</div>
            <div className="earning">${user.earning}</div>
            {user.isTopUser && <div className="topUserTag">Top User</div>}
          </div>
        ))}
      </div> */}


      {/* <div className="screenMiddle2">
  <div className="buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
    {userPlan !== undefined ? (
      <button style={styles.button} className={selectedButton === 'button1' ? 'selectedButton' : ''} onClick={handleButtonPress}>
        {userPlan === 'Testing Plan' ? 'No plan active' : userPlan}
      </button>
    ) : (
      <button style={styles.button}className="disabledButton">No plan active</button>
    )}
    <button style={styles.button} className={selectedButton === 'button2' ? 'selectedButton' : ''} onClick={handleButtonSell}>Product Sell</button>
  </div>
</div> */}


      {/* <div className="endHomeScreen" style={{marginTop:"10px"}}>
        <div className="buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button  style={styles.button}  className={selectedButton === "button1" ? 'selectedButton' : ''} onClick={handleButtonDirect}>Direct Income</button>
          <button  style={styles.button}  className={selectedButton === "button2" ? 'selectedButton' : ''} onClick={handleButtonLevel}>Team Report</button>
        </div>
        
      </div> */}