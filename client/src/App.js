import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
import MemberMainDashboard from './components/MemberDashboard/MemberMaindashboard';

const Layout = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  // If user is logged in and tries to access login/registration, redirect to home
  if (token && ['/login', '/registration'].includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  const excludeNavAndFooter = location.pathname === '/login' || location.pathname === '/registration';
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isMemberRoute = location.pathname.startsWith('/member');

  if (isAdminRoute) {
    return (
      <PrivateRoute>
        <MainDashboard />
      </PrivateRoute>
    );
  }

  if (isMemberRoute) {
    return (
      <PrivateRoute>
        <MemberMainDashboard/>
      </PrivateRoute>
    );
  }

  return (
    <div>
      {!excludeNavAndFooter && <Navbar />}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          <Route path="/about-us" element={
            <PrivateRoute>
              <AboutUs />
            </PrivateRoute>
          } />
          <Route path="/blog" element={
            <PrivateRoute>
              <Blog />
            </PrivateRoute>
          } />
          <Route path="/blogPage1" element={
            <PrivateRoute>
              <BlogPage1 />
            </PrivateRoute>
          } />
          <Route path="/submit-request" element={
            <PrivateRoute>
              <SubmitRequest />
            </PrivateRoute>
          } />
          <Route path="/contact" element={
            <PrivateRoute>
              <ContactUs />
            </PrivateRoute>
          } />
          <Route path="/donatenow" element={
            <PrivateRoute>
              <DonateNow />
            </PrivateRoute>
          } />
          <Route path="/program" element={
            <PrivateRoute>
              <Program />
            </PrivateRoute>
          } />
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