import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionComponent from '../Component/QuestionComponent';
import HeaderComponent from '../Component/HeaderComponent';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <HeaderComponent />

      <div style={styles.page}>
        <div style={styles.leftColumn}>
          <button style={styles.navButton} onClick={() => navigate('/articles')}>
            Articles
          </button>

          <button style={styles.navButton} onClick={() => navigate('/questions/new')}>
            Ask Question
          </button>

          <button style={styles.navButton} onClick={() => navigate('/chatbot')}>
            Chatbot
          </button>
        </div>

        <div style={styles.centerColumn}>
          <QuestionComponent showForm={false} />
        </div>

        <div style={styles.rightColumn}></div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif',
  },
  page: {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  leftColumn: {
    width: '25%',
    backgroundColor: '#f4f4f4',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    overflowY: 'auto',
    alignItems: 'stretch',
  },
  centerColumn: {
    width: '50%',
    backgroundColor: '#fff',
    padding: 20,
    overflowY: 'auto',
  },
  rightColumn: {
    width: '25%',
    backgroundColor: '#fafafa',
    padding: 20,
    overflowY: 'auto',
  },
  navButton: {
    padding: '12px 20px',
    fontSize: '1rem',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    width: '100%',
    textAlign: 'center',
  },
};

export default HomePage;
