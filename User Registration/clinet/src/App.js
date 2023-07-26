import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile ';
import Profileinfo from './pages/Profileinfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profileinfo" element={<Profileinfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
