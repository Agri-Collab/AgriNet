import React, { useState } from 'react';
import HeaderComponent from '../Component/HeaderComponent';
import QuestionListComponent from '../Component/QuestionListComponent';
import QuestionComponent from '../Component/QuestionComponent';

const QuestionPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleQuestionPosted = () => {
    setRefreshFlag(prev => !prev); // Refresh question list after posting
  };

  return (
    <div>
      {/* Header with search input */}
      <HeaderComponent onSearch={setSearchQuery} />

      {/* Button to show modal */}
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 20px', fontSize: 16 }}
        >
          Ask Question
        </button>
      </div>

      {/* List of questions filtered by searchQuery */}
      <QuestionListComponent
        refreshFlag={refreshFlag}
        searchQuery={searchQuery}
      />


      {/* Modal to post a new question */}
      {showModal && (
        <QuestionComponent
          onClose={() => setShowModal(false)}
          onQuestionPosted={handleQuestionPosted}
        />
      )}
    </div>
  );
};

export default QuestionPage;
