import React, { useState } from 'react';

interface AdvertisementComponentProps {
  onClose?: () => void; 
  mini?: boolean;  
}

const AdvertisementComponent: React.FC<AdvertisementComponentProps> = ({ onClose, mini = false }) => {
  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Advertisement request:', { name, product, message });
    setSubmitted(true);
    setName('');
    setProduct('');
    setMessage('');
  };

  if (mini) {
    return (
      <div style={miniStyles.container}>
        <h4>Advertise Here!</h4>
        <p>Click "Advertise" in the sidebar to promote your product.</p>
      </div>
    );
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.container}>
        {!submitted ? (
          <>
            <h2>Advertise Your Product</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required style={styles.input} autoFocus />
              <input placeholder="Product Name" value={product} onChange={e => setProduct(e.target.value)} required style={styles.input} />
              <textarea placeholder="Message to Admin" value={message} onChange={e => setMessage(e.target.value)} required style={styles.textarea} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
                <button type="submit" style={styles.button}>Send Request</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2>Request Sent!</h2>
            <p>Your advertisement request has been noted. The admin will contact you soon.</p>
            <button onClick={onClose} style={styles.button}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdvertisementComponent;

const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc', outline: 'none' },
  textarea: { padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc', resize: 'none', minHeight: 120, outline: 'none' },
  button: { padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
  cancelButton: { padding: '10px 20px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: 6, cursor: 'pointer' },
};

const miniStyles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 14,
  },
};
