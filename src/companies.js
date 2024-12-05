import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from './BackgroundWrapper';
import LoadingScreen from './LoadingScreen';
import dotenv from 'dotenv'; // Add this line

dotenv.config(); // Add this line

console.log('API Key:', process.env.REACT_APP_API_KEY);

const { Meta } = Card;

// Styles
const styles = {
  container: {
    padding: '2rem',
    width: '90%', // Changed from maxWidth to width
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Changed from auto-fit to auto-fill and reduced minmax width
    gap: '1.5rem',
    padding: '1rem',
    alignItems: 'stretch',
    width: '100%',
  },
  card: {
    height: '100%',
    transition: 'transform 0.2s ease',
    backgroundColor: '#fff',
    border: '1px solid #eaeaea',
    borderRadius: '8px',
    overflow: 'hidden', // Ensures content stays within card bounds
    '&:hover': {
      transform: 'translateY(-4px)',
    }
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  image: {
    width: '100%',
    height: '140px',
    padding: '1rem',
    objectFit: 'contain',
    background: '#f8f9fa',
    borderBottom: '1px solid #eaeaea', // Adds separation between image and content
  },
  imageContainer: {
    background: '#f8f9fa',
    position: 'relative',
    width: '100%',
    borderBottom: '1px solid #eaeaea',
  },
  scoreContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'linear-gradient(135deg, #00b4db, #0083b0)',
    borderRadius: '20px',
    padding: '6px 14px',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  }
};

// Helper function to check if image exists
// Helper function to check if image actually loads
const checkImageExists = async (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    
    // Set timeout to avoid hanging
    const timeout = setTimeout(() => {
      img.src = '';
      resolve(false);
    }, 2000);

    img.onload = () => {
      clearTimeout(timeout);
      // Check if image has actual dimensions
      if (img.width > 0 && img.height > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };

    img.src = url;
  });
};

// Function to get first working logo URL
const getLogoUrl = async (domain) => {
  const tlds = ['gg','me', 'org', 'fr', 'com'];
  
  for (const tld of tlds) {
    const url = `https://logo.clearbit.com/${domain}.${tld}`;
    if (await checkImageExists(url)) {
      console.log(`Found logo at ${url}`); // Debug log
      return { url, tld };
    }
  }
  
  // If no logo found, return default image
  return { url: `https://logo.clearbit.com/${domain}.com`, tld: 'com' };
};

const Companies = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCompanies = async () => {
      try {
        const baseUrl = 'https://patient-bush-a521.delayel06.workers.dev';
        const headers = {
          'apikey': process.env.REACT_APP_API_KEY,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };
        

        const response = await fetch(`${baseUrl}/websites`, { 
          headers,
          signal,
        });


        const websites = await response.json();

        const formattedCompanies = await Promise.all(
          websites.map(async (website) => {
            try {
              const scoreResponse = await fetch(`${baseUrl}/web/${website}`, { headers });
              const scoreData = await scoreResponse.json();
              const { url: image, tld: ext } = await getLogoUrl(website); // Define image and ext here
              
              return {
                name: website,
                image,
                description: `www.${website}.${ext}`,
                score: scoreData.final_score ? `${scoreData.final_score}/100` : 'N/A',
              };
            } catch (error) {
              console.error(`Error fetching data for ${website}:`, error);
              return null;
            }
          })
        );

        setCompanies(formattedCompanies.filter(Boolean));
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError('Unable to load company data. Please try again later.');
        message.error('Failed to load companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();

    return () => controller.abort();
  }, []);

  const handleCardClick = (company) => {
    navigate(`/page/${company.name}`, { state: { company } });
  };

  if (error) {
    return (
      <BackgroundWrapper>
        <div style={styles.container}>
          <h2>Error loading companies: {error}</h2>
        </div>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      {loading && <LoadingScreen setLoading={setLoading} />}
      {!loading && (
        <div style={styles.container}>
          <h1 style={styles.header}>Company Privacy Scores</h1>
          <div style={styles.cardContainer}>
            {companies.map((company) => (
              <Card
                key={company.name}
                hoverable
                style={styles.card}
                cover={
                  <div style={styles.imageContainer}>
                    <img
                      alt={company.name}
                      src={company.image}
                      style={styles.image}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/fallback-image.png';
                      }}
                    />
                    <div style={styles.scoreContainer}>
                      {company.score}
                    </div>
                  </div>
                }
                onClick={() => handleCardClick(company)}
              >
                <Meta 
                  title={company.name} 
                  description={company.description}
                />
              </Card>
            ))}
          </div>
        </div>
      )}
    </BackgroundWrapper>
  );
};

export default Companies;