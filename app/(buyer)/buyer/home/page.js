'use client';

import { useState, useEffect } from 'react';

export default function BuyerHome() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const storedBlogs = localStorage.getItem('sellerBlogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>User Home Page</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#ff4d4f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Logout
        </button>
      </header>

      <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
        Welcome, User! You are successfully logged in.
      </p>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Admin Blogs</h2>

        {blogs.length === 0 ? (
          <p>No blogs available at the moment.</p>
        ) : (
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              overflowX: 'auto',
              paddingBottom: '1rem',
            }}
          >
            {blogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  minWidth: '300px',
                  maxWidth: '300px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                  padding: '1rem',
                  flexShrink: 0,
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem' }}>{blog.title}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{blog.content}</p>

                {blog.image && (
                  <img
                    src={blog.image}
                    alt="Blog visual"
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      marginTop: '0.75rem',
                      borderRadius: '4px',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
