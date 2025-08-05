import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuestionComponentProps {
  showForm: boolean;
  onCloseForm?: () => void; 
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ showForm }) => {
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
        navigate('/home');
      } else {
        alert('Failed to post question');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error posting question');
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  if (!showForm) {
    return null;
  }

  return (
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
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 700,
    margin: '0 auto',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
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
    resize: 'vertical',
    minHeight: 140,
    outline: 'none',
  },
  button: {
    padding: '14px 24px',
    fontSize: 17,
    fontWeight: 600,
    backgroundColor: '#007bff',
    color: '#fff',
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
