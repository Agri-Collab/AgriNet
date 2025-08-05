import React, { useState } from 'react';

interface ChatEntry {
  id: number;
  userMessage: string;
  botReply: string;
}

const ChatbotComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);

  const handleAsk = () => {
    if (userInput.trim() === '') return;

    const botReply = generateBotReply(userInput);
    const newEntry: ChatEntry = {
      id: Date.now(),
      userMessage: userInput,
      botReply,
    };

    setChatHistory([...chatHistory, newEntry]);
    setUserInput('');
  };

  const generateBotReply = (input: string): string => {
    if (input.toLowerCase().includes('hello')) return 'Hi there!';
    if (input.toLowerCase().includes('help')) return 'How can I assist you?';
    return "I'm just a dummy bot 🤖";
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: 16,
    },
    input: {
      width: '100%',
      padding: 8,
      marginBottom: 8,
      borderRadius: 4,
      border: '1px solid #ccc',
      fontSize: '1rem',
    },
    button: {
      padding: '8px 16px',
      fontSize: '1rem',
      backgroundColor: '#6c63ff',
      color: 'white',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      marginBottom: 12,
    },
    chatBox: {
      backgroundColor: '#f4f4f4',
      padding: 10,
      borderRadius: 4,
      maxHeight: 200,
      overflowY: 'auto' as React.CSSProperties['overflowY'],
    },
    entry: {
      backgroundColor: 'white',
      padding: 6,
      borderRadius: 4,
      marginBottom: 10,
    },
  };

  return (
    <div style={styles.container}>
      <h2>🤖 Chatbot</h2>

      <input
        type="text"
        placeholder="Ask the bot something..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleAsk} style={styles.button}>
        Send
      </button>

      <div style={styles.chatBox}>
        {chatHistory.map((entry) => (
          <div key={entry.id} style={styles.entry}>
            <p>
              <strong>You:</strong> {entry.userMessage}
            </p>
            <p>
              <strong>Bot:</strong> {entry.botReply}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotComponent;
