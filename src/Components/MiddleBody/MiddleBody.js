import React from 'react';
import "./MiddleBody.css";

export default function MiddleBody() {
  return (
    <div className="card-container">
      <div className="card">
        <div className='image'>
          <img src="../../../Images/barrelsset.jpg" className="card-img-top" alt="..." />
        </div>
        <div className="card-overlay">
          <h4 className="card-text">Barrel</h4>
          <button className="shop-now">Shop Now</button>
        </div>
      </div>

      <div className="card">
        <div className='image'>
          <img src="../../../Images/dumbellsset.jpg" className="card-img-top" alt="..." />
        </div>
        <div className="card-overlay">
          <h4 className="card-text">Dumbbel</h4>
          <button className="shop-now">Shop Now</button>
        </div>
      </div>

      <div className="card">
        <div className='image'>
          <img src="../../../Images/set1.jpg" className="card-img-top" alt="..." />
        </div>
        <div className="card-overlay">
          <h4 className="card-text">Others</h4>
          <button className="shop-now">Shop Now</button>
        </div>
      </div>
    </div>
  );
}





