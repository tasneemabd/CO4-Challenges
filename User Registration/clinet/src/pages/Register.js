import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Login from './Login';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate()
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:1000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if(data.status==='ok'){
     
      alert("Register successfully")
      setIsSignUpActive(true);
      
    }else{
      alert("Please check your Register")

    }
  }

  return (
    <>
      {/* <h1>Registration</h1>
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Register" />
      </form> */}
      {isSignUpActive ? (
            <Login/>
      ) : (
        <div className="form-container sign-up-container">
      <form onSubmit={registerUser}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name"
           value={name}
           onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email"
           value={email}
           onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

<button type="submit" value="Login" >Sign in</button>

        </form>
      </div>
         )}
    </>
    );
  }

export default Register;
