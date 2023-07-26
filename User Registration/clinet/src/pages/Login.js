import React, { useState } from 'react';
import App from "../App.css"
import Register from './Register';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:1000/api/lo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if(data.user){
     localStorage.setItem('token',data.user)
      alert("login successfully")
      window.location.href='/profileinfo'
    }else{
      alert("Please check your username or password")

      }
    }
    const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  return (
    <>
      {/* <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        <input type="submit" value="Login" />
      </form> */}




    <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`}>
      <Register/>
      <div className="form-container sign-in-container">
      <form onSubmit={loginUser}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input type="email" 
          placeholder="Email" 
           value={email}
          onChange={(e) => setEmail(e.target.value)} />

          <input type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forgot your password?</a>
          <button type="submit" value="Login" >Sign in</button>

        
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start the journey with us</p>
            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>

    </>
  );
  }

export default Login;
