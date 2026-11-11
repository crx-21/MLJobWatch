import React, { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import JobsPage from './pages/JobsPage';
import AboutPage from './pages/AboutPage';

const pageClasses = ['home-page', 'login-page', 'jobs-page', 'about-page'];

function RouteBodyClass() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.body.classList.remove(...pageClasses);
    const pageClass = {
      '/': 'home-page',
      '/login': 'login-page',
      '/jobs': 'jobs-page',
      '/about': 'about-page',
    }[pathname];

    if (pageClass) document.body.classList.add(pageClass);

    return () => document.body.classList.remove(...pageClasses);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouteBodyClass />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
