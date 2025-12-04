import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProfileDetails from './pages/ProfileDetails';

// Simple Private Route wrapper
const PrivateRoute = ({ children }: { children?: React.ReactNode }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<ProfileDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <footer className="bg-white border-t py-8 mt-8">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Qasmi Matrimony. All rights reserved.
            </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;