import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

const UserForm: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
  });

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const loginUser = async (email: string, password: string) => {
    const res = await fetch('https://localhost:5001/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Invalid email or password');
    const data = await res.json();
    localStorage.setItem('token', data.token);
    navigate('/home');
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://localhost:5001/api/users/Create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        const errorJson = await res.json();
        const messages = Object.values(errorJson.errors || {}).flat().join(', ');
        throw new Error(messages || 'Registration failed');
      }
      await loginUser(user.email, user.password);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginUser(loginData.email, loginData.password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  // --- UI Rendering ---
  if (isRegistered === null) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.header}>Welcome to AgriNet</h2>
          <p style={styles.subtitle}>Are you already registered?</p>
          <div style={styles.toggleButtons}>
            <button style={styles.button} onClick={() => setIsRegistered(true)}>Yes, Login</button>
            <button style={styles.button} onClick={() => setIsRegistered(false)}>No, Register</button>
          </div>
        </div>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.header}>Login</h2>
          <form onSubmit={handleLoginSubmit} style={styles.form}>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p style={styles.error}>{error}</p>}
            <p style={styles.switchText}>
              Don't have an account?{' '}
              <span style={styles.link} onClick={() => setIsRegistered(false)}>Register here</span>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Registration form
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.header}>Register</h2>
        <form onSubmit={handleRegisterSubmit} style={styles.form}>
          <input style={styles.input} name="firstName" placeholder="First Name" value={user.firstName} onChange={handleUserChange} required />
          <input style={styles.input} name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleUserChange} required />
          <input style={styles.input} type="email" name="email" placeholder="Email" value={user.email} onChange={handleUserChange} required />
          <input style={styles.input} type="password" name="password" placeholder="Password" value={user.password} onChange={handleUserChange} required />
          <input style={styles.input} name="phoneNumber" placeholder="Phone Number" value={user.phoneNumber} onChange={handleUserChange} required />
          <select style={styles.select} name="role" value={user.role} onChange={handleUserChange} required>
            <option value="">Select Role</option>
            <option value="FARMER">FARMER</option>
            <option value="AGRIMECHANIC">EXPERT</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <p style={styles.error}>{error}</p>}
          <p style={styles.switchText}>
            Already registered?{' '}
            <span style={styles.link} onClick={() => setIsRegistered(true)}>Login here</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(/Logo.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    maxWidth: 420,
    width: '100%',
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // slight transparency over bg
    borderRadius: 10,
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
  },
  header: { textAlign: 'center', marginBottom: 20, color: '#1976d2' },
  subtitle: { textAlign: 'center', fontSize: 16, marginBottom: 30 },
  toggleButtons: { display: 'flex', justifyContent: 'center', gap: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: 15 },
  input: {
    padding: 12,
    border: '1px solid #ccc',
    borderRadius: 6,
    fontSize: 14,
  },
  select: {
    padding: 12,
    border: '1px solid #ccc',
    borderRadius: 6,
    fontSize: 14,
  },
  submitButton: {
    padding: 12,
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: { color: 'red', textAlign: 'center', marginTop: 10 },
  switchText: { textAlign: 'center', fontSize: 14, marginTop: 10 },
  link: { color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' },
  button: {
    padding: '10px 18px',
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#1976d2',
    color: '#fff',
    fontSize: 14,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};
