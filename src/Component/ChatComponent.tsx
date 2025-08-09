import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

interface ChatComponentProps {
  currentUserId: number;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ currentUserId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch users
  useEffect(() => {
    fetch('https://localhost:5001/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch(console.error);
  }, []);

  // Fetch messages with selected user
  useEffect(() => {
    if (!selectedUser) return;

    fetch(`https://localhost:5001/api/PrivateMessage/chat/${currentUserId}/${selectedUser.id}`)
      .then((res) => res.json())
      .then(setMessages)
      .catch(console.error);
  }, [selectedUser]);

  // Send message
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const messagePayload = {
      chatId: 0, // optional, depends on backend
      senderId: currentUserId,
      receiverId: selectedUser.id,
      content: newMessage,
    };

    try {
      const res = await fetch('https://localhost:5001/api/PrivateMessage/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messagePayload),
      });

      if (res.ok) {
        const sentMessage = await res.json();
        setMessages((prev) => [...prev, sentMessage]);
        setNewMessage('');
      } else {
        console.error('Failed to send message');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3>Users</h3>
        {users
          .filter((user) => user.id !== currentUserId)
          .map((user) => (
            <div
              key={user.id}
              style={{
                ...styles.userItem,
                backgroundColor: selectedUser?.id === user.id ? '#ddd' : 'transparent',
              }}
              onClick={() => setSelectedUser(user)}
            >
              {user.firstName} {user.lastName}
            </div>
          ))}
      </div>

      <div style={styles.chatArea}>
        {selectedUser ? (
          <>
            <h3>Chat with {selectedUser.firstName}</h3>
            <div style={styles.messages}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    ...styles.message,
                    alignSelf: msg.senderId === currentUserId ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.senderId === currentUserId ? '#dcf8c6' : '#f1f1f1',
                  }}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <div style={styles.inputContainer}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={styles.input}
                placeholder="Type your message"
              />
              <button onClick={handleSend} style={styles.sendButton}>
                Send
              </button>
            </div>
          </>
        ) : (
          <p style={{ padding: 20 }}>Select a user to start chatting.</p>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    width: '90%',
    height: '80vh',
    border: '1px solid #ccc',
    borderRadius: 8,
    margin: '30px auto',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '25%',
    borderRight: '1px solid #ccc',
    padding: 15,
    overflowY: 'auto',
  },
  userItem: {
    padding: 10,
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
  },
  chatArea: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  messages: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '60%',
    margin: '5px 0',
  },
  inputContainer: {
    display: 'flex',
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
};

export default ChatComponent;
