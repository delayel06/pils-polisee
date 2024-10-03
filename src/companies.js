import React, { useState } from 'react';
import { Card } from 'antd';
import LoadingScreen from './LoadingScreen'; // Import the loading screen component
import BackgroundWrapper from './BackgroundWrapper'; // Import the BackgroundWrapper component

const Companies = () => {
  const [loading, setLoading] = useState(true);

  return (
    <BackgroundWrapper>
      {loading && <LoadingScreen setLoading={setLoading} />}
      {!loading && (
        <div style={{
          backgroundColor: 'whitesmoke',
          borderRadius: '20px',
          padding: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          width: '90%',
          height: '90vh', // Adjust height to take up most of the viewport
          margin: '1rem auto', // Reduce margin to minimize space at the top and bottom
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          boxSizing: 'border-box', // Ensure padding is included in the width
        }}>
          <div style={{
            width: '20%',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box', // Ensure padding is included in the width
          }}>
            <h3>Filters</h3>
            {/* Add filter options here */}
          </div>
          <div style={{
            width: '80%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            overflowY: 'auto', // Allow scrolling if content overflows
          }}>
            {Array.from({ length: 18 }).map((_, index) => (
              <Card
                key={index}
                title={`Card ${index + 1}`}
                extra={<a href="#">More</a>}
                style={{
                  width: 300,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  borderRadius: '10px',
                  transition: 'transform 0.3s, box-shadow 0.3s', // Add transition for smooth effect
                  cursor: 'pointer', // Make the card clickable
                }}
                bodyStyle={{
                  transition: 'background-color 0.3s', // Add transition for background color
                }}
                onClick={() => alert(`Card ${index + 1} clicked`)} // Add click handler
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'; // Slightly grow the card
                  e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.3)'; // Darken the shadow
                  e.currentTarget.querySelector('.ant-card-body').style.backgroundColor = '#f0f0f0'; // Darken the background
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset the card size
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)'; // Reset the shadow
                  e.currentTarget.querySelector('.ant-card-body').style.backgroundColor = 'white'; // Reset the background
                }}
              >
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </BackgroundWrapper>
  );
};

export default Companies;