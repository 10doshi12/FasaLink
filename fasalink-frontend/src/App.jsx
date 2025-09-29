import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile';
// Component Imports
import ProtectedRoute from './components/ProtectedRoute';
import Notifications from './pages/Notifications'
import Chat from './pages/Chat'
import HyperledgerDemo from './pages/HyperledgerDemo'
// Page Imports
import Landing from './pages/Landing'; // Changed from Welcome to Landing
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Payments from './pages/Payments';
import Tracking from './pages/Tracking';
import History from './pages/History';
import LiveHyperledgerPage from './pages/LiveHyperledgerPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Landing />} /> {/* Use Landing component here */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* --- Protected Routes --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/history" element={<History />} />
            <Route path="/create-lot" element={<LiveHyperledgerPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/chat" element={<Chat />} />
            <Route path='/demo' element={<HyperledgerDemo />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;