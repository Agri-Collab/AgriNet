import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Component/HeaderComponent';
import ArticleListComponent from '../Component/ArticleListComponent';
import ArticleComponent from '../Component/ArticleComponent';

// Sidebar Button component
interface SidebarButtonProps {
  text: string;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ text, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.sidebarButton,
        backgroundColor: hover ? '#e1ecf4' : '#f8f9f9',
        color: hover ? '#0a95ff' : '#0074cc',
        borderColor: hover ? '#7aa7c7' : 'transparent',
      }}
    >
      {text}
    </button>
  );
};

const ArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const [refreshArticles, setRefreshArticles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleArticlePosted = () => setRefreshArticles(prev => !prev);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.stickyHeader}>
        <HeaderComponent onSearch={setSearchQuery} placeholder="Search articles..." />
      </div>

      <div style={styles.page}>
        {/* Sidebar */}
        <div style={styles.stickySidebar}>
          <h3 style={styles.sidebarHeading}>📝 Articles</h3>
          <SidebarButton text="Post Article" onClick={() => setShowModal(true)} />
          <SidebarButton text="Go to Questions" onClick={() => navigate('/home')} />
        </div>

        {/* Center Column */}
        <div style={styles.centerColumn}>
          <ArticleListComponent refreshFlag={refreshArticles} searchQuery={searchQuery} />
        </div>

        {/* Right Column (optional) */}
        <div style={styles.rightColumn}>{/* Ads, Chat, etc. */}</div>
      </div>

      {/* Article Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.modalCloseButton} onClick={() => setShowModal(false)}>
              ×
            </button>
            <ArticleComponent
              onArticlePosted={() => {
                handleArticlePosted();
                setShowModal(false);
              }}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    width: '100vw',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f8f9f9',
    color: '#232629',
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
    backgroundColor: '#ffffff',
  },
  page: {
    display: 'flex',
    marginTop: 0,
    height: 'calc(100vh - 60px)',
  },
  stickySidebar: {
    width: 300,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    borderRight: '1px solid #e3e6e8',
    backgroundColor: '#fdfdfd',
    position: 'sticky',
    top: 60,
    height: 'calc(100vh - 60px)',
    overflowY: 'auto',
    borderRadius: '0 8px 8px 0',
  },
  centerColumn: {
    flex: 1,
    padding: 24,
    margin: 16,
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    maxHeight: 'calc(100vh - 32px)',
  },
  rightColumn: {
    width: 250,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    maxHeight: 'calc(100vh - 32px)',
    overflowY: 'auto',
  },
  sidebarHeading: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
    borderBottom: '1px solid #e3e6e8',
    paddingBottom: 6,
  },
  sidebarButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: '#f8f9f9',
    color: '#0074cc',
    border: '1px solid transparent',
    borderRadius: 4,
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    transition: 'all 0.2s ease-in-out',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    width: 500,
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    position: 'relative',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 22,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
};
