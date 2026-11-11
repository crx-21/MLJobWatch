import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

function readStoredAuth() {
  let user = null;
  const storedUser = localStorage.getItem('mljobwatch_user');

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && typeof parsedUser.email === 'string') {
        user = parsedUser;
      } else {
        throw new Error('Stored user data is not valid.');
      }
    } catch (error) {
      console.error('Unable to restore the saved MLJobWatch user.', error);
      localStorage.removeItem('mljobwatch_user');
      sessionStorage.removeItem('mljobwatch_auth');
    }
  }

  return {
    user,
    isAuthenticated: user !== null && sessionStorage.getItem('mljobwatch_auth') === 'true',
  };
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);

  const login = (email) => {
    const userData = {
      email,
      name: email.split('@')[0],
      loggedInAt: new Date().toISOString(),
    };
    localStorage.setItem('mljobwatch_user', JSON.stringify(userData));
    sessionStorage.setItem('mljobwatch_auth', 'true');
    setAuth({ user: userData, isAuthenticated: true });
  };

  const register = (fullname, email) => {
    const userData = {
      email,
      name: fullname,
      loggedInAt: new Date().toISOString(),
    };
    localStorage.setItem('mljobwatch_user', JSON.stringify(userData));
    sessionStorage.setItem('mljobwatch_auth', 'true');
    setAuth({ user: userData, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('mljobwatch_user');
    sessionStorage.removeItem('mljobwatch_auth');
    setAuth({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
