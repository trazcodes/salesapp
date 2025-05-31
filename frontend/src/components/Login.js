import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // CHECKING FOR BLANK CREDENTIALS
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      // IF SUCCESS, STORE TOKEN IN LOCAL STORAGE
      if (response.status === 200) {
        const { token } = response.data.result;
        console.log(token);
        localStorage.setItem('token', token);
        toast.success('Logged in Successfully.', {
          autoClose: 1000,
          onClose: () => window.location.replace('/user/addsale')
        });
      } else {
        toast.error('Failed to login. Please try again later.');
      }
    } catch (error) {
      // IF INVALID CREDENTIALS
      if (error.response && error.response.status === 401) {
        toast.error('Invalid credentials. Please check your email and password.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }


  return (
    <div className='container mt-2'>
      <div className='card'>
        <div className='card-body'>
          <h5 className="card-title  text-center">LOGIN</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
            </div>
            <div className='d-grid'>
              <button type="submit" className=" btn btn-warning">Submit</button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default Login