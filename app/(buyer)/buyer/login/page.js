'use client';
  import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BuyerLogin() {
  const [username, setUsername] = useState('User123');
  const [password, setPassword] = useState('password123');
  const router = useRouter();

  const handleLogin = () => {
    console.log('Logging in:', { username, password });

    router.push('/buyer/home');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>User Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleLogin} style={{ padding: '0.6rem 2rem', background: '#0070f3', color: '#fff' }}>
        Login
      </button>
    </div>
  );
}
