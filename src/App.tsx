import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserForm from './UserForm';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import QuestionPage from './pages/QuestionPage';
import ChatbotPage from './pages/ChatbotPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/articles" element={<ArticlePage />} />
      <Route path="/questions/new" element={<QuestionPage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
    </Routes>
  );
};

export default App;
