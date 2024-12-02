// PrivateRoute.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const storedToken = localStorage.getItem('accessToken');
  console.log("storedTokensfdf",storedToken);
  useEffect(() => {
    const checkTokenValidity = () => {
      const currentToken = localStorage.getItem('accessToken');
      console.log("currentToken",currentToken);
      if (!currentToken || currentToken !== storedToken) {
        // If token is missing or changed, log out the user
        window.location.href = '/';
      }
    };

    checkTokenValidity();
    
    const tokenCheckInterval = setInterval(checkTokenValidity, 30000);
    return () => clearInterval(tokenCheckInterval);
  }, [storedToken]);

  return storedToken ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
 
// // src/PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//     const accessToken = localStorage.getItem('accessToken');
    
//     if (accessToken) {
//         return <Navigate to="/Homepage" replace />; // Redirect to Homepage if already logged in
//     }

//     return children; // Render the LoginPage if not logged in
// };

// export default PrivateRoute;
