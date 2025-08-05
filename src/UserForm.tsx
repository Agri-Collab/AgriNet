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
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        throw new Error(messages || 'Submission failed');
      }

      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create New User</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          style={styles.input}
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          style={styles.input}
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <select
          style={styles.select}
          name="role"
          value={user.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="FARMER">FARMER</option>
          <option value="AGRIMECHANIC">AGRIMECHANIC</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {error && <p style={styles.error}>{error}</p>}
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
};

export default UserForm;
