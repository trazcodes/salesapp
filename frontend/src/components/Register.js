import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // CHECKING FOR BLANK INPUTS
    e.preventDefault();
    if (!firstname || !lastname || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    // CONCATENATING FIRST AND LAST NAME
    const name = `${firstname} ${lastname}`;
    try {
      const resp = await axios.post(`${process.env.REACT_APP_API}/signup`, { name, email, password });
      // IF SUCCESS, REDIRECT TO LOGIN, ELSE SHOW ERROR
     
      if (resp.status === 200) {
        toast.success('Registered Successfully.', {
          autoClose: 2000,
          onClose: () => window.location.replace('/login')
        });
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      // IF INVALID CREDENTIALS
      if (error.response && error.response.status === 401) {
        toast.error('Email Already Registered');
      }  else if (!error.response || error.response.status !== 401) {
        // Handle other errors gracefully without logging to the console
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='container mt-2'>
      <div className='card'>
        <div className='card-body'>
          <h5 className="card-title  text-center">REGISTER</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
            </div>
            <div className='d-grid'>
              <button type="submit" className="btn btn-warning">Submit</button>
            </div>
            <ToastContainer/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
