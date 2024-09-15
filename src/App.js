import React from 'react';
import {BrowserRouter as Router  } from 'react-router-dom';
import AppContent from './Component/Main/Routes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
    );
};
export default App;

