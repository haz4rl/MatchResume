import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ATSTracker from './pages/ATSTracker';

import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route
                path="login"
                element={
                  <AuthLayout>
                    <Login />
                  </AuthLayout>
                }
              />
              <Route
                path="register"
                element={
                  <AuthLayout>
                    <Register />
                  </AuthLayout>
                }
              />
            </Route>

            {/* Protected routes */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <MainLayout /> {/* Wrapped as children of ProtectedRoute */}
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="create" element={<CreateResume />} />
              <Route path="ats-tracker" element={<ATSTracker />} />
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
