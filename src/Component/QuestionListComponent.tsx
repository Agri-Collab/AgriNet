import React, { useEffect, useState } from 'react';
import CommentComponent from '../Component/CommentComponet';

interface Question {
  id: number;
  title: string;
  body: string;
  userId: number;
  userRole?: string;
  userFirstName?: string;
  userLastName?: string;
  createdAt: string;
}

interface QuestionListProps {
  refreshFlag: boolean;
  searchQuery: string;
}

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

const QuestionListComponent: React.FC<QuestionListProps> = ({ refreshFlag, searchQuery }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const API_URL = 'https://localhost:5001/api/questions';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch all questions
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Question[] = await res.json();

        // Cache to avoid multiple requests for same user
        const userCache: { [key: number]: { Name: string; Surname: string; Roles?: string[] } } = {};

        const questionsWithUsers = await Promise.all(
          data.map(async (q) => {
            if (userCache[q.userId]) {
              const cached = userCache[q.userId];
              return {
                ...q,
                userFirstName: cached.Name,
                userLastName: cached.Surname,
                userRole: Array.isArray(cached.Roles) ? cached.Roles[0] || '' : '',
              };
            }

            try {
              const userRes = await fetch(`https://localhost:5001/api/users/${q.userId}`);
              if (!userRes.ok) throw new Error(`User fetch error! status: ${userRes.status}`);
              const userData = await userRes.json();

              userCache[q.userId] = userData;

              return {
                ...q,
                userFirstName: userData.Name || '',
                userLastName: userData.Surname || '',
                userRole: Array.isArray(userData.Roles) ? userData.Roles[0] || '' : '',
              };
            } catch (err) {
              console.error(`Error fetching user for question ${q.id}:`, err);
              return { ...q, userFirstName: '', userLastName: '', userRole: '' };
            }
          })
        );

        // Sort by newest first
        questionsWithUsers.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setQuestions(questionsWithUsers);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
        setQuestions([]);
      }
    };

    fetchQuestions();
  }, [refreshFlag]);

  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const truncate = (text: string, max = 200) => (text.length <= max ? text : text.slice(0, max));

  return (
    <div style={styles.container}>
      {filteredQuestions.length === 0 && <p style={styles.noQuestions}>No questions found.</p>}
      {filteredQuestions.map((q) => {
        const isExpanded = expandedIds.has(q.id);
        const shouldTruncate = q.body.length > 200;

        return (
          <div
            key={q.id}
            style={styles.questionCard}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
          >
            <div style={styles.meta}>
              <span style={styles.roleText}>
                {q.userFirstName} {q.userLastName} {q.userRole && `(${q.userRole})`}
              </span>
              <span style={styles.dateText}>{timeAgo(q.createdAt)}</span>
            </div>
            <h3 style={styles.title}>{q.title}</h3>
            <p style={styles.body}>
              {isExpanded || !shouldTruncate ? q.body : truncate(q.body) + '...'}
              {shouldTruncate && (
                <span style={styles.readMore} onClick={() => toggleExpand(q.id)}>
                  {isExpanded ? ' Read Less' : ' Read More'}
                </span>
              )}
            </p>
            <CommentComponent questionId={q.id} />
          </div>
        );
      })}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px' },
  noQuestions: { textAlign: 'center', color: '#555', fontStyle: 'italic', marginTop: 20 },
  questionCard: {
    padding: '18px 20px',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 6,
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'background-color 0.2s, box-shadow 0.2s, transform 0.2s',
    cursor: 'pointer',
  },
  meta: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 },
  dateText: { fontSize: '0.85rem', color: '#777' },
  roleText: { fontSize: '0.85rem', color: '#555', fontWeight: 500 },
  title: { fontSize: '1.2rem', fontWeight: 600, color: '#333', marginBottom: 6 },
  body: { fontSize: '1rem', color: '#222', marginBottom: 12, lineHeight: 1.5, whiteSpace: 'pre-wrap' },
  readMore: { color: '#007bff', cursor: 'pointer', marginLeft: 4, fontWeight: 500 },
};

export default QuestionListComponent;
