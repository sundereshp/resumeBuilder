import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Signup from './credentials/Signup';
import Login from './credentials/Login';
import DashboardLayout from './dashboard';
import Heading from './components/main/Heading'
import StartBuilding from './startbuilding'
import Education from './components/main/Education'
// import Experience from './components/main/Experience'
// import Skills from './components/main/Skills'
// import Summary from './components/main/Summary'
// import Finalize from './components/main/Finalize'
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(storedIsAuthenticated);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Router> {/* ✅ Wrap everything inside Router */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />

        {/* Protected Routes */}

        <Route path="/dashboard" element={<DashboardLayout onLogout={handleLogout} />}>
          <Route path="" element={<StartBuilding />} />
          <Route path="heading" element={<Heading />} />
          <Route path="education/*" element={<Education />} />
          {/* Other routes */}
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
