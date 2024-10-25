import React, { useState } from "react";
import "./SlotMachine.css"; // Ensure you have the necessary custom CSS here
import logo from '../../asset/logo/logo2.png'; // Logo image
import coin from "../../asset/images/coins/bnb.png"; // Coin image
import Header from "../Header/Header";
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const [slot1, setSlot1] = useState([logo, logo, logo]);
  const [slot2, setSlot2] = useState([logo, logo, logo]);
  const [slot3, setSlot3] = useState([logo, logo, logo]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinning1, setSpinning1] = useState(false);
  const [spinning2, setSpinning2] = useState(false);
  const [spinning3, setSpinning3] = useState(false);
  const [result, setResult] = useState("");

  // Function to get the initial logo image in all slots
  const getLogoImages = () => {
    return Array.from({ length: 3 }, () => logo); // Display logo image in all 3 slots
  };

  // Function to get the coin images after 5 seconds
  const getCoinImages = () => {
    return Array.from({ length: 3 }, () => coin); // Display coin image in all 3 slots
  };

  const spinSlots = () => {
    setIsSpinning(true);
    setSpinning1(true);
    setSpinning2(true);
    setSpinning3(true);
    setResult(""); // Clear previous result

    // Initially spin and show logo images
    setSlot1(getLogoImages());
    setSlot2(getLogoImages());
    setSlot3(getLogoImages());

    // After 5 seconds, replace logo with coin images in each slot
    setTimeout(() => {
      setSlot1(getCoinImages());
      setSpinning1(false); // Stop Slot 1 visually
    }, 5000); // Slot 1 shows logo for 5s, then switches to coin

    setTimeout(() => {
      setSlot2(getCoinImages());
      setSpinning2(false); // Stop Slot 2 visually
    }, 5500); // Slot 2 shows logo for 5s, then switches to coin

    setTimeout(() => {
      setSlot3(getCoinImages());
      setSpinning3(false); // Stop Slot 3 visually
      setIsSpinning(false); // End spinning after all slots stop
      setResult("🎉 Coins are here! 🎉"); // Customize the result message
    }, 6000); // Slot 3 shows logo for 5s, then switches to coin
  };
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      <Header name="Vertex Venture" onBack={handleBackClick} />
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* <h1>Slot Machine - Order</h1> */}

      {/* Slot Machine Card */}
      <div className="slot-machine-card">
        {/* Slot 1 */}
        <div className="slot-card">
          <div className={`slot ${spinning1 ? "spinning" : ""}`}>
            {slot1.map((img, index) => (
              <div className="image-card" key={index}>
                <img src={img} alt="Symbol" style={{ width: '100px', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Slot 2 */}
        <div className="slot-card">
          <div className={`slot ${spinning2 ? "spinning" : ""}`}>
            {slot2.map((img, index) => (
              <div className="image-card" key={index}>
                <img src={img} alt="Symbol" style={{ width: '100px', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Slot 3 */}
        <div className="slot-card">
          <div className={`slot ${spinning3 ? "spinning" : ""}`}>
            {slot3.map((img, index) => (
              <div className="image-card" key={index}>
                <img src={img} alt="Symbol" style={{ width: '100px', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={spinSlots}
        style={{
          padding: "10px 20px",
          fontSize: "20px",
          cursor: isSpinning ? "not-allowed" : "pointer",
        }}
        disabled={isSpinning}
      >
        {isSpinning ? "Vantures..." : "Vortex 🎰"}
      </button>

      <div style={{ marginTop: "20px", fontSize: "24px" }}>{result}</div>
    </div>
    </div>
  );
};

export default Order;

// import React, { useState } from "react";  
// import "./SlotMachine.css"; // Ensure you have the necessary custom CSS here
// import logo from '../../asset/logo/logo2.png'
// import coin from "../../asset/images/coins/bnb.png"
// const Order = () => {
//   const symbols = ["🍒", "🍋", "🍊", "🍇", "🍉", "⭐", "🔔"];

//   const [slot1, setSlot1] = useState(["🍒", "🍋", "🍊"]);
//   const [slot2, setSlot2] = useState(["🍋", "🍇", "🍉"]);
//   const [slot3, setSlot3] = useState(["🍊", "⭐", "🔔"]);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [spinning1, setSpinning1] = useState(false);
//   const [spinning2, setSpinning2] = useState(false);
//   const [spinning3, setSpinning3] = useState(false);
//   const [result, setResult] = useState("");

//   const getRandomSymbols = () => {
//     return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
//   };

//   const spinSlots = () => {
//     setIsSpinning(true);
//     setSpinning1(true);
//     setSpinning2(true);
//     setSpinning3(true);
//     setResult(""); 

//     setTimeout(() => {
//       setSlot1(getRandomSymbols());
//       setSpinning1(false); 
//     }, 2000); 

//     setTimeout(() => {
//       setSlot2(getRandomSymbols());
//       setSpinning2(false); 
//     }, 3500); 

//     setTimeout(() => {
//       setSlot3(getRandomSymbols());
//       setSpinning3(false); 
//       setIsSpinning(false); 
//       checkResult(); 
//     }, 4500); 
//   };

//   const checkResult = () => {
//     if (
//       slot1[0] === slot2[0] &&
//       slot2[0] === slot3[0] &&
//       slot1[1] === slot2[1] &&
//       slot2[1] === slot3[1] &&
//       slot1[2] === slot2[2] &&
//       slot2[2] === slot3[2]
//     ) {
//       setResult("🎉 Jackpot! You Win! 🎉");
//     } else {
//       setResult("Try Again!");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Slot Machine - Order</h1>

//       {/* Slot Machine Card */}
//       <div className="slot-machine-card">
//         {/* Slot 1 */}
//         <div className="slot-card">
//           <div className={`slot ${spinning1 ? "spinning" : ""}`}>
//             {slot1.map((fruit, index) => (
//               <div className="fruit-card" key={index}>
//                 {fruit}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Slot 2 */}
//         <div className="slot-card">
//           <div className={`slot ${spinning2 ? "spinning" : ""}`}>
//             {slot2.map((fruit, index) => (
//               <div className="fruit-card" key={index}>
//                 {fruit}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Slot 3 */}
//         <div className="slot-card">
//           <div className={`slot ${spinning3 ? "spinning" : ""}`}>
//             {slot3.map((fruit, index) => (
//               <div className="fruit-card" key={index}>
//                 {fruit}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={spinSlots}
//         style={{
//           padding: "10px 20px",
//           fontSize: "20px",
//           cursor: isSpinning ? "not-allowed" : "pointer",
//         }}
//         disabled={isSpinning}
//       >
//         {isSpinning ? "Spinning..." : "Spin 🎰"}
//       </button>


//       <div style={{ marginTop: "20px", fontSize: "24px" }}>{result}</div>
//       <div>
//       <img src={logo} alt="Example" style={{ width: '100px', height: 'auto' }} />
//       </div>
//     </div>
//   );
// };

// export default Order;




























// import React, { useState } from "react"; 
// import "./SlotMachine.css"; // Add custom CSS

// const Order = () => {
//   const symbols = ["🍒", "🍋", "🍊", "🍇", "🍉", "⭐", "🔔"];

//   const [slot1, setSlot1] = useState(["🍒", "🍋", "🍊"]);
//   const [slot2, setSlot2] = useState(["🍋", "🍇", "🍉"]);
//   const [slot3, setSlot3] = useState(["🍊", "⭐", "🔔"]);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [spinning1, setSpinning1] = useState(false); // New state for slot 1 spinning
//   const [spinning2, setSpinning2] = useState(false); // New state for slot 2 spinning
//   const [spinning3, setSpinning3] = useState(false); // New state for slot 3 spinning
//   const [result, setResult] = useState("");

//   // Function to get random symbols for slots
//   const getRandomSymbols = () => {
//     return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
//   };

//   // Function to handle slot spinning with sequential stopping
//   const spinSlots = () => {
//     setIsSpinning(true);
//     setSpinning1(true);
//     setSpinning2(true);
//     setSpinning3(true);
//     setResult(""); // Clear previous result

//     // Spin and stop Slot 1
//     setTimeout(() => {
//       setSlot1(getRandomSymbols());
//       setSpinning1(false); // Stop Slot 1 visually
//     }, 500); // Slot 1 stops after 0.5s

//     // Spin and stop Slot 2 after 2 seconds from Slot 1
//     setTimeout(() => {
//       setSlot2(getRandomSymbols());
//       setSpinning2(false); // Stop Slot 2 visually
//     }, 2500); // Slot 2 stops after 2 seconds

//     // Spin and stop Slot 3 after another 2 seconds from Slot 2
//     setTimeout(() => {
//       setSlot3(getRandomSymbols());
//       setSpinning3(false); // Stop Slot 3 visually
//       setIsSpinning(false); // End spinning after all slots stop
//       checkResult(); // Check if it's a winning combination
//     }, 4500); // Slot 3 stops after another 2 seconds
//   };

//   // Function to check for a winning combination
//   const checkResult = () => {
//     if (
//       slot1[0] === slot2[0] &&
//       slot2[0] === slot3[0] &&
//       slot1[1] === slot2[1] &&
//       slot2[1] === slot3[1] &&
//       slot1[2] === slot2[2] &&
//       slot2[2] === slot3[2]
//     ) {
//       setResult("🎉 Jackpot! You Win! 🎉");
//     } else {
//       setResult("Try Again!");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Slot Machine - Order</h1>

//       <div className="slot-container">
//         <div className={`slot ${spinning1 ? "spinning" : ""}`}>
//           {slot1.map((fruit, index) => (
//             <div key={index}>{fruit}</div>
//           ))}
//         </div>
//         <div className={`slot ${spinning2 ? "spinning" : ""}`}>
//           {slot2.map((fruit, index) => (
//             <div key={index}>{fruit}</div>
//           ))}
//         </div>
//         <div className={`slot ${spinning3 ? "spinning" : ""}`}>
//           {slot3.map((fruit, index) => (
//             <div key={index}>{fruit}</div>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={spinSlots}
//         style={{
//           padding: "10px 20px",
//           fontSize: "20px",
//           cursor: isSpinning ? "not-allowed" : "pointer",
//         }}
//         disabled={isSpinning}
//       >
//         {isSpinning ? "Spinning..." : "Spin 🎰"}
//       </button>
//       <div style={{ marginTop: "20px", fontSize: "24px" }}>{result}</div>
//     </div>
//   );
// };

// export default Order;







// import React, { useState, useEffect, useRef } from 'react';
// import './spinner.css'; // Assuming the CSS is moved to a separate file
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRedo } from '@fortawesome/free-solid-svg-icons';

// const RepeatButton = ({ onClick }) => (
//   <button 
//     aria-label='Play again.' 
//     id='repeatButton' 
//     onClick={onClick}>
//     <FontAwesomeIcon icon={faRedo} color="white" size="2x" />
//   </button>
// );

// const Order = () => {
//   const [winner, setWinner] = useState(null);
//   const matches = useRef([]);

//   const finishHandler = (value) => {
//     matches.current.push(value);
//     if (matches.current.length === 3) {
//       const first = matches.current[0];
//       const isWinner = matches.current.every(match => match === first);
//       setWinner(isWinner);
//     }
//   };

//   const handleClick = () => {
//     setWinner(null);
//     matches.current = [];
//     child1.current.reset();
//     child2.current.reset();
//     child3.current.reset();
//   };

//   const getLoser = () => {
//     const loserMessages = [
//       'Not quite', 
//       'Stop gambling', 
//       'Hey, you lost!', 
//       'Ouch! I felt that',      
//       'Don\'t beat yourself up',
//       'There goes the college fund',
//       'I have a cat. You have a loss',
//       'You\'re awesome at losing',
//       'Coding is hard',
//       'Don\'t hate the coder'
//     ];
//     return loserMessages[Math.floor(Math.random() * loserMessages.length)];
//   };

//   const child1 = useRef();
//   const child2 = useRef();
//   const child3 = useRef();

//   return (
//     <div>
//       <h1 style={{ color: 'white' }}>
//         <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
//       </h1>
//       <div className="spinner-container">
//         <Spinner ref={child1} onFinish={finishHandler} timer="1000" />
//         <Spinner ref={child2} onFinish={finishHandler} timer="1400" />
//         <Spinner ref={child3} onFinish={finishHandler} timer="2200" />
//         <div className="gradient-fade"></div>
//       </div>
//       {winner !== null && <RepeatButton onClick={handleClick} />}
//     </div>
//   );
// };

// const Spinner = React.forwardRef(({ timer, onFinish }, ref) => {
//   const [position, setPosition] = useState(0);
//   const [timeRemaining, setTimeRemaining] = useState(timer);
//   const iconHeight = 188;
//   const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
//   const speed = iconHeight * multiplier;

//   const setStartPosition = () => {
//     return (Math.floor(Math.random() * 9) * iconHeight) * -1;
//   };

//   let start = useRef(setStartPosition());

//   const moveBackground = () => {
//     setPosition((prevPosition) => prevPosition - speed);
//     setTimeRemaining((prevTime) => prevTime - 100);
//   };

//   const getSymbolFromPosition = () => {
//     const totalSymbols = 9;
//     const maxPosition = iconHeight * (totalSymbols - 1) * -1;
//     let currentPosition = start.current;

//     for (let i = 0; i < (timer / 100) * multiplier; i++) {
//       currentPosition -= iconHeight;
//       if (currentPosition < maxPosition) {
//         currentPosition = 0;
//       }
//     }

//     onFinish(currentPosition);
//   };

//   const reset = () => {
//     clearInterval(ref.current);
//     start.current = setStartPosition();
//     setPosition(start.current);
//     setTimeRemaining(timer);
//   };

//   useEffect(() => {
//     ref.current = setInterval(() => {
//       if (timeRemaining <= 0) {
//         clearInterval(ref.current);
//         getSymbolFromPosition();
//       } else {
//         moveBackground();
//       }
//     }, 100);

//     return () => clearInterval(ref.current);
//   }, [timeRemaining]);

//   return (
//     <div 
//       style={{ backgroundPosition: `0px ${position}px` }}
//       className="icons"
//     />
//   );
// });

// export default Order;
