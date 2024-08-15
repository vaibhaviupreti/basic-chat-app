import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Grid, Paper, Typography, MenuItem } from '@mui/material';
import { API_BASE_URL } from '../utils/constants';

function Register() {
  const location = useLocation();
  const [isEditMode, setEditMode]=useState(false)
  const [formData, setFormData] = useState({
    // id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    password: ''
  });

  useEffect(() => {
    if (location.state && location.state.user) {
      setFormData(location.state.user); //using rest operator here to create new const
      console.log("locatn,",location?.state);
      setEditMode(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (formData.id) {
        // Update existing user
        const response = await axios.put(`${API_BASE_URL}/update_user/${formData.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        alert('Updated successfully!');
      } else {
        // Create new user
        // const response = await axios.post(`${API_BASE_URL}/create_users`, formData, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     // 'Content-Type': 'application/json',
        //   }
        // });
        const response = await axios.post(`${API_BASE_URL}/create_users`, formData, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        console.log(response.data);
        alert('Registered successfully!');
      }
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: ''
      });
    } catch (error) {
      console.error("error in creating new user: ",error);
    }
  };

  // const isEditMode = formData.id !== '';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Paper elevation={3} style={{ padding: '20px', width: '100%', margin: '0 20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isEditMode ? 'Edit User' : 'Register'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            {!isEditMode && (
              <>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
              </>
            )}
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Role"
                variant="outlined"
                fullWidth
                name="role"
                select
                value={formData.role}
                onChange={handleChange}
                required
              >
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="Institute">Institute</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                {isEditMode ? 'Update' : 'Register'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default Register;