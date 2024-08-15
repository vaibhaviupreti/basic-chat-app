import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/constants';

const SimpleTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/get_users`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const loggedInUserEmail = localStorage.getItem('email'); 

        const usersWithStatus = response.data.map(user => ({
          ...user,
          status: user.email === loggedInUserEmail ? 'Active' : 'Offline'
        }));

        setUsers(usersWithStatus);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/delete_user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    navigate(`/dashboard/register`, { state: { user } });
  };

  const handleView = (user) => {
    navigate(`/dashboard/view-single-record`, { state: { user } });
  };

  return (
    <div style={{ margin: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Phone</th>
            <th style={tableHeaderStyle}>Role</th>
            <th style={tableHeaderStyle}>Created At</th>
            <th style={tableHeaderStyle}>Status</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{user.name}</td>
              <td style={tableCellStyle}>{user.email}</td>
              <td style={tableCellStyle}>{user.phone}</td>
              <td style={tableCellStyle}>{user.role}</td>
              <td style={tableCellStyle}>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td  style={{
                    ...tableCellStyle, 
                    color: user.status === 'Active' ? '#30C730' : '#00000089',
                    fontWeight: 'bold'
                  }}
              >{user.status}</td>
              <td style={tableCellStyle}>
                <Visibility style={iconStyle} titleAccess="View" onClick={() => handleView(user)} />
                <Edit style={iconStyle} titleAccess="Edit" onClick={() => handleEdit(user)} />
                <Delete style={iconStyle} titleAccess="Delete" onClick={() => handleDelete(user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Basic styling for table
const tableHeaderStyle = {
  padding: '10px',
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const tableRowStyle = {
  backgroundColor: '#f9f9f9',
};

const iconStyle = {
  cursor: 'pointer',
  marginRight: '10px',
};

export default SimpleTable;
