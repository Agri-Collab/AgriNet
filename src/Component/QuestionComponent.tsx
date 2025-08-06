import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuestionComponentProps {
  onClose: () => void;
  onQuestionPosted: () => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ onClose, onQuestionPosted }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newQuestion = {
      title,
      body,
      userId: 1,
    };

    try {
      const res = await fetch('https://localhost:5001/api/questions/Create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
      });

      if (res.ok) {
        alert('Question posted successfully!');
        onQuestionPosted();
        onClose();
      } else {
        alert('Failed to post question');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error posting question');
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.container}>
        <h2>Ask a Question</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
            autoFocus
          />
          <textarea
            placeholder="Enter question details"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            style={styles.textarea}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button type="button" onClick={handleCancel} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" style={styles.button}>
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    width: '75vw',
    height: '75vh',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    flexGrow: 1,
  },
  input: {
    padding: 14,
    fontSize: 17,
    borderRadius: 8,
    border: '1.5px solid #ccc',
    outline: 'none',
  },
  textarea: {
    padding: 14,
    fontSize: 17,
    borderRadius: 8,
    border: '1.5px solid #ccc',
    resize: 'none',
    minHeight: 140,
    outline: 'none',
  },
  button: {
  padding: '14px 24px',
  fontSize: 17,
  fontWeight: 600,
  backgroundColor: 'transparent',
  color: '#007bff',
  border: 'none',
  borderRadius: 10,
  cursor: 'pointer',
},
  cancelButton: {
    padding: '14px 24px',
    fontSize: 17,
    fontWeight: 600,
    backgroundColor: '#ccc',
    color: '#333',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
  },
};

export default QuestionComponent;
