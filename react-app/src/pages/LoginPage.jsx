import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export default function LoginPage() {
  const [view, setView] = useState('login'); // 'login' or 'register'
  const navigate = useNavigate();
  const { isAuthenticated, login, register } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);

  // Register form state
  const [regFullname, setRegFullname] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regErrors, setRegErrors] = useState({});
  const [regLoading, setRegLoading] = useState(false);

  useEffect(() => {
    document.title = 'Sign In - MLJobWatch';
    if (isAuthenticated) {
      navigate('/jobs', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = {};

    if (!loginEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(loginEmail.trim())) {
      errors.email = 'Please enter a valid email';
    }

    if (!loginPassword) {
      errors.password = 'Password is required';
    }

    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      login(loginEmail.trim());
      navigate('/jobs');
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errors = {};

    if (!regFullname.trim()) {
      errors.fullname = 'Full name is required';
    } else if (regFullname.trim().length < 2) {
      errors.fullname = 'Name must be at least 2 characters';
    }

    if (!regEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(regEmail.trim())) {
      errors.email = 'Please enter a valid email';
    }

    if (!regPassword) {
      errors.password = 'Password is required';
    } else if (regPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!regConfirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (regPassword !== regConfirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setRegErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setRegLoading(true);
    setTimeout(() => {
      setRegLoading(false);
      register(regFullname.trim(), regEmail.trim());
      navigate('/jobs');
    }, 1000);
  };

  const clearFieldError = (setter, errors, setErrors, field) => (e) => {
    setter(e.target.value);
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <main className="app">
        {view === 'login' && (
          <section className="view active">
            <div className="card">
              <div className="card-header">
                <h1>Welcome back</h1>
                <p>Sign in to your MLJobWatch account</p>
              </div>

              <form onSubmit={handleLogin} noValidate>
                <div className="field">
                  <label htmlFor="login-email">Email address</label>
                  <input
                    type="email"
                    id="login-email"
                    placeholder="you@company.com"
                    value={loginEmail}
                    onChange={clearFieldError(setLoginEmail, loginErrors, setLoginErrors, 'email')}
                    className={loginErrors.email ? 'error' : ''}
                    required
                  />
                  <span className={`error-msg ${loginErrors.email ? 'visible' : ''}`}>
                    {loginErrors.email || ''}
                  </span>
                </div>

                <div className="field">
                  <label htmlFor="login-password">Password</label>
                  <input
                    type="password"
                    id="login-password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={clearFieldError(setLoginPassword, loginErrors, setLoginErrors, 'password')}
                    className={loginErrors.password ? 'error' : ''}
                    required
                  />
                  <span className={`error-msg ${loginErrors.password ? 'visible' : ''}`}>
                    {loginErrors.password || ''}
                  </span>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loginLoading}>
                  {loginLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="footer-text">
                Don't have an account yet?{' '}
                <a href="#register" className="link" onClick={(e) => { e.preventDefault(); setView('register'); }}>
                  Register here
                </a>
              </div>
            </div>
          </section>
        )}

        {view === 'register' && (
          <section className="view active">
            <div className="card">
              <div className="card-header">
                <h1>Create account</h1>
                <p>Join MLJobWatch today</p>
              </div>

              <form onSubmit={handleRegister} noValidate>
                <div className="field">
                  <label htmlFor="reg-fullname">Full name</label>
                  <input
                    type="text"
                    id="reg-fullname"
                    placeholder="Jane Doe"
                    value={regFullname}
                    onChange={clearFieldError(setRegFullname, regErrors, setRegErrors, 'fullname')}
                    className={regErrors.fullname ? 'error' : ''}
                    required
                  />
                  <span className={`error-msg ${regErrors.fullname ? 'visible' : ''}`}>
                    {regErrors.fullname || ''}
                  </span>
                </div>

                <div className="field">
                  <label htmlFor="reg-email">Email address</label>
                  <input
                    type="email"
                    id="reg-email"
                    placeholder="you@company.com"
                    value={regEmail}
                    onChange={clearFieldError(setRegEmail, regErrors, setRegErrors, 'email')}
                    className={regErrors.email ? 'error' : ''}
                    required
                  />
                  <span className={`error-msg ${regErrors.email ? 'visible' : ''}`}>
                    {regErrors.email || ''}
                  </span>
                </div>

                <div className="field">
                  <label htmlFor="reg-password">Password</label>
                  <input
                    type="password"
                    id="reg-password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={clearFieldError(setRegPassword, regErrors, setRegErrors, 'password')}
                    className={regErrors.password ? 'error' : ''}
                    required
                  />
                  <span className={`error-msg ${regErrors.password ? 'visible' : ''}`}>
                    {regErrors.password || ''}
                  </span>
                </div>

                <div className="field">
                  <label htmlFor="reg-confirm-password">Confirm password</label>
                  <input
                    type="password"
                    id="reg-confirm-password"
                    placeholder="••••••••"
                    value={regConfirmPassword}
                    onChange={clearFieldError(setRegConfirmPassword, regErrors, setRegErrors, 'confirmPassword')}
                    className={regErrors.confirmPassword ? 'error' : ''}
                    required
                  />
                  <span className={`error-msg ${regErrors.confirmPassword ? 'visible' : ''}`}>
                    {regErrors.confirmPassword || ''}
                  </span>
                </div>

                <button type="submit" className="btn btn-primary" disabled={regLoading}>
                  {regLoading ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              <div className="footer-text">
                Already have an account?{' '}
                <a href="#login" className="link" onClick={(e) => { e.preventDefault(); setView('login'); }}>
                  Login here
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
