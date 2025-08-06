import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Component/HeaderComponent';
import QuestionComponent from '../Component/QuestionComponent';
import QuestionListComponent from '../Component/QuestionListComponent';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleQuestionPosted = () => {
    setRefreshFlag(prev => !prev);
  };

  return (
    <div style={styles.container}>
      <HeaderComponent />

      <div style={styles.page}>
        <div style={styles.leftColumn}>
          <button style={styles.navButton} onClick={() => navigate('/articles')}>
            Articles
          </button>

          <button style={styles.navButton} onClick={() => setShowModal(true)}>
            Ask Question
          </button>

          <button style={styles.navButton} onClick={() => navigate('/chatbot')}>
            Chatbot
          </button>

          <button style={styles.navButton} onClick={() => {}}>
            Subscribe to Premium
          </button>
        </div>

        <div style={styles.centerColumn}>
          <QuestionListComponent refreshFlag={refreshFlag} onQuestionPosted={handleQuestionPosted} />
        </div>

        <div style={styles.rightColumn}></div>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <QuestionComponent
              onClose={() => setShowModal(false)}
              onQuestionPosted={handleQuestionPosted}
            />
          </div>
        </div>
      )}
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
  padding: '14px 24px',
  fontSize: 17,
  fontWeight: 600,
  backgroundColor: 'transparent',
  color: '#007bff',
  border: 'none',
  borderRadius: 10,
  cursor: 'pointer',
  width: '100%',
  textAlign: 'center',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    width: '60%',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
};

export default HomePage;
