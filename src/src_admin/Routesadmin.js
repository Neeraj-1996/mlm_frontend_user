import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Dashboard from './screen/Dashboard';
import Settings from './screen/Setting';
import Home from './screen/Home';
// import Home from './screen/Home'; 
import LoginPage from './screen/Login'; 
import UserRecords from './screen/User';
import ProductTable from './screen/Product';
import CountryTable from './screen/County';
import EventTable from './screen/Event';
import PlanTable from './screen/Plan';
import LevelTable from './screen/Level';
import SupportTable from './screen/Support';
import FormRegister from './sidebar/FormRegister';
import Reactdnd from './sidebar/Reactdnd';
import Reactpropper from './sidebar/Reactpopper';
import SliderImageTable from './screen/Slider';
import WithdrawalRequestsTable from './screen/Withdraldetail';
import { ProSidebarProvider } from 'react-pro-sidebar';

function Adminroutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div style={{ display: 'flex' }}>
      {isAuthenticated ? (
        <ProSidebarProvider>
          <Navigation />
          <Routes>
            <Route path="/admindnd/home" element={<Home />} />
            <Route path="/admindnd/dashboard" element={<Dashboard />} />
            <Route path="/admindnd/settings" element={<Settings />} />
            <Route path="/admindnd/user-records" element={<UserRecords />} />
            <Route path="/admindnd/product-table" element={<ProductTable />} />
            <Route path="/admindnd/country-table" element={<CountryTable />} />
            <Route path="/admindnd/event-table" element={<EventTable />} />
            <Route path="/admindnd/plan-table" element={<PlanTable />} />
            <Route path="/admindnd/level-table" element={<LevelTable />} />
            <Route path="/admindnd/support" element={<SupportTable />} />
            <Route path="/admindnd/form-register" element={<FormRegister />} />
            <Route path="/admindnd/slider" element={<SliderImageTable />} />
            <Route path="/admindnd/withdrawal-request" element={<WithdrawalRequestsTable />} />
            <Route path="/admindnd/react-dnd" element={<Reactdnd />} />
            <Route path="/admindnd/react-propper" element={<Reactpropper />} />
          </Routes>
        </ProSidebarProvider>
      ) : (
        <Routes>
          <Route path="/admindnd" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/admindnd" />} />
        </Routes>
      )}
    </div>
  );
}

export default Adminroutes;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navigation from './Navigation';
// import Dashboard from './screen/Dashboard';
// import Settings from './screen/Setting';
// import Home from './screen/Home'; // Rename to Home
// import LoginPage from './screen/Login'; // This will be shown at root "/"
// import UserRecords from './screen/User';
// import ProductTable from './screen/Product';
// import CountryTable from './screen/County';
// import EventTable from './screen/Event';

// import PlanTable from './screen/Plan';
// import LevelTable from './screen/Level';
// import SupportTable from './screen/Support';
// import FormRegister from './sidebar/FormRegister';
// import Reactdnd from './sidebar/Reactdnd';
// import Reactpropper from './sidebar/Reactpopper';
// import { ProSidebarProvider } from 'react-pro-sidebar';

// function Adminroutes() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <Router>
//       <div style={{ display: 'flex' }}>
//         {isAuthenticated ? (
//           <ProSidebarProvider>
//             <Navigation />
//             <Routes>
//               <Route path="/admin/home" element={<Home />} /> {/* Updated path for Home */}
//               <Route path="/admin/dashboard" element={<Dashboard />} />
//               <Route path="/admin/settings" element={<Settings />} />
//               <Route path="/admin/UserRecords" element={<UserRecords />} />
//               <Route path="/admin/ProductTable" element={<ProductTable />} />
//               <Route path="/admin/CountryTable" element={<CountryTable />} />
//               <Route path="/admin/EventTable" element={<EventTable />} />
//               <Route path="/admin/PlanTable" element={<PlanTable />} />
//               <Route path="/admin/LevelTable" element={<LevelTable />} />
//               <Route path="/admin/Support" element={<SupportTable />} />
//               <Route path="/admin/FormRegister" element={<FormRegister />} />
//               <Route path="/admin/ReactDnd" element={<Reactdnd />} />
//               <Route path="/admin/Reactproper" element={<Reactpropper />} />
//               {/* <Route path="/" element={<Navigate to="/home" />} />  */}
//             </Routes>
//           </ProSidebarProvider>
//         ) : (
//           <Routes>
//             <Route path="/admin" element={<LoginPage onLogin={handleLogin} />} /> {/* Login page at root */}
//             <Route path="*" element={<Navigate to="/admin" />} /> {/* Redirect to login page for undefined routes */}
//           </Routes>
//         )}
//       </div>
//     </Router>
//   );
// }
// export default Adminroutes;
