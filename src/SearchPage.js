import React, { useState } from 'react';
import { Input, Button } from 'antd';

const SearchPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Add hover state

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#c4dcf5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10rem'
    }}>
      <img src="logos.png" alt="" style={{ width: '30%' }} />
      
      <div style={{
        flexGrow: 0.4,
        display: 'flex',
        flexDirection: 'column', // Change to column direction
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        <Input 
          placeholder="Company Name" 
          className="search-box filled"
          size="large"
          style={{
            width: isFocused ? '70%' : '30%',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '9999px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            height: '3.5rem',
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
            width: '30%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            backgroundColor: isHovered ? 'blue' : '', // Change background color on hover
            color: isHovered ? 'white' : '', // Optional: Change text color on hover
          }}
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
        >
          Explore Company Policies
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;