import React, { useState, useEffect } from 'react';
import './Mainpage.css'; // Import the CSS file
import SignIn from '../Signin/Signin';
import Register from '../Register/Register';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
function Mainpage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const path = useSelector((state) => state.user.path);
  
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
    // const path = useSelector((state) => state.user.path);
    if (jwtToken) {
   
        console.log(path);
      if ( path ==='/Admin') {
        // Handle back button pressed on /Admin page
        navigate('/Admin');
      } else if (path === '/Home') {
        // Handle back button pressed on /Home page
        navigate('/Home');
      }
    }
  }, []);

  const closeRegister = () => {
    setShowRegister(!showRegister);
  };

  const closeSignin = () => {
    setShowSignIn(!showSignIn);
  };

  const show = () => {
    setShowRegister(!showRegister);
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="main-container">
      <div className="flexfit-heading">
        <h1 className="site-name">FlexFit</h1>
      </div>
      {showSignIn ? (
        <SignIn closeSignin={closeSignin} show={show} />
      ) : showRegister ? (
        <Register closeRegister={closeRegister} show={show} />
      ) : (
        <div className="content-container">
          <div className="quotes">
            <div className="welcome">
              <h4>Welcome To FlexFit</h4>
            </div>
            <div className="message">
              <h4 className="message1">Invest in your health and well-being. Equip yourself for success and let every rep bring you closer to your goals</h4>
            </div>
          </div>
          <div className="buttons-main">
            <button className='btn-mainpage' onClick={() => setShowSignIn(true)}>SignIn</button>
            <button className='btn-mainpage' onClick={() => setShowRegister(true)}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mainpage;
