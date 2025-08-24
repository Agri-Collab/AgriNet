import React, { useState } from 'react';

interface ArticleComponentProps {
  onClose: () => void;
  onArticlePosted: () => void;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({ onClose, onArticlePosted }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newArticle = {
      title: title,
      content: body, 
      userId: 1, 
    };

    try {
      const res = await fetch('https://localhost:5001/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle),
      });

      if (res.ok) {
        alert('Article posted successfully!');
        onArticlePosted();
        onClose(); 
        setTitle('');
        setBody('');
      } else {
        const errorText = await res.text();
        alert('Failed to post article: ' + errorText);
      }
    } catch (err) {
      console.error(err);
      alert('Error posting article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <h2 style={{ marginBottom: 12 }}>📝 Post New Article</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
            autoFocus
          />
          <textarea
            placeholder="Content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            style={styles.textarea}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? 'Posting...' : 'Post Article'}
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
    zIndex: 2000,
  },
  modalContainer: {
    width: '500px',
    maxHeight: '90vh',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    overflowY: 'auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    position: 'relative',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    outline: 'none',
  },
  textarea: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    resize: 'none',
    minHeight: 120,
    outline: 'none',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#ccc',
    color: '#333',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default ArticleComponent;
