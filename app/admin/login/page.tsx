'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      username,
      password,
      callbackUrl: '/admin',
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid username or password');
    } else if (result?.url) {
      window.location.href = result.url;
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-base)',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'var(--grad-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '12px',
            }}
          >
            BP
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Admin Access
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              width: '100%',
              outline: 'none',
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              width: '100%',
              outline: 'none',
            }}
          />

          {error && (
            <p style={{ color: '#ff4444', fontSize: '14px', margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'var(--grad-primary)',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontWeight: '700',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              width: '100%',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
