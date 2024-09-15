import React, { useEffect,useState } from 'react';

import {Route, Routes, Link, useLocation,useNavigate,Navigate} from 'react-router-dom';
import HomePage from '../Home/Home.js';
import LoginPage from '../Login/Login.js';
import SignUpPage from '../Signup/Signup.js';
import Finance from '../Finance/Finance.js';
import CompanyDetail from '../Companydetail/Detail.js';
import VIPEvents from '../Event/Event.js';
// import CompanyProfile from '../Promotionreward/Promotionreaword.js';
import InviteScreen from '../Invite/Invite.js';
import TeamReportScreen from '../Temreport/Teamreport.js';
import Promotion from '../Promotionreward/Promotionreaword.js';
import TutorialScreen from '../Begnertotrial/Tutorial.js';
import Deposit from '../Deposit/Deposit.js';
import Paymoney from '../Paymoney/Paymoney.js';
import Supports from '../Support/Support.js';
import Profile from '../Profile/Profile.js';
import ProfileComponent from '../Showprofile/ProfileComponent.js';
import 'bootstrap/dist/css/bootstrap.min.css';



// import 'react-toastify/dist/ReactToastify.css';

function AppContent() {


    return (
       <div>

  
        <Routes>
          {/* <Route exact path="/" element={<Login />} />   */}
          <Route exact path="/" element={<LoginPage />}/>
          <Route  path="/SignUpPage" element={<SignUpPage />}/>
          {/* <Route exact path="/LoginPage" element={<LoginPage />}/> */}
          <Route  path="/Homepage" element={<HomePage />}/>
          <Route  path="/Finance" element={<Finance />}/>
          <Route  path="/Promotion" element={<Promotion />}/>
          <Route  path="/CompanyDetail" element={<CompanyDetail />}/>
          <Route  path="/VIPEvents" element={<VIPEvents />}/>
          <Route  path="/InviteScreen" element={<InviteScreen />}/>
          <Route  path="/TeamReportScreen" element={<TeamReportScreen />}/>
          <Route  path="/TutorialScreen" element={<TutorialScreen />}/>
          <Route  path="/Deposit" element={<Deposit />}/>
          <Route  path="/Paymoney" element={<Paymoney />}/>
          <Route  path="/Supports" element={<Supports />}/>
          <Route  path="/Profile" element={<Profile />}/>
          <Route  path="/ProfileComponent" element={<ProfileComponent />}/>

          
       
          </Routes>
      </div>
  
    );
  }


//   exports default AppContent
export default AppContent;

// import HomePage from '../Pages/Home/Home.js';
// import UserProfile from '../Pages/Profile/Userprofile';
// import Wallet from '../Pages/Wallet/Wallet';
// import SignUp from '../Pages/Signup/Signup';
// import Login from '../Pages/Login/Login';
// import ForgetPassword from '../Pages/Forgetpass/Forget';
// import Productreport from '../Pages/Reports/Productreport';
// import Product from '../Pages/Product/Product';
// import Supports from '../Pages/Support/Support';
// import Testimonial from '../Pages/Testimonial/Testimonial';
// import Event from '../Pages/Events/Events';
// import Transaction from '../Pages/Transaction/Transaction';
// import Levels from '../Pages/Levels/Levels.js';
// import TeamReport from '../Pages/Teamreport/Teamreport.js';
// import DirectMember from '../Pages/Directmember/Direct.js';
// import Royality from '../Pages/Directroyality/Royality.js';
// import WithdrawalDetail from '../Pages/Withdrawal/Withdrawaldetail.js';
// import Invitation from '../Pages/Invitation/Invitation.js';
// import Company from '../Pages/Company/Company.js';
// import Reaward from '../Pages/Rewards/Rewards.js';
// import Deposit from '../Pages/Deposit/Deposit.js';
// import Paymoney from '../Pages/Paymoney/Paymoney.js';
// import QRScanner from '../Pages/Withdrawal/Qrcode.js';
// import Withdrwal from '../Pages/Withdrawal/Withdrwal.js';
// import Sellproduct from '../Pages/Product/Sellproduct.js';
// import Takepicture from '../Pages/Profile/Takepicture.js';


