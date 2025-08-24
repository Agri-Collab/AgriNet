import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdvertisementPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can send data to admin via API or email
    alert(`Message sent:\nName: ${name}\nProduct: ${product}\nMessage: ${message}`);
    
    setName('');
    setProduct('');
    setMessage('');

    navigate('/'); // Redirect back to homepage
  };

  return (
    <div style={styles.container}>
      <h2>Advertise Your Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Product Name"
          value={product}
          onChange={e => setProduct(e.target.value)}
          required
        />
        <textarea
          placeholder="Message to Admin"
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default AdvertisementPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '80vh',
    backgroundColor: '#f8f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: 400,
  },
  input: {
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 16,
  },
  textarea: {
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 16,
    minHeight: 100,
    resize: 'vertical',
  },
  button: {
    padding: 10,
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16,
  },
};
