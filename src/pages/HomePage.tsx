import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaNewspaper, FaQuestionCircle, FaRobot, FaStar, FaQuestion } from 'react-icons/fa';
import HeaderComponent from '../Component/HeaderComponent';
import QuestionComponent from '../Component/QuestionComponent';
import QuestionListComponent from '../Component/QuestionListComponent';
import AdvertisementComponent from '../Component/AdvertisementComponent';

interface SidebarButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, text, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        fontSize: 14,
        fontWeight: 500,
        backgroundColor: hover ? '#e3f2fd' : 'transparent',
        color: '#222',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        transition: 'background-color 0.2s',
      }}
    >
      <span style={{ fontSize: 18, color: hover ? '#1976d2' : '#555' }}>{icon}</span>
      {text}
    </button>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuestionPosted = () => setRefreshFlag(prev => !prev);

  return (
    <div style={styles.container}>
      {/* Header */}
      <HeaderComponent onSearch={setSearchQuery} />

      <div style={styles.page}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <SidebarButton icon={<FaNewspaper />} text="Articles" onClick={() => navigate('/articles')} />
          <SidebarButton icon={<FaQuestionCircle />} text="Ask Question" onClick={() => setShowQuestionModal(true)} />
          <SidebarButton icon={<FaRobot />} text="Chatbot" onClick={() => navigate('/chatbot')} />
          <SidebarButton icon={<FaStar />} text="Subscribe Premium" onClick={() => {}} />
          <SidebarButton icon={<FaStar />} text="Advertise" onClick={() => setShowAdModal(true)} />
          <SidebarButton icon={<FaQuestion />} text="FAQ" onClick={() => navigate('/faq')} />
        </div>

        {/* Center Column */}
        <div style={styles.centerColumn}>
          <QuestionListComponent refreshFlag={refreshFlag} searchQuery={searchQuery} />
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {!showAdModal && <AdvertisementComponent mini />} {/* static mini ad */}
        </div>
      </div>

      {/* Question Modal */}
      {showQuestionModal && (
        <QuestionComponent
          onClose={() => setShowQuestionModal(false)}
          onQuestionPosted={handleQuestionPosted}
        />
      )}

      {/* Advertisement Modal */}
      {showAdModal && (
        <AdvertisementComponent onClose={() => setShowAdModal(false)} />
      )}
    </div>
  );
};

export default HomePage;

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f8f9f9',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
  },
  page: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: 200,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    borderRight: '1px solid #ddd',
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0,
    height: '100vh',
  },
  centerColumn: {
    flex: 1,
    padding: 24,
    margin: 16,
    overflowY: 'auto',
    backgroundColor: '#fff',
    borderRadius: 6,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  rightColumn: {
    width: 250,
    padding: 16,
    margin: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    height: '100vh',
  },
};
