import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { API_BASE_URL } from '../utils/constants';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("response.data login page",response.data);
      alert("Logged in successfully!");
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      setFormData({ email: '', password: '' });
      navigate('/dashboard'); 
    } catch (error) {
      alert("Login Failed! Please enter correct credentials");
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div style={{ 
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(to right, #4facfe, #00f2fe)', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Grid container 
        spacing={2} 
        style={{
          width: '400px',
          backgroundColor: 'white', 
          padding: '40px', 
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          textAlign: 'center' 
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleSubmit}
            style={{
              backgroundColor: '#4facfe', 
              color: 'white', 
              fontWeight: 'bold',
              padding: '10px 0' 
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
