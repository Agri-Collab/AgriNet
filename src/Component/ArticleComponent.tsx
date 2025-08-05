import React, { useState } from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
  userId: number;
}

interface ArticleComponentProps {
  onArticlePosted: () => void; 
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({ onArticlePosted }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title.trim() || !content.trim() || userId === '') {
      setError('Please fill all fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://localhost:5001/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, userId }),
      });

      if (!response.ok) {
        const text = await response.text();
        setError(`Failed to post article: ${text}`);
        setLoading(false);
        return;
      }
      
      setTitle('');
      setContent('');
      setUserId('');
      setError(null);
      setLoading(false);


      onArticlePosted();
    } catch {
      setError('Failed to post article.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>📚 Post a New Article</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
        maxLength={250}
      />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        style={styles.textarea}
      />
      <br />

      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value) || '')}
        style={styles.input}
      />
      <br />

      <button onClick={handlePost} style={styles.button} disabled={loading}>
        {loading ? 'Posting...' : 'Post Article'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    fontSize: '1rem',
    borderRadius: 4,
    border: '1px solid #ccc',
    marginBottom: 8,
  },
  textarea: {
    width: '100%',
    padding: 10,
    fontSize: '1rem',
    borderRadius: 4,
    border: '1px solid #ccc',
    marginBottom: 8,
  },
  button: {
    padding: '8px 16px',
    fontSize: '1rem',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

export default ArticleComponent;