// import Drawer from 'react-modern-drawer'
// import 'react-modern-drawer/dist/index.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars ,faWallet,faUser} from '@fortawesome/free-solid-svg-icons';
// import '../asset/plugins/bootstrap/css/bootstrap.min.css'
// import { Colors } from '../asset/Color.js';
// import { ToastContainer } from 'react-toastify';
// import PWAPrompt from 'react-ios-pwa-prompt'


    {/* <Route exact path="/" element={token ? <Navigate to="/Home" /> : <Login />}/> */}
         {/* <Route path="/Home" element={<HomePage />} /> */}
          {/* <Route path="/SignUp" element={<SignUp />} /> */}
          {/* <Route path="/FogetPassword" element={<ForgetPassword />} />
    
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Wallet" element={<Wallet />} />
          <Route path="/Product" element={<Product  resultDataBalanceD={resultDataBalanceD}  />} />
          <Route path="/Productreport" element={<Productreport />} />
          <Route path="/Transaction" element={<Transaction />} />
          <Route path="/Supports" element={<Supports />} />
          <Route path="/Events" element={<Event />} />
          <Route path="/Testimonial" element={<Testimonial />} />
          <Route path="/DirectMember" element={<DirectMember />} />
          <Route path="/TeamReport" element={<TeamReport />} />
          <Route path="/Direactcommission" element={<Royality />} />
          <Route path="/WithdrawalDetail" element={<WithdrawalDetail />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/Reaward" element={<Reaward />} />
          <Route path="/Levels" element={<Levels />} />
          <Route path="/Invitation" element={<Invitation />} />
          <Route path="/Deposit" element={<Deposit />} />
          <Route path="/Paymoney" element={<Paymoney />} />
          <Route path="/QRScanner" element={<QRScanner />} />
          <Route path="/Takepicture" element={<Takepicture />} />
          <Route path="/Withdrwal" element={<Withdrwal />} />
          <Route path="/Sellproduct" element={<Sellproduct />} />
     */}

//     const location = useLocation();
//     const navigate = useNavigate();
//     const [latestBalance, setLatestBalance] = React.useState(null);
//     const [currentPage, setCurrentPage] = React.useState('');
  
//     const [token, setToken] = useState(localStorage.getItem('tokenId'));
  
  
//     React.useEffect(() => {
//     const pathname = location.pathname;
//       const pageName = pathname.substring(1); 
//       setCurrentPage(pageName || 'Home'); 
//     }, [location]);
  
  
  
//     const [isOpen, setIsOpen] = React.useState(false);
//     const toggleDrawer = () => {
//       setIsOpen((prevState) => !prevState);
//     };
    
  
//     const handleDrawerItemClick = () => {
//       // Close the drawer
//       setIsOpen(false);
//     };
//     const shouldShowDrawer = ![ '/','/ios','/ios/','/SignUp',"/FogetPassword"].includes(location.pathname);
  
  
//   //   useEffect(() => {
//   //     if (!token) {
//   //         navigate("/");
//   //     }
//   // }, [token]);
  
