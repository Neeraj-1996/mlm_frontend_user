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
import Withdrwal from '../Withdrawal/Withdrwal.js';
import Order from '../Order/Order.js';
// import QRCode from 'react-qr-code';
import QRScanner from '../Withdrawal/Qrcode.js';
import ForgetPassword from '../Forgetpass/Forget.js';
import PrivateRoute from './PrivateRoute.js';
import DepositTransactionScreen from '../Tranasaction/DepositTransaction.js';
import ProfileComponent from '../Showprofile/ProfileComponent.js';
import PaymentRequests from '../Deposit/Showalladdress.js';
import OrderDetail from '../Order/OderDetail.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'react-toastify/dist/ReactToastify.css';
function AppContent() {
  
    return (
       <div>
            <ToastContainer />
        <Routes>
          {/* <Route exact path="/" element={<LoginPage />}/> */}
          <Route exact path="/" element={<PrivateRoute>
                                          <LoginPage />
                                        </PrivateRoute>}/>
          <Route  path="/SignUpPage" element={<SignUpPage />}/>
          <Route  path="/Homepage" element={<HomePage />}/>
          <Route  path="/Finance" element={<Finance />}/>
          <Route  path="/Promotion" element={<Promotion />}/>
          <Route  path="/CompanyDetail" element={<CompanyDetail />}/>
          <Route  path="/VIPEvents" element={<VIPEvents />}/>
          <Route  path="/InviteScreen" element={<InviteScreen />}/>
          <Route  path="/TeamReportScreen" element={<TeamReportScreen />}/>
          <Route  path="/TutorialScreen" element={<TutorialScreen />}/>
          <Route  path="/Deposit" element={<Deposit />}/>
          <Route  path="/Transaction" element={<DepositTransactionScreen />}/>
          <Route  path="/PaymentRequests" element={<PaymentRequests />}/>
          <Route  path="/Paymoney" element={<Paymoney />}/>
          <Route  path="/Supports" element={<Supports />}/>
          <Route  path="/Profile" element={<Profile />}/>
          <Route  path="/Withdrwal" element={<Withdrwal />}/>
          <Route  path="/QRCode" element={<QRScanner />}/>
          <Route  path="/Order" element={<Order />}/>
          <Route  path="/FogetPassword" element={<ForgetPassword />}/>
          <Route  path="/ProfileComponent" element={<ProfileComponent />}/>
          <Route  path="/OrderDetail" element={<OrderDetail />}/>
        </Routes>
      </div>
      );
  }

export default AppContent;
