import React from 'react';

const BackgroundWrapper = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #c4dcf5, #a1c4fd)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      padding: '1rem',
    }}>
      {children}
    </div>
  );
};

export default BackgroundWrapper;