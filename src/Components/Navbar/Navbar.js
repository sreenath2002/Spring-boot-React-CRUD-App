import React from 'react';
import './Navbar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setUser } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
// import Upload from '../Upload/Upload';
const Navbar = () => {
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const location = useLocation();
  const email = useSelector((state) => state.user.email);
  const id = useSelector((state) => state.user.id);
  const profileImage=useSelector((state)=>state.user.profileImage)
  const fullName=useSelector((state)=>state.user.fullName)

  console.log("lsfdkgs")
  console.log(email, id,profileImage);
  const handleLogout = async () => {
    const jwtToken = localStorage.getItem("jwt");
    
    try {

      if(jwtToken)
      {
        
       await  axios.post("http://localhost:8080/api/auth/logout",{},{
          
       headers: {
        Authorization: `Bearer ${jwtToken}` // Include the token in the headers
      }
         
        }).then((res)=>{

         
          if(res.data=="Logged out successfully"){
            localStorage.removeItem('jwt');
            navigate('/');
          }
      
        }).catch((error)=>{

          console.error(error)
        })
      }
     
      
    } catch (error) {
     
      console.error(error);
    }
  }
  const hiddenRoutes = ['/Admin'];
  const isHiddenRoute = () => hiddenRoutes.includes(location.pathname);
  return (
        <div className="navbar">
      <div className='sub-nav'>
      <div className="navbar-logo">
        <h1>FlexFit</h1>
      </div>
      <div className="navbar-links">
        <ul>
        {!isHiddenRoute() && (
            <>
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Cart</a></li>
              <li><a href="/blog">Whishlist</a></li>
              <li><a href="/about">Notifications</a></li>
              <li><a href="/contact">Contact</a></li>
            </>
          )}
        </ul>
      </div>
      
      <div className="navbar-user">
       
          
      {!isHiddenRoute()&& (<div><img src={`data:image/png;base64,${profileImage}`} onClick={()=>{navigate('/Upload',{ state: {  id } })}} alt="User Profile" /></div>)}
        <div><span>Welcome, {fullName}</span></div>
        <div className='logout-btn-div'><button className="logout-button" onClick={handleLogout}>Logout</button></div>
         

      </div>
      </div>
    </div>
  );
}

export default Navbar;


