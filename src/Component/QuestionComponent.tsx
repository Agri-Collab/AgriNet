import React, { useState } from 'react';

interface QuestionComponentProps {
  onClose: () => void;
  onQuestionPosted: () => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ onClose, onQuestionPosted }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newQuestion = { title, body, userId: 1 };

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
      } else alert('Failed to post question');
    } catch (err) {
      console.error(err);
      alert('Error posting question');
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.container}>
        <h2>Ask a Question</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            placeholder="Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
            style={styles.input} 
            autoFocus 
          />
          <textarea 
            placeholder="Details" 
            value={body} 
            onChange={e => setBody(e.target.value)} 
            required 
            style={styles.textarea} 
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
            <button type="submit" style={styles.button}>Post Question</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: { 
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
    backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 
  },
  container: { 
    width: '50%', backgroundColor: '#fff', borderRadius: 12, padding: 20, 
    display: 'flex', flexDirection: 'column', gap: 16 
  },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc', outline: 'none' },
  textarea: { padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc', resize: 'none', minHeight: 120, outline: 'none' },
  button: { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
  cancelButton: { padding: '10px 20px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: 6, cursor: 'pointer' },
};

export default QuestionComponent;
