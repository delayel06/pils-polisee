import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ setLoading }) => {
  const [isMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide the loading screen after 1 second
    }, 750);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column', // Stack logo and loading bar vertically
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      transition: 'opacity 0.5s ease-out',
    }}>
      <img 
        src="/logo2.png" 
        alt="Logo" 
        style={{
          width: isMobile ? '80%' : '20%', // Adjust the size as needed
          marginBottom: '2rem', // Space between logo and loading bar
        }} 
      />
      <div style={{
        width: '80%',
        maxWidth: '400px',
        height: '20px',
        backgroundColor: '#c4dcf5',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          content: '',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '0',
          height: '100%',
          backgroundColor: '#a1c4fd',
          animation: 'loading 0.75s linear forwards',
        }}></div>
      </div>
      <style>
        {`
          @keyframes loading {
            0% {
              width: 0;
            }
            100% {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;