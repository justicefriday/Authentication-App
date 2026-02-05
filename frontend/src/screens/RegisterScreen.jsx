import React, { useState,useEffect} from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';   


const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [register] = useRegisterMutation();
 
   const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  
    const registerHandler =async (e) => {
      e.preventDefault()  
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      } else {
        try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
        toast.success('Registration Successful!');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
      }
      
    }
  return (
    <div className="container-fluid bg-light d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card border-0 shadow-lg p-4 p-md-5 rounded-4"
        style={{ maxWidth: '450px', width: '100%' }}
      >
        <div className="text-center mb-4">
          <FaUserPlus className="text-primary" style={{ fontSize: '3rem' }} />
          
          <h3 className="fw-bold text-dark mt-3">Create Your Account</h3>
          <p className="text-muted">Join our community — it's free and secure!</p>
        </div>

        <form onSubmit={registerHandler}>
          <div className="form-floating mb-3">
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>


          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold rounded-pill"
          >
            Register
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-primary text-decoration-none fw-semibold">
                Sign In
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
