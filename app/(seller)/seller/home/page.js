'use client';

import { useState, useEffect } from 'react';

export default function SellerHome() {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImage, setEditImage] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('sellerBlogs');
    if (stored) {
      setBlogs(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sellerBlogs', JSON.stringify(blogs));
  }, [blogs]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setEditImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setEditTitle(blog.title);
    setEditContent(blog.content);
    setEditImage(blog.image || null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
    setEditImage(null);
  };

  const handleSave = () => {
    const updatedBlogs = blogs.map((b) =>
      b.id === editingId
        ? { ...b, title: editTitle, content: editContent, image: editImage, createdAt: Date.now() }
        : b
    );
    setBlogs(updatedBlogs);
    handleCancel();
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
    if (editingId === id) handleCancel();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) return;

    const newBlog = {
      id: Date.now(),
      title: editTitle,
      content: editContent,
      image: editImage,
      createdAt: Date.now(),
    };

    setBlogs([...blogs, newBlog]);
    handleCancel();
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div style={pageStyle}>
      <header style={topBarStyle}>
        <h1 style={headingStyle}>Admin Blog Manager</h1>
        <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
      </header>

      <form onSubmit={handleAdd} style={formStyle}>
        <input
          type="text"
          placeholder="Blog Title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Blog Content"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={4}
          style={textareaStyle}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={fileInputStyle}
        />
        <button type="submit" style={submitButton}>Add Blog</button>
      </form>

      <h2 style={{ marginBottom: '1rem' }}>List of Blogs</h2>

      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Content</th>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  {editingId === blog.id ? (
                    <>
                      <td style={tdStyle}>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          style={inputStyle}
                        />
                      </td>
                      <td style={tdStyle}>
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={4}
                          style={textareaStyle}
                        />
                      </td>
                      <td style={tdStyle}>
                        {editImage && <img src={editImage} alt="Preview" style={imageStyle} />}
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                      </td>
                      <td style={tdStyle}>
                        <button onClick={handleSave} style={actionButton}>Save</button>
                        <button onClick={handleCancel} style={actionButtonAlt}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={tdStyle}>{blog.title}</td>
                      <td style={tdStyle}>{blog.content}</td>
                      <td style={tdStyle}>
                        {blog.image && <img src={blog.image} alt="Blog" style={imageStyle} />}
                      </td>
                      <td style={tdStyle}>
                        <button onClick={() => handleEdit(blog)} style={actionButton}>Edit</button>
                        <button onClick={() => handleDelete(blog.id)} style={actionButtonAlt}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Styles
const pageStyle = {
  padding: '2rem',
  maxWidth: '1100px',
  margin: '0 auto',
  fontFamily: 'Segoe UI, sans-serif',
};

const topBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
};

const headingStyle = {
  fontSize: '2rem',
  color: '#333',
};

const logoutButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#ff5252',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const formStyle = {
  backgroundColor: '#fefefe',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  marginBottom: '2rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginBottom: '1rem',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
};

const fileInputStyle = {
  marginBottom: '1rem',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  backgroundColor: '#f5f5f5',
  color: '#333',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const submitButton = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#ea4335',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  backgroundColor: '#f5f5f5',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  verticalAlign: 'top',
};

const imageStyle = {
  width: '100px',
  height: '80px',
  objectFit: 'cover',
  borderRadius: '6px',
};

const actionButton = {
  padding: '6px 12px',
  marginRight: '0.5rem',
  backgroundColor: '#34a853',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const actionButtonAlt = {
  ...actionButton,
  backgroundColor: '#ea4335',
};
