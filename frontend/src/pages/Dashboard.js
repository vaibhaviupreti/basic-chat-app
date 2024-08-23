import React from 'react';
import { Drawer, List, ListItem, ListItemText, CssBaseline, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Register from '../components/Register';
import UserList from '../components/UsersList';
import ViewSingleRecord from '../components/ViewSingleRecord';

const drawerWidth = 240;

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/'); 
  };

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ width: `calc(100% - ${drawerWidth}px)`, marginLeft: drawerWidth }}>
        <Toolbar style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <Button variant='contained' color='error' onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        style={{ width: drawerWidth }}
        anchor="left"
        sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => navigate('/dashboard/register')}>
            <ListItemText primary="Register" />
          </ListItem>
          <ListItem button onClick={() => navigate('/dashboard/display-records')}>
            <ListItemText primary="Display Records" />
          </ListItem>
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '24px' }}>
        <Toolbar />
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="edit" element={<Register />} />
          <Route path="display-records" element={<UserList />} />
          <Route path="view-single-record" element={<ViewSingleRecord />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
