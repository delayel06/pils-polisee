import React from 'react';

const BackgroundWrapper = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(to right, #c4dcf5, #a1c4fd)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
    }}>
      <a href="/" style={{ marginBottom: '1rem' }}>
        <img src="/logo2.png" alt="Logo" style={{ 
          height: '10rem', // Increased height to make the logo larger
        }} />
      </a>
      {children}
    </div>
  );
};

export default BackgroundWrapper;