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

export default AppContent;
