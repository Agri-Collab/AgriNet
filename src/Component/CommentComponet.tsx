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

const CommentComponent: React.FC<CommentSectionProps> = ({ questionId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const API_URL = 'https://localhost:5001/api/comments';

  useEffect(() => {
    if (showComments) {
      fetch(`${API_URL}/question/${questionId}`)
        .then((res) => res.json())
        .then((data) => setComments(data))
        .catch((err) => console.error('Failed to load comments', err));
    }
  }, [showComments, questionId]);

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
        headers: {
          'Content-Type': 'application/json',
        },
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
      <button style={styles.button} onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'View Comments'}
      </button>

      {showComments && (
        <div>
          <h4>Comments</h4>
          <ul style={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment.id} style={styles.commentItem}>
                {comment.content} <span style={styles.date}>{new Date(comment.createdAt).toLocaleString()}</span>
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
    marginTop: '10px',
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  commentList: {
    listStyleType: 'none',
    padding: 0,
  },
  commentItem: {
    padding: '6px 0',
    borderBottom: '1px solid #eee',
  },
  form: {
    marginTop: '10px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    resize: 'vertical',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  submitBtn: {
    marginTop: '6px',
    padding: '6px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  date: {
    display: 'block',
    fontSize: '0.75em',
    color: '#777',
    marginTop: '4px',
  },
};

export default CommentComponent;
