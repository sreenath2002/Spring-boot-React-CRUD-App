import React from 'react';
import "./Bottom.css";
import 'font-awesome/css/font-awesome.min.css';


import "./Bottom.css";

const Bottom= () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="logo.png" alt="Logo" />
          <h1>FlexFit</h1>
        </div>
        <div className="footer-links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Address: 123 Main Street, Cityville, USA</p>
          <p>Email: info@company.com</p>
          <p>Phone: +1 234-567-8901</p>
        </div>
        <div className="social-icons">
          <h2>Follow Us</h2>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Company Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Bottom;


