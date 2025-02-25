import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { loginUser } from '../../redux/LoginSlice';
import { Link } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  
  // Check if user is already logged in and handle role-based navigation
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (token) {
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'member') {
      return <Navigate to="/member" replace />;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await dispatch(loginUser({ username, password })).unwrap();
      if (result) {
        toast.success('Login successful!');
        // Navigate based on user role from the login response
        const userRole = result.role; // Assuming the role is returned in the login response
        localStorage.setItem('userRole', userRole);
        
        if (userRole === 'admin') {
          navigate('/admin');
        } else if (userRole === 'member') {
          navigate('/member');
        }
      }
    } catch (err) {
      toast.error(error || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side with login form */}
      <div className="w-full md:w-1/1 flex justify-center items-center bg-white p-4 md:p-0">
        <div className="w-full max-w-md p-6">
          <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full p-2 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 rounded-3xl border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
             {/* Remember me and Forgot Password */}
             <div className="flex justify-between items-center mb-4">
              {/* Remember Me */}
              {/* <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 border border-orange-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div> */}

              {/* Forgot Password */}
              <Link to="/forgotpassword" className="text-sm text-black font-semibold hover:text-blue-400">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-[#FCA311] text-white rounded-3xl hover:bg-orange-600 transition disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-4 text-center text-gray-700">
            <p>
              Don't have an account?{' '}
              <a href="/registration" className="text-black font-semibold hover:text-blue-400">
                Register
              </a>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="mt-6 flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#FCA311] hover:text-blue-600 transition">
              <Facebook size={32} />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-[#FCA311] hover:text-green-400 transition">
              <MessageCircle size={32} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#FCA311] hover:text-blue-400 transition">
              <Twitter size={32} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#FCA311] hover:text-blue-400 transition">
              <Linkedin size={32} />
            </a>
          </div>
        </div>
      </div>

      {/* Right side with orange background and image at the bottom */}
      <div className="w-full md:w-1/2 bg-[#FCA311] relative flex justify-center items-end">
        <img
          src="/Assets/Loginimg.png"
          alt="Background"
          className="w-full object-cover md:mr-44"
        />
      </div>
    </div>
  );
};

export default Login;