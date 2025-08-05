import React, { useState } from 'react';

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
}

const ChatComponent = () => {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = () => {
    if (sender.trim() === '' || message.trim() === '') return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender,
      message,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
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
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      marginBottom: 12,
    },
    chatBox: {
      maxHeight: 200,
      overflowY: 'auto' as React.CSSProperties['overflowY'],
      backgroundColor: '#f1f1f1',
      padding: 10,
      borderRadius: 4,
    },
    message: {
      marginBottom: 8,
      backgroundColor: 'white',
      padding: 6,
      borderRadius: 4,
    },
  };

  return (
    <div style={styles.container}>
      <h2>💬 Private Chat</h2>

      <input
        type="text"
        placeholder="Your name"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSend} style={styles.button}>
        Send
      </button>

      <div style={styles.chatBox}>
        {messages.map((msg) => (
          <div key={msg.id} style={styles.message}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
