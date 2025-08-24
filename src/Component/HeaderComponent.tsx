import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const HeaderComponent: React.FC<HeaderProps> = ({ onSearch, placeholder }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <header style={styles.header}>
  
      <div style={styles.left}>
        <img src="/Logo.jpeg" alt="Logo" style={styles.logoImg} />
        <h1 style={styles.logoText}>AgriNet</h1>
      </div>


      <div style={styles.center}>
        <input
          type="text"
          placeholder={placeholder || "Search..."}
          style={styles.search}
          onChange={e => onSearch?.(e.target.value)}
        />
      </div>


      <div style={styles.right}>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '8px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: 60,
  },
  left: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: 10 
  },
  logoImg: { 
    height: 40, 
    width: 40, 
    objectFit: 'cover', 
    borderRadius: '50%' 
  },
  logoText: { 
    fontSize: 24, 
    fontWeight: 700, 
    margin: 0, 
    color: '#000000' 
  },
  center: { 
    flex: 1, 
    display: 'flex', 
    justifyContent: 'center' 
  },
  search: {
    width: '50%',
    padding: '6px 10px',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 16,
    outline: 'none',
  },
  right: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: 10 
  },
  logoutButton: {
    padding: '6px 12px',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
  },
};

export default HeaderComponent;
