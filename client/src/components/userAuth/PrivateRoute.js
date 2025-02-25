import {useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/LoginSlice';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      dispatch(logout());
      navigate('/login', { replace: true });
    }
  }, [token, dispatch, navigate]);

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if role is required and matches
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'member') {
      return <Navigate to="/member" replace />;
    }
    // If no specific role matches, go to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;