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
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null); // null = ask question
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Registration state
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
  });

  // Login state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://localhost:5001/api/users/Create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorJson = await response.json();
        const messages = Object.values(errorJson.errors || {}).flat().join(', ');
        throw new Error(messages || 'Registration failed');
      }

      // Auto-login after registration
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

  const loginUser = async (email: string, password: string) => {
    const loginResponse = await fetch('https://localhost:5001/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!loginResponse.ok) {
      throw new Error('Invalid email or password');
    }

    const loginData = await loginResponse.json();
    localStorage.setItem('token', loginData.token);
    navigate('/home');
  };

  if (isRegistered === null) {
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Welcome</h2>
        <p style={{ textAlign: 'center', fontSize: 18 }}>Are you already registered?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 30 }}>
          <button style={styles.button} onClick={() => setIsRegistered(true)}>
            Yes, Login
          </button>
          <button style={styles.button} onClick={() => setIsRegistered(false)}>
            No, Register
          </button>
        </div>
      </div>
    );
  }

  if (isRegistered) {
    // Login form
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Login</h2>
        <form onSubmit={handleLoginSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            placeholder="Email"
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p style={styles.error}>{error}</p>}
          <p style={{ marginTop: 15 }}>
            Don't have an account?{' '}
            <span style={styles.link} onClick={() => setIsRegistered(false)}>
              Register here
            </span>
          </p>
        </form>
      </div>
    );
  }

  // Registration form
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Register</h2>
      <form onSubmit={handleRegisterSubmit} style={styles.form}>
        <input
          style={styles.input}
          name="firstName"
          value={user.firstName}
          onChange={handleUserChange}
          placeholder="First Name"
          required
        />
        <input
          style={styles.input}
          name="lastName"
          value={user.lastName}
          onChange={handleUserChange}
          placeholder="Last Name"
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          value={user.email}
          onChange={handleUserChange}
          placeholder="Email"
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          value={user.password}
          onChange={handleUserChange}
          placeholder="Password"
          required
        />
        <input
          style={styles.input}
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleUserChange}
          placeholder="Phone Number"
          required
        />
        <select
          style={styles.select}
          name="role"
          value={user.role}
          onChange={handleUserChange}
          required
        >
          <option value="">Select Role</option>
          <option value="FARMER">FARMER</option>
          <option value="AGRIMECHANIC">AGRIMECHANIC</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
        <p style={{ marginTop: 15 }}>
          Already registered?{' '}
          <span style={styles.link} onClick={() => setIsRegistered(true)}>
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 500,
    margin: '50px auto',
    padding: 30,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  select: {
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    padding: 12,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    fontSize: 16,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default UserForm;
