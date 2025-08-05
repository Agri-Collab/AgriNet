import React, { useState } from 'react';
import QuestionComponent from '../Component/QuestionComponent';

const QuestionPage: React.FC = () => {
  const [showForm, setShowForm] = useState(true);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <QuestionComponent showForm={showForm} onCloseForm={() => setShowForm(false)} />
    </div>
  );
};

export default QuestionPage;