//     const handleLogout = () => {
//       try {
//         localStorage.removeItem("tokenId");
//         setToken(null);
//         navigate("/");
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     useEffect(() => {
//         resultDataBalanceD();
//         retrieveUserData();
//       }, [latestBalance]);
  
//     const resultDataBalanceD = async () => {
//       if (!token) {
//         console.log("Token is not available.");
//         return;
//       }
  
//       try {
//         const result = await axios.get(baseUrl + "wallet", {
//           headers: { Authorization: Bearer ${token} },
//         });
  
//         if (
//           result.data.status === 200 &&
//           result.data.message !== "No beds found"
//         ) {
//           const data = result.data.data;
  
//           if (data.length > 0) {
//             const lastTransaction = data[data.length - 1];
//             const latestBalanceData = lastTransaction.balance;
//             setLatestBalance(latestBalanceData);
//           } else {
//             console.log("No transaction data available");
//             setLatestBalance(undefined);
//           }
//         } else {
//           if (result.data.status === 401) {
//             console.log("Unauthorized access - perhaps the token has expired.");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching wallet data:", error);
//       }
//     };
  
  

  
//       const [showProfile, setShowProfile] = React.useState([]);
//     //   const retrieveUserData = async () => {
  
//     //     const token = localStorage.getItem("tokenId");
//     //     const result = await axios.get(baseUrl + "get-user-data", {
//     //       headers: { Authorization: Bearer ${token} },
//     //     });
//     //     // console.log(result.data.data);
//     //     if (result.status === 200 && result.data.message !== "No product found") {
//     //       setShowProfile(result.data.data);
  
//     //     } else {
//     //       console.log("error not get ezbuy data ");
//     //     }
//     //   };
//     const retrieveUserData = async () => {
//         // const token = localStorage.getItem("tokenId");
      
//         // Check if the token is available
//         if (!token) {
//           console.log("No token available, not hitting the API.");
//           return; // Exit the function early
//         }
      
//         try {
//           const result = await axios.get(baseUrl + "get-user-data", {
//             headers: { Authorization: Bearer ${token} },
//           });
      
//           if (result.status === 200 && result.data.message !== "No product found") {
//             setShowProfile(result.data.data);
//           } else {
//             console.log("Error: Did not get ezbuy data");
//           }
//         } catch (error) {
//           console.error("API call failed", error);
//         }
//       };
        {/* <PWAPrompt promptOnVisit={1} timesToShow={3} copyClosePrompt="Close" permanentlyHideOnDismiss={false}/> */}
        {/* <ToastContainer /> */}
        {/* {shouldShowDrawer && (
          <>
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0,zIndex: 999, backgroundColor: '#ffffff', borderBottom: '1px solid #ddd' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
          
            <FontAwesomeIcon
              icon={faBars}
              size="2x"
              color="grey"
              onClick={toggleDrawer}
            />
  
          {currentPage === 'Product' && latestBalance !== null ? (
            <h4 style={{  color: "#000" }}>
              Balance {parseFloat(latestBalance).toFixed(2)}
            </h4>
          ) : (
            <h4>{currentPage}</h4>
          )}
          </div>
          </div>
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction='left'
              containerStyle={{ zIndex: 999 }} 
              className='header-drawer'
             style={{backgroundColor:Colors.backgroundBlue}}>
  
              <div className="container" style={{ overflowY: 'auto', height: '80%', paddingBottom: '200px', WebkitOverflowScrolling: 'touch' }} >
                <div className="row mt-1" >
                  <div className="col-12" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div className="bg-white " style={{ width: 100, height: 100, marginTop: 80,  border: "1px solid black", borderRadius: '50%', padding: "0px",}}>
  
  
                    {showProfile.image ? (
                  <div style={{ width: "100%",height:100,display:'flex',justifyContent:'center',alignItems:'center' ,}}>
                  <img src={showProfile.image} style={{ width: "100%", height: "100%" ,borderRadius: "50%",}} alt="Profile" />
                  </div>
                ) : (
                  <div style={{ width: "100%",height:100,display:'flex',justifyContent:'center',alignItems:'center' ,}}>
                <FontAwesomeIcon
                    icon={faUser}
                    size="1x"
                    color="grey"
                    style={{ fontSize: 70, color: "grey",backgroundColor: "rgba(255, 255, 255, 0.5)"}}
  
                  />
                  </div>
                )}
                    </div>
                  </div>
                </div>
  
                <div className="row mt-1 " >
                  <div className="col-12 text-center">
                    <Link to="/UserProfile" className="btn btn-link" style={{ textDecoration: 'none', color: '#EC8E22',fontSize:18,fontWeight:'bold' }} onClick={handleDrawerItemClick}>
                        User Profile
                      </Link>
                  </div>
                </div>
                <div style={{ height: 1, backgroundColor: "#EC8E22", width: "90%", alignSelf: "center", marginTop: 5, }} />
                <div className="row mt-1">
                  <div className="col-12">
                    <Link to="/Home" className="btn btn-link" style={{ textDecoration: 'none', color: '#fff' }} onClick={handleDrawerItemClick} >
                    <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
                      Home
                    </Link>
                  </div>
                </div>
                <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1  }} />
  
  
                <div className="row mt-1">
                  <div className="col-12">
                    <Link to="/Wallet" className="btn btn-link" style={{ textDecoration: 'none', color: '#fff' }} onClick={handleDrawerItemClick} >
                    <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
                      Wallet
                    </Link>
                  </div>
                </div>
                <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1  }} />
  
                <div className="row mt-1">
                  <div className="col-12">
                    <Link to="/Productreport" className="btn btn-link" style={{ textDecoration: 'none',color: '#fff'}} onClick={handleDrawerItemClick}>
                    <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
                      Report  
                    </Link>
                  </div>
                </div>
                <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
             
                <div className="row mt-1">
                  <div className="col-12">
                    <Link to="/Transaction" className="btn btn-link" style={{ textDecoration: 'none', color: '#fff' }} onClick={handleDrawerItemClick}>
                    <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
                    Transaction  
                    </Link>
                  </div>
                </div>
  
                <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
             
             <div className="row mt-1">
               <div className="col-12">
                 <Link to="/Supports" className="btn btn-link" style={{ textDecoration: 'none', color: '#fff' }} onClick={handleDrawerItemClick}>
                 <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
                 Support 
                 </Link>
               </div>
             </div>
             <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
             <div className="row mt-1">
               <div className="col-12">
                 <Link to="/Events" className="btn btn-link" style={{ textDecoration: 'none', color: '#fff'}} onClick={handleDrawerItemClick}>
                 <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
                 Event 
                 </Link>
               </div>
             </div>
             <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
             
             <div className="row mt-1">
               <div className="col-12">
                 <Link to="/Testimonial" className="btn btn-link" style={{ textDecoration: 'none', color: '#fff' }} onClick={handleDrawerItemClick}>
                 <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
               Testimonial  
                 </Link>
               </div>
             </div>
             <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
             
             <div className="row mt-1">
               <div className="col-12">
                 <Link to="/DirectMember" className="btn btn-link" style={{ textDecoration: 'none', color: '#fff'}} onClick={handleDrawerItemClick}>
                 <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
               Direct Member 
                 </Link>
               </div>
             </div>
             <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
             
             <div className="row mt-1">
               <div className="col-12">
                 <Link to="/Levels" className="btn btn-link" style={{ textDecoration: 'none',color: '#fff' }} onClick={handleDrawerItemClick}>
                 <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
               Levels 
                 </Link>
               </div>
             </div>
  
                <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
                <div className="row mt-1">
               <div className="col-12">
                 <Link to="/TeamReport" className="btn btn-link" style={{ textDecoration: 'none', color: '#fff' }} onClick={handleDrawerItemClick}>
                 <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
                 TeamReport 
                 </Link>
               </div>
             </div>
             <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
                <div className="row mt-1">
               <div className="col-12">
                 <Link to="/Direactcommission" className="btn btn-link" style={{ textDecoration: 'none',color: '#fff'}} onClick={handleDrawerItemClick}>
                 <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
                 Direact Royality
                 </Link>
               </div>
             </div>
             <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
                <div className="row mt-1">
               <div className="col-12">
                 <Link to="/WithdrawalDetail" className="btn btn-link" style={{ textDecoration: 'none', color: '#fff' }} onClick={handleDrawerItemClick}>
                 <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
                 Withdrawal Detail
                 </Link>
               </div>
             </div>
             <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
                <div className="row mt-1">
               <div className="col-12">
                 <Link to="https://t.me/+f1tsXYA2mB04M2Q1" className="btn btn-link" style={{ textDecoration: 'none', color: '#fff' }} onClick={handleDrawerItemClick}>
                 <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
                 Telegram
                 </Link>
               </div>
             </div>
             <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
                <div className="row mt-1">
               <div className="col-12">
               <button onClick={handleLogout} className="btn btn-link" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faWallet} style={{ marginRight: '5px' }} />
            Log Out
          </button>
               </div>
             </div>
             <div style={{ height: 1, backgroundColor: Colors.background, width: "90%", alignSelf: "center", marginTop: 1 }} />
  
              </div>
            </Drawer>
  
          </>)}
   */}
  