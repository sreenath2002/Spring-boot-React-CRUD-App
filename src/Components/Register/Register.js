// Registration.js

import React,{useState} from "react";
import "./Register.css"; // Import your custom CSS file
// import { FaTimes } from 'react-icons/fa'; // Import the close icon
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap Icons CSS
import axios from "axios";
// import { useNavigate } from "react-router-dom";
const Register = (props) => {
    const [fullName, setEmployeename] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    // const[spaceError,setSpaceError]=useState(false);
    const validate = () => {
      let isValid = true;
    
      // Email validation using regex
      const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
      if ( email.trim()==='') {
        setEmailError("Please Provide email ");
        isValid = false;
    }
      else if (!emailRegex.test(email)) {
          setEmailError("Invalid email address");
          isValid = false;
      } else {
          setEmailError("");
      }
      if(fullName.trim()==='')
      {
        setUserNameError("Please provide UserName")
        isValid=false;
      }
      else if (!/^[A-Z]/.test(fullName)  ) 
      {
        setUserNameError("Username must start with a capital letter");
        isValid = false;
      } 
      
      else 
      {
        setUserNameError("");
      }
  
      // Password length validation
      if(password.trim()==='')
      {
        setPasswordError("Please provide password")
        isValid=false;
      }
      else if (password.length < 4  ) 
      {
        setPasswordError("Password must be at least 4 characters long");
        isValid = false;
      } 
      
      else 
      {
        setPasswordError("");
      }
  
      return isValid;
  };
  
    // const navigate=useNavigate()
    async function save (event){
        event.preventDefault();
       if(validate()) { try{
            await axios.post("http://localhost:8080/api/auth/signup",{
                email:email,
                password:password,
                fullName:fullName,
             
            });
            setRegistrationSuccess(true);
            setTimeout(() => {
                setRegistrationSuccess(false);
            }, 3000);
            
            setEmailExistsError(false);
        }
        catch(err){
            if (err.response && err.response.status === 403) {
                setEmailExistsError(true); 
                setTimeout(() => {
                    setEmailExistsError(false);
                }, 3000); 
            } else {
                alert(err);
            }
        }
    }
  }
    const handleCloseClick = () => {
      props.closeRegister(); // Call the closeRegister function from props
    };
    const handleShowClick=()=>{
      props.show();
    }

  return (
    <div className="container registration-container">
        {registrationSuccess && <div className="registration-success">Registered Successfully!</div>}
        
        {emailExistsError && <div className="registration-error">Email already exists</div>}
      

                        <i class="bi bi-x-circle" onClick={handleCloseClick}></i>
                        <br></br>
      <h1 className="registration-heading">Create an Account</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
        
          <input type="text" className="form-control" id="fullName"value={fullName} onChange={(event)=>{setEmployeename(event.target.value) }} required />
          <div className="error">{userNameError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(event)=>{setEmail(event.target.value)}}required />
          <div className="error">{emailError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password"value={password} onChange={(event)=>{setPassword(event.target.value)}}required />
          <div className="error">{passwordError}</div>
        </div>
       
        <button type="submit" className="btn btn-primary" onClick={save}>Register</button>
        <div className="login">Already have an account? <span onClick={handleShowClick}>Signin</span></div>
      </form>
    </div>
  );
}

export default Register;


