import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from './BackgroundWrapper'; // Import the BackgroundWrapper component

const SearchPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const inputWidth = isFocused 
    ? (isMobile ? '100%' : '70%') 
    : (isMobile ? '70%' : '30%');

  const handleButtonClick = () => {
    navigate('/companies'); // Navigate to the new page
  };

  return (
    <BackgroundWrapper>
      <img 
        src="logo2.png" 
        alt="" 
        style={{ 
          width: isMobile ? '80%' : '25%', 
          paddingTop: '3rem',
        }} 
      />
      
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 0.2,
        justifyContent: 'center',
      }}>
        <Input 
          placeholder="Company Name" 
          size="large"
          style={{
            width: inputWidth,
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '9999px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            height: '3.5rem',
            transition: 'all 0.3s ease-in-out',
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Button 
          shape="round" 
          size="large" 
          style={{ 
            marginTop: '1rem', 
            height: '3.5rem', 
            width: isMobile ? '70%' : '30%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            backgroundColor: isHovered ? 'blue' : 'white',
            color: isHovered ? 'white' : 'black',
            transition: 'all 0.3s ease-in-out',
            fontFamily: 'Roboto, sans-serif',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleButtonClick} // Add the click handler
        >
          Explore Company Policies
        </Button>
      </div>
    </BackgroundWrapper>
  );
};

export default SearchPage;