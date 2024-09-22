import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic
    console.log('Logged in with:', email, password);
    navigate('/Homepage'); 
  };

  const handleRegister = () => {
    navigate('/SignUpPage');
  };

  const handleForgotPassword = () => {
    navigate('/ForgotPasswordPage'); // Replace with your forgot password route
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-submit">Login</button>
      </form>
      <button className="btn btn-secondary w-100" onClick={handleRegister}>
        Register
      </button>
      <button className="btn btn-link w-100 mt-2" onClick={handleForgotPassword}>
        Forgot Password?
      </button>
    </div>
  );
};

export default LoginPage;


// // src/components/LoginPage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import './LoginPage.css'; // Import custom CSS
// import './Loginpage.css'

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Perform login logic
//     console.log('Logged in with:', email, password);
//     // navigate.push('/SignUpPage');
//     navigate('/Homepage'); 
//   };

//   const handleRegister =() =>{
//     console.log("fdjshjdfs")
//     navigate('/SignUpPage');

//   }
//   return (
//     <div className="login-container">
//       <h1>Login Page</h1>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary btn-submit">Login</button>
     
//       </form>
//       <button variant="primary" className="w-100" onSubmit={handleRegister}>
//               Register
//             </button>
//     </div>
//   );
// };

// export default LoginPage;
