import React from 'react';
import { useNavigate } from 'react-router-dom';
import notFound from './images.png'
import './NotFound.css'

const NotFound = () => {
    const navigate= useNavigate()
    function handleonClick (){
        navigate('/')
    }
  return (
      <div className="not-found-container"> {/* Add a container with CSS class */}
      <div className="not-found-content"> {/* Add a content wrapper */}
      <h1>404 - Page Not Found</h1>
      <img src={notFound} alt="Page not Found" className="not-found" />
        
        <p>The requested page does not exist. Please refresh the page.</p>
        <button className='btn btn-primary' onClick={handleonClick}>Refresh Page</button>
         {/* Use the image with CSS class */}
      </div>
    </div>
  );
}

export default NotFound;
