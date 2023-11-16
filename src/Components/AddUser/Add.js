import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = (props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const[userNameError,setUserNameError]=useState("")
    const navigate =useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission (e.g., send data to server)
    console.log('User added:', { fullName, email, password });
    // Clear input fields
    setFullName('');
    setEmail('');
    setPassword('');
  };
  const validateForm = () => {
    let isValid = true;
  
    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/

    if (fullName.trim() === '') {
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
  
    if (email.trim() === '') {
      setEmailError('Please provide Email');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
  
    if (password.trim() === '') {
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
  
  async function adduser (event){
    event.preventDefault();
   if(validateForm()){ try{
        await axios.post("http://localhost:8080/api/auth/signup",{
            email:email,
            password:password,
            fullName:fullName,
        });setRegistrationSuccess(true);
        setTimeout(() => {
            setRegistrationSuccess(false);
        }, 3000);
        setEmailExistsError(false);
       
       
        // setEmailExistsError(false);
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
    {registrationSuccess && <div className="registration-success">Added Successfully!</div>}
        {emailExistsError && <div className="registration-error">Email already exists</div>}
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
           <div className="error">{userNameError}</div>
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
        <button type="submit" style={{ marginLeft: '10px' }} onClick={adduser}>Add User</button>
        <button  style={{ marginLeft: '10px' }} onClick={()=>{props.set(false)}}>Back</button>
      </form>
    </div>
    </div>
  );
};

export default Add;
