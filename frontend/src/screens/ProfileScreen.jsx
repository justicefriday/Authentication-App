import React, { useState, useEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const navigate =useNavigate()
    
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.setName, userInfo.setEmail]);

  const updateHandler = async (e) => {
      e.preventDefault();
      if (password || confirmPassword) {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
      }
   
    try {
      const res = await updateProfile({
        id: userInfo._id,
        name,
        email,
        ...(password && { password }),
      }).unwrap();

      dispatch(setCredentials({ ...res }));
        toast.success(`${res.name}  Profile updated successfully`);
        navigate('/')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 border-0 rounded-4" style={{ width: '420px' }}>
        <div className="text-center mb-4">
          <FaUserPlus className="text-primary" style={{ fontSize: '3rem' }} />
          <h3 className="mt-2 fw-bold text-dark">Update Profile</h3>
        </div>

        <form onSubmit={updateHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>


          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold"
            style={{ borderRadius: '50px', fontSize: '1.1rem' }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
