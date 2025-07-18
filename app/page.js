import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={mainStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>✍️ Welcome to BlogVerse</h1>
        <p style={subTextStyle}>Create. Share. Discover.</p>
        <p style={descriptionStyle}>
          This is your space to write and read insightful blogs. Choose your role to get started:
        </p>

        <div style={buttonContainerStyle}>
          <Link href="/buyer/login">
            <button style={{ ...buttonStyle, backgroundColor: '#34a853' }}>User - Read Blogs</button>
          </Link>
          <Link href="/seller/login">
            <button style={{ ...buttonStyle, backgroundColor: '#4285f4' }}>Admin - Create Blogs</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

const mainStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(to right, #f9f9f9, #e6e6e6)',
  padding: '2rem',
};

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '2.5rem',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  maxWidth: '600px',
  width: '100%',
};

const headingStyle = {
  fontSize: '2.2rem',
  marginBottom: '0.5rem',
};

const subTextStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#555',
  marginBottom: '1rem',
};

const descriptionStyle = {
  fontSize: '1rem',
  color: '#666',
  marginBottom: '2rem',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
};

const buttonStyle = {
  padding: '0.8rem 1.8rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};
