import React from 'react';

const HeaderComponent: React.FC = () => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h2>AgriNet</h2>
        <a href="#about" style={styles.link}>About</a>
      </div>

      <div style={styles.center}>
        <input
          type="text"
          placeholder="Search articles..."
          style={styles.search}
        />
      </div>

      <div style={styles.right}>
        <button style={styles.menuButton}>☰ Menu</button>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#008002ff',
    color: '#fff',
    height: 60,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: 16,
  },
  center: {
    flex: 1,
    textAlign: 'center',
  },
  search: {
    width: '60%',
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: 'none',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    fontSize: 18,
    padding: '6px 12px',
    backgroundColor: '#008002ff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

export default HeaderComponent
