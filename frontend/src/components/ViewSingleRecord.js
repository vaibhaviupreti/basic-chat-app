import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Paper, Typography, Grid } from '@mui/material';

function SingleUserDetails() {
  const location = useLocation();
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    createdAt: '',
  });

  useEffect(() => {
    if (location.state && location.state.user) {
      setUserData(location.state.user);
    }
  }, [location.state]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '600px', margin: '0 20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          <strong>Single User Details</strong>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>ID:</strong> {userData.id}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Name:</strong> {userData.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Phone:</strong> {userData.phone}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Role:</strong> {userData.role}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleString()}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default SingleUserDetails;
