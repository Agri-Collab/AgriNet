import React, { useEffect, useState } from 'react';
import CommentComponent from '../Component/CommentComponet';

interface Question {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
}

interface QuestionListProps {
  refreshFlag: boolean;
  searchQuery: string;
}


const QuestionListComponent: React.FC<QuestionListProps> = ({ refreshFlag, searchQuery }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const API_URL = 'https://localhost:5001/api/questions'; 

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: Question, b: Question) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setQuestions(sorted);
      })
      .catch((err) => console.error('Failed to load questions', err));
  }, [refreshFlag]);

  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Latest Questions</h2>
      {filteredQuestions.map((q) => (
        <div key={q.id} style={styles.questionCard}>
          <h3>{q.title}</h3>
          <p>{q.body}</p>
          <p style={styles.dateText}>
            Posted on: {new Date(q.createdAt).toLocaleString()}
          </p>
          <CommentComponent questionId={q.id} />
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { width: '100%', maxWidth: '700px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  heading: { textAlign: 'center', marginBottom: 20, fontSize: '1.5rem', color: '#333' },
  questionCard: { padding: 15, backgroundColor: '#fff', marginBottom: 20, borderRadius: 8, border: '1px solid #ddd' },
  dateText: { fontSize: 0.85 + 'rem', color: '#777' },
};

export default QuestionListComponent;
