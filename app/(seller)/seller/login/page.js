'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerLogin() {
  const [username, setUsername] = useState('Admin123');
  const [password, setPassword] = useState('password123');
  const router = useRouter();

  const handleLogin = () => {
    console.log('Logging in as seller:', { username, password });
    router.push('/seller/home'); 
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Admin Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={inputStyle}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={inputStyle}
      />
      <button onClick={handleLogin} style={buttonStyle}>Login</button>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  marginBottom: '1rem',
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '0.6rem 2rem',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1rem',
  cursor: 'pointer',
};
