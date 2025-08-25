import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const HeaderComponent: React.FC<{ onSearch?: (query: string) => void; placeholder?: string }> = ({ onSearch, placeholder }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      setMenuOpen(false);
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
          placeholder={placeholder || "Search Question..."}
          style={{ ...styles.search, maxWidth: searchFocused ? 500 : 400 }} // expands on focus
          onChange={e => onSearch?.(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      <div style={styles.right}>
        <button style={styles.menuButton} onClick={() => setMenuOpen(prev => !prev)}>
          ☰
        </button>

        {menuOpen && (
          <div style={styles.menuPanel} ref={menuRef}>
            <MenuItem icon={<FaSignOutAlt />} text="Logout" onClick={handleLogout} />
          </div>
        )}
      </div>
    </header>
  );
};

const MenuItem: React.FC<{ icon: React.ReactNode; text: string; onClick: () => void }> = ({ icon, text, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 16px',
        backgroundColor: hover ? '#f0f4f8' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 500,
        outline: 'none',
        width: '100%',
        color: '#000',
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      {text}
    </button>
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
    padding: '0 16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: 50,
    flexWrap: 'wrap',
  },
  left: { display: 'flex', alignItems: 'center', gap: 8 },
  logoImg: { height: 32, width: 32, objectFit: 'cover', borderRadius: '50%' },
  logoText: { fontSize: 20, fontWeight: 700, margin: 0, color: '#000000' },
  center: { flex: 1, display: 'flex', justifyContent: 'center', minWidth: 150 },
  search: { 
    width: '100%', 
    maxWidth: 400, // base max width
    padding: '6px 8px',
    borderRadius: 4, 
    border: '1px solid #ccc', 
    fontSize: 14, 
    outline: 'none',
    height: 28,
    transition: 'max-width 0.3s ease', // smooth expand
  },
  right: { display: 'flex', alignItems: 'center', position: 'relative' },
  menuButton: { fontSize: 18, padding: '6px 12px', backgroundColor: '#000000', color: '#ffffff', border: 'none', borderRadius: 6, cursor: 'pointer' },
  menuPanel: { 
    position: 'absolute', 
    top: 'calc(100% + 6px)', 
    right: 0, 
    width: 180, 
    backgroundColor: '#fff', 
    boxShadow: '0 6px 18px rgba(0,0,0,0.2)', 
    borderRadius: 8, 
    overflow: 'hidden', 
    display: 'flex', 
    flexDirection: 'column', 
    zIndex: 10 
  },
};

export default HeaderComponent;
