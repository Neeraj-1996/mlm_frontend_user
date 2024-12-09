

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AppContent from './src_app/Component/Navigation/Routes';
import Adminroutes from './src_admin/Routesadmin';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@fontsource/poppins'; // Defaults to 400 weight
import '@fontsource/poppins/400.css'; // Regular
import '@fontsource/poppins/700.css'; // Bold


const App = () => {
  const location = useLocation();

  return (
    <div>
      <Routes>
        {/* If the path starts with "/admin", render Admin Web routes */}
        {location.pathname.startsWith('/admindnd') ? (
          <Route path="/*" element={<Adminroutes />} />
        ) : (
          <Route path="/*" element={<AppContent />} />
        )}
      </Routes>
    </div>
  );
};

const RootApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default RootApp;
