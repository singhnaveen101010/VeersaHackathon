import React, { useState } from 'react';
import axios from 'axios';
import '../styles/forgetpassword.css';
import back from '../assets/images/background.jpg';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/forgetpassword', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="forget">
      <div className="image-container">
        <img src={back} alt="Forget Password Background" />
      </div>
      <div className="forget-container">
        <h2>Forget Password</h2>
        <form onSubmit={handleForgetPassword}>
          <input
            type="email"
            placeholder="Enter Your Email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Instructions</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
