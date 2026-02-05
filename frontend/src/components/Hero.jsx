import React from 'react'
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  
  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: 'linear-gradient(135deg, #0F2854 0%, #764ba2 100%)' }}
    >
      {userInfo ? (
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold mb-3">Welcome Back, {userInfo.name}!</h1>
          <p className="lead mb-5">Explore your dashboard and manage your account.</p>
          <Link to="/profile" className="btn btn-light btn-lg px-5">
            Go to Dashboard
          </Link>
        </div>
      ) : (
      <div className="container text-center text-white">
        <h1 className="display-4 fw-bold mb-3">Welcome to AUTH  MERN</h1>
        <p className="lead mb-5">Sign in or register to get started</p>

        <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">

                <Link to="/login" className="btn btn-light btn-lg px-5"
                >
            <FaSignInAlt className="me-2" /> Login
          </Link> 

          <Link to="/register" className="btn btn-outline-light btn-lg px-5">
            <FaUserPlus className="me-2" /> Register
          </Link>

        </div>
        </div>
          

      )}
    </div>
  )
}

export default Hero
