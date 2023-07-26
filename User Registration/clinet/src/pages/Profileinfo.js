import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";


const Profileinfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);
      setUser(decodedToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }


  return (
    <div>
    <h1>Welcome, {user.name}!</h1>
    <p>Email: {user.email}</p>
    <button onClick={handleLogout}>Logout</button>
  </div>
  )
}

export default Profileinfo
