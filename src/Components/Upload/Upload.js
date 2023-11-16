import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
const Upload = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const fullName = useSelector((state) => state.user.fullName);
  const id = useSelector((state) => state.user.id);
  const email = useSelector((state) => state.user.email);
  const profileImage = useSelector((state) => state.user.profileImage);

  const handleImagePreview = (e) => {
    setErrorMessage('');
    setSuccessMessage('');
    const file = e.target.files[0];

    if (file) {
      setPhoto(file);

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    const jwtToken = localStorage.getItem('jwt');
    if (photo) {
      try {
        if (photo.size > 1024 * 1024) {
          setErrorMessage('Selected image size exceeds 1MB. Please choose a smaller image.');
          setTimeout(() => {
            setErrorMessage('');
          }, 5000); // Hide the error message after 5 seconds
          return;
        }

        const formData = new FormData();
        formData.append('image', photo);

        const response = await axios.post(`http://localhost:8080/api/auth/uploadImage/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Include the token in the headers
          },
        });

        setSuccessMessage('Image uploaded successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000); 

        dispatch(
          setUser({
            fullName: fullName,
            id: id,
            profileImage: response.data.base64Image,
            path: '/Home',
            email: email
          })
        );
      } catch (error) {
        console.error('Error uploading image:', error);
        setErrorMessage('Error uploading image. Please try again.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000); 
      }
    }
  };

  return (
    <form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="upload">
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}
        <br></br>
        <br></br>
       
        <div className="form-group">
          <h1>User Profile</h1>
          <br></br>
          <h4>Username : {fullName}</h4>
          <label>Email : {email}</label>
          <img src={`data:image/png;base64,${profileImage}`} style={{ maxWidth: '100px' }} alt="profile img" />
          <br />
          <br></br>
          <label htmlFor="uploadInput">Click to select Image:</label>
          <input
            type="file"
            accept="image/*"
            className="upload-input"
            onChange={(e) => handleImagePreview(e)}
            id="uploadInput"
          />
        </div>
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="form-group">
          <h2>Preview:</h2>
          {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '50px' }} />}
        </div>

        <div className="form-group">
          <button type="button" onClick={handleImageUpload} className="uploadBtn">
            Upload and Submit
          </button>
          
              <button onClick={()=>{navigate('/Home')}}>Back To Home</button>
        </div>
      </div>
    </form>
  );
};

export default Upload;


