import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuestion } from 'react-icons/fa';
import HeaderComponent from '../Component/HeaderComponent';

const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: 'How do I post a question?', answer: 'Click "Ask Question" and fill in the details.' },
    { question: 'How do I advertise my product?', answer: 'Click "Advertise" and submit your request form.' },
    { question: 'Can I edit my questions?', answer: 'Yes, click the edit icon on your question.' },
    { question: 'Is there a premium subscription?', answer: 'Yes, click "Subscribe Premium" to view options.' },
  ];

  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div style={styles.container}>
      {/* Header */}
      <HeaderComponent />

      <div style={styles.page}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <button
            onClick={() => navigate(-1)}
            style={styles.backButton}
          >
            Go to Questions
          </button>
          <div style={styles.sidebarItem}>
            <FaQuestion style={{ marginRight: 8 }} /> FAQs
          </div>
        </div>

        {/* Center Column */}
        <div style={styles.centerColumn}>
          <h2 style={styles.header}>Frequently Asked Questions</h2>
          <div style={styles.faqList}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.faqItem,
                  backgroundColor: openIndex === idx ? '#e3f2fd' : '#fff',
                  boxShadow: openIndex === idx ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)',
                }}
                onClick={() => toggleFAQ(idx)}
              >
                <h4 style={styles.question}>{faq.question}</h4>
                {openIndex === idx && <p style={styles.answer}>{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          <div style={{ padding: 16, color: '#777', fontFamily: 'Segoe UI, sans-serif' }}></div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

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
    gap: 12,
    borderRight: '1px solid #ddd',
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0,
    height: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  backButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    fontWeight: 500,
    fontFamily: 'Segoe UI, sans-serif',
    fontSize: 14,
  },
  sidebarItem: {
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    fontWeight: 500,
    color: '#222',
    fontSize: 14,
    fontFamily: 'Segoe UI, sans-serif',
  },
  centerColumn: {
    flex: 1,
    padding: 24,
    margin: 16,
    overflowY: 'auto',
    backgroundColor: '#fefefe',
    borderRadius: 6,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
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
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#1976d2',
    fontFamily: 'Segoe UI, sans-serif',
    fontSize: 20,
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    fontFamily: 'Segoe UI, sans-serif',
  },
  faqItem: {
    padding: 20,
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Segoe UI, sans-serif',
  },
  question: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    color: '#000000ff',
    fontFamily: 'Segoe UI, sans-serif',
  },
  answer: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 1.5,
    color: '#333',
    fontFamily: 'Segoe UI, sans-serif',
  },
};
