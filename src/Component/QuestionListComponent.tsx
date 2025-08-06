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
  onQuestionPosted: () => void;
}


const QuestionListComponent: React.FC<QuestionListProps> = ({ refreshFlag }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const API_URL = 'https://localhost:5001/api/questions';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: Question, b: Question) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setQuestions(sorted);
      })
      .catch((err) => console.error('Failed to load questions', err));
  }, [refreshFlag]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Latest Questions</h2>
      {questions.map((question) => (
        <div key={question.id} style={styles.questionCard}>
          <h3>{question.title}</h3>
          <p>{question.body}</p>
          <p style={styles.dateText}>Posted on: {new Date(question.createdAt).toLocaleString()}</p>

          {/* Comment Component */}
          <CommentComponent questionId={question.id} />
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',
  },
  questionCard: {
    padding: '15px',
    backgroundColor: '#fff',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  dateText: {
    fontSize: '0.85rem',
    color: '#777',
  },
};

export default QuestionListComponent;
