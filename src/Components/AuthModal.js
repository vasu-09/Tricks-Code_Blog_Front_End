import React, { useState } from 'react'
import { loginApicall, storeToken, saveLoggedInUser } from '../Services/AuthService';
import { useNavigate } from 'react-router-dom'

const AuthModal = () => {
    const [usernameOrEmail, setUsernameoremail] =useState('')
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate()

    const handleSignIn = async (e) => {
      e.preventDefault(); 
      try {
        const response = await loginApicall(usernameOrEmail, password);
        console.log(response)
        if (response) {
          const token = 'Bearer ' + response.data.accessToken;
          const role = response.data.role;
          const user = response.data.user;
          storeToken(token);
          saveLoggedInUser(user, role);
          console.log('Signing in...');
          navigate('/');
      } else {
          // If response is null, show alert
          setShowAlert(true);
      }
       
      } catch (error) {
        console.error('Sign in failed:', error);
        if (error.response && error.response.status === 401) {
          setShowAlert(true); // Show error alert if status is 401
      }
      }
    };
  
  

  return (
    <>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      
    <div className="card bg-light" style={{ width: '400px' }}>
    {showAlert && (
            <span className="alert alert-danger" role="alert" style={{ fontSize: "15px", padding: "3px", margin: "3px" }}>
                Error: Invalid username or password. Please try again.
            </span>
        )}
      <div className="card-header text-white" style={{ backgroundColor: 'rgb(29, 70, 110)' }}>
        Login
      </div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label name="username" className="form-label">
              Username or Email
            </label>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameoremail(e.target.value)}
              className="form-control"
              id="username"
              placeholder="Enter username or email id"
              autoComplete="username"
            />
          </div>
          <div className="form-group">
          <label htmlFor="password"  className="form-label">Password</label>
                <input type="password" value ={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="password" placeholder='Enter Password' autoComplete="current-password" />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="btn btn-block text-white"
              style={{ backgroundColor: 'rgb(29, 70, 110)' }}
              onClick={handleSignIn}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/> 
    <br/>
    <br/>
    <br/>
    </div>
    </>
  )
}

export default AuthModal
