import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;