import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faGift } from '@fortawesome/free-solid-svg-icons/faGift';
import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons/faMoneyBillTransfer'; // Importing money bill transfer icon
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'; // Importing envelope icon
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet'; // Import wallet icon
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'; // Import star icon
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'; // Import graduation cap icon
import { useNavigate } from 'react-router-dom';
// import './Homepart1.css'; // Import CSS file

const Homepart1 = () => {
  const navigate = useNavigate();
  
  return (
    <div className="screenMiddle">
      <div className="buttonRow1">
      <button className="direct" 
      onClick={() => navigate("/Deposit")}
      >
          <FontAwesomeIcon icon={faMoneyBillTransfer} size="lg" color="#764bd1" className="icon" style={{ height: "35px" }} /> {/* Updated icon */}
          <h6 className="text">Deposit</h6>
        </button>

        <button className="direct"
         onClick={() => navigate("/Withdrwal")}
        >
          <FontAwesomeIcon icon={faWallet} size="lg" color="#764bd1" className="icon"   style={{height:"35px"}}/>
          <h6 className="text">Withdrawal</h6>
        </button>
      </div>

      <div className="buttonRow">
        <button className="direct1" onClick={() => navigate("/Finance")}>
          <FontAwesomeIcon icon={faChartBar} size="lg" color="#764bd1" className="icon"  style={{height:"30px"}}/>
          <h6 className="text1">Financial</h6>
        </button>
        <button className="direct1" onClick={() => navigate("/Promotion")}>
          <FontAwesomeIcon icon={faEnvelope} size="lg" color="#764bd1" className="icon" style={{height:"30px"}} />
          {/* <h6 className="text1">Promotion Reward</h6> */}
          <h6 className="text1">Reward</h6>
        </button>
        <button className="direct1" onClick={() => navigate("/CompanyDetail")}>
          <FontAwesomeIcon icon={faUser} size="lg" color="#764bd1" className="icon" style={{height:"30px"}} />
          {/* <h6 className="text1">Company Profile</h6> */}
          <h6 className="text1">Insights</h6>
        </button>
        <button className="direct1" onClick={() => navigate("/VIPEvents")}>
          <FontAwesomeIcon icon={faStar} size="lg" color="#764bd1" className="icon" style={{height:"30px"}} /> {/* Updated icon */}
          {/* <h6 className="text1">VIP Events</h6> */}
          <h6 className="text1">Events</h6>
        </button>
        <button className="direct1" onClick={() => navigate("/TutorialScreen")}>
          <FontAwesomeIcon icon={faGraduationCap} size="lg" color="#764bd1" className="icon"  style={{height:"30px"}} /> {/* Updated icon */}
          {/* <h6 className="text1">Beginner Tutorial</h6> */}
          <h6 className="text1">Tutorial</h6>
        </button>
      </div>

      <div className="buttonRow2">
        <button className="direct2" onClick={() => navigate("/InviteScreen")} >
          <FontAwesomeIcon icon={faGift} size="lg" color="#764bd1" className="icon" style={{height:"35px"}} />
          <h6 className="text">Invitation</h6>
        </button>
      </div>
    </div>
  );
};

export default Homepart1;




// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBuilding, faGift, faEnvelope, faChartBar,faUser } from '@fortawesome/free-solid-svg-icons';
// import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
// import {useNavigate } from 'react-router-dom';
// const Homepart1 = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//     <div style={styles.screenMiddle}>
//       <div style={{ flexDirection: "row", marginTop: 5, marginLeft: 8 }}>
//         <button style={styles.direct} 
//         // onClick={() => navigate("/Company")}
//         >
//           <div style={styles.direct}>
//           <FontAwesomeIcon icon={faBuilding} size="lg" color="#764bd1" style={{ alignSelf: "center", marginRight: 5 }} />
//           <h6 style={styles.text}>Deposit</h6>
//           </div>
//         </button>

