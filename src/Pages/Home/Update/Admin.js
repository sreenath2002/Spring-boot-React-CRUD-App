import React, { useEffect } from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import AdminTable from '../../../Components/AdminTable/AdminTable';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const jwtToken = localStorage.getItem('jwt');
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      // If there is no JWT token, redirect to the main page or handle it as per your requirement
      navigate('/');
    }
  }, [jwtToken, navigate]);

  // Render AdminTable only when there is a JWT token
  return jwtToken ? (
    <div>
      {/* <Navbar/> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <AdminTable />
    </div>
  ) : null;
};

export default Admin;

