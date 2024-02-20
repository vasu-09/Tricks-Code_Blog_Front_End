import React from 'react'

const Errorpage = () => {
  return (
    <div className='container'>
      <img src='images.png' alt='Page not found'/>
      <p className='error-msg'>Something went wrong. Try clicking the regresh page button to reload the application. <button className='btn btn-primary'>Refresh Page</button></p>
    </div>
  )
}

export default Errorpage
