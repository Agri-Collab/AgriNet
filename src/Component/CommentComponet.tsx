import React, { useEffect, useState } from 'react';

interface Comment {
  id: number;
  content: string;
  userId: number;
  questionId: number;
  createdAt: string;
}

interface CommentSectionProps {
  questionId: number;
}

// Helper for relative time
const timeAgo = (dateString: string) => {
  const now = new Date();
  const posted = new Date(dateString);
  const diff = now.getTime() - posted.getTime(); 
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
};

const CommentComponent: React.FC<CommentSectionProps> = ({ questionId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const API_URL = 'https://localhost:5001/api/comments';

  // Fetch comments on mount to get the count
  useEffect(() => {
    fetch(`${API_URL}/question/${questionId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error('Failed to load comments', err));
  }, [questionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      content: newComment,
      userId: 1,
      questionId: questionId,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        setNewComment('');
        const created = await response.json();
        setComments([...comments, created]);
      }
    } catch (err) {
      console.error('Failed to post comment', err);
    }
  };

  return (
    <div style={styles.commentContainer}>
      <button
        style={styles.toggleButton}
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? 'Hide Comments' : `View Comments (${comments.length})`}
      </button>

      {showComments && (
        <div>
          <ul style={styles.commentList}>
            {comments.map((comment) => (
              <li
                key={comment.id}
                style={styles.commentItem}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
              >
                <p style={styles.content}>{comment.content}</p>
                <span style={styles.date}>{timeAgo(comment.createdAt)}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} style={styles.form}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              style={styles.textarea}
            />
            <button type="submit" style={styles.submitBtn}>Post Comment</button>
          </form>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  commentContainer: {
    marginTop: '12px',
  },
  toggleButton: {
    padding: '6px 14px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 500,
    marginBottom: 12,
  },
  commentList: {
    listStyleType: 'none',
    padding: 0,
  },
  commentItem: {
    padding: '12px 16px',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 6,
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'background-color 0.2s',
  },
  content: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#222',
  },
  date: {
    display: 'block',
    fontSize: '0.75rem',
    color: '#777',
    marginTop: 6,
  },
  form: {
    marginTop: 12,
  },
  textarea: {
    width: '100%',
    padding: 8,
    resize: 'vertical',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: '0.95rem',
  },
  submitBtn: {
    marginTop: 6,
    padding: '6px 14px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 500,
  },
};

export default CommentComponent;
