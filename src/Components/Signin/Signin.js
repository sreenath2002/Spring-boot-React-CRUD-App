import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../../Auth/AuthContext";
// import { useDispatch } from "react-redux";
// import { setUser,clearUser } from "../../Redux/userActions";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import './Signin.css'; // Import your custom CSS file
import Admin from "../../Pages/Home/Update/Admin";
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import axios from "axios";

const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signError,setSignError]=useState(false);
  const[setId,setUserId]=useState();
  const dispatch = useDispatch();
    const navigate = useNavigate();
    // const[user,setUser]=useState();
    const validateForm = () => {
      let isValid = true;
  
      // Email validation using regex
      const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
      if(email.trim()==='')
      {
        setEmailError("Please provide email")
        isValid=false;
      }
      else if (!emailRegex.test(email) ) {
        setEmailError("Invalid email address");
        isValid = false;
      }
      else{
        setEmailError("")
      }
      
  
      // Password length validation
       if(password.trim()==='')
      {
        setPasswordError("Please provide password")
        isValid=false;
      }
      else if (password.length < 4  ) 
      {
        setPasswordError("Password must be at least 6 characters long");
        isValid = false;
      } 
      
      else 
      {
        setPasswordError("");
      }
      
  
      return isValid;
    };
    async function login(event) {
      event.preventDefault();
    
      if (validateForm()) {
        try {
          const response = await axios.post("http://localhost:8080/api/auth/signin", {
            email: email,
            password: password,
          });
    
          console.log(response.data);
    
          if (response.data.message === "Sign in successfully") {
            console.log("sldjfkb");
            localStorage.setItem("jwt", response.data.jwt);
            setUserId(response.data.id);
           
    
            if (response.data.role === "ADMIN") {
              dispatch(setUser({ email, id: response.data.id, profileImage: response.data.image ,path: '/Admin',fullName:response.data.fullName}));
              navigate('/Admin');
            } else {
              dispatch(setUser({ email, id: response.data.id, profileImage: response.data.image,path:'/Home' ,fullName:response.data.fullName}));
              navigate('/Home');
            }
          } else {
            setSignError(true);
            console.log(signError);
          }
        } catch (err) {
          console.error(err);
          setSignError(true); // Set signError on API request failure
        }
      }
    }
    
      const handleCloseClick = () => {
        props.closeSignin(); // Call the closeRegister function from props
      };
      const handleShowClick=()=>{
        props.show();
      }
  return (
    <div className="container signin-container">
      <i class="bi bi-x-circle" onClick={handleCloseClick}></i>
      {signError && <div className="error">Invalid username or password</div>}
      <h1 className="Bookmart-signin">FlexFit</h1>
      <br></br>
      <h4>Sign In</h4>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="email" value={email} onChange={(event)=>{setEmail(event.target.value)}} required />
          <div className="error">{emailError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} required />
          <div className="error">{passwordError}</div>
          <span className="forgot-password">Forgot password ?</span>
        </div>
        <button type="submit" className="btn btn-primary" onClick={login}>Sign In</button>
        <div className="register">New User? Register <span onClick={handleShowClick}>Here</span></div>
      </form>
    </div>
  );
}

export default SignIn;
