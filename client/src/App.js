import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './redux/LoginSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainDashboard from './components/AdminDashboard/Adminmaindashboard';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import Blog from './components/Blog/Blog';
import BlogPage1 from './components/Blog/BlogPage1';
import SubmitRequest from './components/SubmitRequest';
import ContactUs from './components/ContactUs';
import DonateNow from './components/DonateNow';
import Program from './components/Program';
import Login from './components/userAuth/Login';
import Registration from './components/userAuth/RegistrationRequest';
import PrivateRoute from './components/userAuth/PrivateRoute';
import ForgotPassword from './components/userAuth/ForgotPassword';
import Verification from './components/userAuth/Verification';
import MemberMainDashboard from './components/MemberDashboard/MemberMaindashboard';
import ProgramDetails from './components/ProgramDetails';
import Donate from './components/Donate';
import OnlineDonationForm from './components/OnlineDonationForm';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  
  }, [location]);  

  return null;  
};

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      dispatch(logout());
    };
    // const handleVisibilityChange = () => {
    //   if (document.visibilityState === 'hidden') {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('userRole');
    //     dispatch(logout());
    //   }
    // };

    window.addEventListener('beforeunload', handleBeforeUnload);
    // document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      window.history.pushState(null, '', window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, '', window.location.href);
      };
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [token]);

  if (token && !location.pathname.startsWith("/admin") && !location.pathname.startsWith("/member")) {
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'member') {
      return <Navigate to="/member" replace />;
    }
    return <Navigate to="/" replace />; 
  }

  const excludeNavAndFooter = location.pathname === '/login' || location.pathname === '/registration';
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isMemberRoute = location.pathname.startsWith('/member');

  // Handle dashboard routes
  if (isAdminRoute) {
    return (
      <PrivateRoute requiredRole="admin">
        <MainDashboard />
      </PrivateRoute>
    );
  }

  if (isMemberRoute) {
    return (
      <PrivateRoute requiredRole="member">
        <MemberMainDashboard />
      </PrivateRoute>
    );
  }

  return (
    <div>
      {!excludeNavAndFooter && <Navbar />}
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogPage1/:id" element={<BlogPage1 />} />
          <Route path="/submit-request" element={<SubmitRequest />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/donatenow" element={<DonateNow />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/program" element={<Program />} />
          <Route path="/onlinedonation" element={<OnlineDonationForm />} />
          <Route path="/program/:id" element={<ProgramDetails />} />
        </Routes>
      </main>
      {!excludeNavAndFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;