import React, { useEffect } from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import Curosel from '../../../Components/Curosel/Curosel';
import MiddleBody from '../../../Components/MiddleBody/MiddleBody';
import LastBody from '../../../Components/LastBody/LastBody';
import Cards from '../../../Components/Card/Cards';
import Bottom from '../../../Components/Bottom/Bottom';
import { useNavigate } from 'react-router-dom';

function Home() {
  const jwtToken = localStorage.getItem('jwt');
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      // If there is no JWT token, redirect to the main page or handle it as per your requirement
      navigate('/');
    }
  }, [jwtToken, navigate]);

  // Render the Home component only when there is a JWT token
  return jwtToken ? (
    <div className="home">
      <Navbar />
      <Curosel />
      <MiddleBody />
      <LastBody />
      <Cards />
      <Bottom />
      {/* <Products/> */}
      {/* <Bottom/> */}
    </div>
  ) : null;
}

export default Home;

