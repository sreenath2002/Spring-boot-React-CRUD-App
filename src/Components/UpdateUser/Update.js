import React, { useState } from 'react';
import './Update.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Update = (props) => {
  const [fullName, setFullName] = useState(props.Fullname);
  const [email, setEmail] = useState(props.Email);
 
  const [password, setPassword] = useState('');
const [registrationSuccess, setRegistrationSuccess] = useState(false);
const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const[userNameError,setUserNameError]=useState("")
    const navigate = useNavigate();
    // const [emailExistsError, setEmailExistsError] = useState(false);
    const validateForm = () => {
      let isValid = true;
    
      // Email validation using regex
      const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
      if (fullName === "" || fullName.trim()==='') {
        setUserNameError('Provide User Name');
        isValid = false;
      }
      else if(!/^[A-Z]/.test(fullName))
      {
        setUserNameError("Username must start with capital letter")
        isValid=false;
      }
       else {
        setUserNameError('');
      }
    
      if (email === "") {
        setEmailError('Please provide Email');
        isValid = false;
      } else if (!emailRegex.test(email)) {
        setEmailError('Invalid email address');
        isValid = false;
      } else {
        setEmailError('');
      }
    
      if (password === "") {
        setPasswordError('Please provide password');
        isValid = false;
      } else if (password.length < 4) {
        setPasswordError('Password must be at least 6 characters long');
        isValid = false;
      } else {
        setPasswordError('');
      }
    
      return isValid;
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission (e.g., send data to server)
    console.log('User added:', { fullName, email,password });
    // Clear input fields
    setFullName('');
    setEmail('');
    setPassword('');
  };
  async function updateuser(event) {
    event.preventDefault();
    const jwtToken = localStorage.getItem("jwt");
  
    if (validateForm()) { // Add parentheses to call the function
      try {
        await axios.put(`http://localhost:8080/api/auth/update/${props.Id}`, {
          email: email,
          password: password,
          fullName: fullName,
        }, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        setRegistrationSuccess(true);
        setTimeout(() => {
          setRegistrationSuccess(false);
        }, 3000);
  
        // Clear input fields
        setFullName('');
        setEmail('');
        setPassword('');
        props.up(true);
        props.down(false)
      } catch (err) {
        if (err.response && err.response.status === 403) {
          alert("Something Wrong");
        } else {
          alert(err);
        }
      }
    }
  }
  
 

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
    <div className="add-user-container">
    {registrationSuccess && <div className="registration-success">Updated Successfully!</div>}
        {/* {emailExistsError && <div className="registration-error">Email already exists</div>} */}
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          /> <div className="error">{userNameError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="error">{emailError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="error">{passwordError}</div>
        </div>
        <button type="submit" onClick={updateuser}>Update</button>
       
      </form>
    </div>
    </div>
  );
};

export default Update;