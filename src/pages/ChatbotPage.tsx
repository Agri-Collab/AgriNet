import React from 'react';
import ChatbotComponent from '../Component/ChatbotComponent';

const ChatbotPage = () => {
  return (
    <div style={styles.container}>
      <h2>Chatbot Assistant</h2>
      <ChatbotComponent />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 20,
    maxWidth: 800,
    margin: '0 auto',
  },
};

export default ChatbotPage;
