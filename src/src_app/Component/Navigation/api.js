// api.js
import axios from 'axios';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Request error interceptor:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration and other errors
// api.js

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If 401 Unauthorized, remove token and redirect to login
      localStorage.removeItem('accessToken');
      // window.location.href = '/'; 
    } else if (error.response && error.response.status === 500) {
      localStorage.removeItem('accessToken');
      // window.location.href = '/';
    } else {
      console.error("Error:", error.message);
      alert("Unable to connect to the server. Please check your network.");
    }
    return Promise.reject(error);
  }
);



// api.interceptors.response.use(
//   (response) => {
//     // console.log("Response interceptor:", response); 
//     return response;
//   },
//   (error) => {
//     console.log("Error interceptor:", error); 
//     if (error.response) {
//       if (error.response.status === 401) {
//         // Handle token expiration
//         localStorage.removeItem('accessToken');
//         window.location.href = '/'; 
//       } else if (error.response.status === 500) {
//         // Handle server errors
//         localStorage.removeItem('accessToken');
//         window.location.href = '/';
//         console.error("Server error:", error.response.data); 
//         // alert("An unexpected error occurred on the server. Please try again later.");
//       }
//     } else {
//       console.error("No response from server:", error.message);
//       alert("Unable to connect to the server. Please check your network.");
//     }
//     return Promise.reject(error);
//   }
// );

export default api;


// api.js
// import axios from 'axios';

// const api = axios.create({
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor to include the access token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Token is expired or unauthorized
//       localStorage.removeItem('accessToken'); // Remove expired token
//       localStorage.clear();
//       window.location.href = '/'; // Redirect to login page
//     }
//     return Promise.reject(error);
//   }
// );


// export default api;