//         <button style={styles.direct} 
       
//          >
//           <FontAwesomeIcon icon={faGift} size="lg" color="#764bd1" style={{ alignSelf: "center", marginRight: 5 }} />
//           <h6 style={styles.text}>Withdrawal</h6>
//         </button>

//       </div>
//       <div style={{ flexDirection: "row", marginTop: 10, marginLeft: 8 }}>
//         <button style={styles.direct1}  onClick={() => navigate("/Finance")}>
//           <FontAwesomeIcon icon={faChartBar} size="lg" color="#764bd1" style={{ alignSelf: "center", marginRight: 5 }} />
//           <h6 style={styles.text}>Financial</h6>
//         </button>
//         <button style={styles.direct1} 
//         // onClick={() => navigation.navigate("Withdrawal")}
//         onClick={() => navigate("/Promotion")}
//         >
//           <FontAwesomeIcon icon={faChartBar} size="lg" color="#764bd1" style={{ alignSelf: "center", marginRight: 5 }} />
//           <h6 style={styles.text}>Promotion Reaward</h6>
//         </button>
//         <button style={styles.direct1} 
//         // onClick={() => navigation.navigate("UserProfile")}
//         onClick={() => navigate("/CompanyDetail")}
        
//         >
//           <FontAwesomeIcon icon={faUser} size="lg" color="#764bd1" style={{ alignSelf: "center" }} />
//           <h6 style={styles.text}>Company Profile</h6>
//         </button>
//         <button style={styles.direct1} 
//         // onClick={() => navigation.navigate("Withdrawal")}
//         onClick={() => navigate("/VIPEvents")}
//         >
//           <FontAwesomeIcon icon={faChartBar} size="lg" color="#764bd1" style={{ alignSelf: "center", marginRight: 5 }} />
//           <h6 style={styles.text}>Vip Events</h6>
//         </button>
//         <button style={styles.direct1} 

//         onClick={() => navigate("/TutorialScreen")}
        
//         >
//           <FontAwesomeIcon icon={faUser} size="lg" color="#764bd1" style={{ alignSelf: "center" }} />
//           <h6 style={styles.text}>Beginner Tutorial</h6>
//         </button>
//       </div>
//       <div style={{ flexDirection: "row", marginTop: 5, marginLeft: 8 }}>
//         <button style={styles.direct2} 
//         onClick={() => navigate("/InviteScreen")}
//         >
          
//           <FontAwesomeIcon icon={faBuilding} size="lg" color="#764bd1" style={{ alignSelf: "center", marginRight: 5 }} />
//           <h6 style={styles.text}>Invitation</h6>
//         </button>

     
//       </div>

//     </div>
//     </div>
//   );
// };

// export default Homepart1;

// const styles = {
//   screenMiddle: {
//     padding: 10,
//     marginTop: 8,
//     width: "98%",
//     alignSelf: "center",
//     borderRadius: 10,
//     // backgroundColor: "#1B334D",
//     margin:"5px"
//   },
//   text: {
//     // alignSelf: "center",
//     color: "#000",
//     fontSize: 15
//   },
//   direct: {
//     flexDirection: "row",
//     marginRight: 10,
//     height: 55,               // Number without 'px'
//     width: '30%',             // Percent values are strings
//     backgroundColor: 'transparent', 
//     borderRadius: 10,         // Number without 'px'
//     borderWidth: 2,           // Number without 'px'
//     borderColor: "#000",      // Color value is fine as string
//   },
//   direct1: {
//     flexDirection: "row",
//     marginRight: 10,
//     height:'55px',
//     width:'15%',
//     backgroundColor: 'transparent', 
//     borderRadius:"10px"
//   },
//   direct2: {
//     // flexDirection: "row",
//     marginRight: 10,
//     height:'55px',
//     width:'90%',
//     backgroundColor: 'transparent', 
//     borderRadius:"10px"
//   }
// };
