import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from './BackgroundWrapper';
import LoadingScreen from './LoadingScreen';

const { Meta } = Card;

// Styles
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    padding: '1rem',
  },
  card: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: 'auto',
    height: 'auto',
    margin: '1rem auto',
    objectFit: 'contain',
    maxHeight: '150px',
  }
};

// Helper function to check if image exists
const checkImageExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Function to get first working logo URL
const getLogoUrl = async (domain) => {
  const tlds = ['me', 'org', 'fr', 'com'];
  
  for (const tld of tlds) {
    const url = `https://logo.clearbit.com/${domain}.${tld}`;
    if (await checkImageExists(url)) {
      return url;
    }
  }
  return `https://logo.clearbit.com/${domain}.com`; // Fallback
};

const Companies = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://patient-bush-a521.delayel06.workers.dev/websites', {
          headers: {
            'apikey': process.env.REACT_APP_API_KEY || 'saleputes',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch companies: ${response.statusText}`);
        }

        const websites = await response.json();

        const formattedCompanies = await Promise.all(
          websites.map(async (website) => ({
            name: website,
            image: await getLogoUrl(website),
            description: `www.${website}.com`,
          }))
        );

        setCompanies(formattedCompanies);
      } catch (err) {
        setError(err.message);
        message.error('Failed to load companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
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
          <div style={styles.cardContainer}>
            {companies.map((company) => (
              <Card
                key={company.name}
                hoverable
                style={styles.card}
                cover={
                  <img
                    alt={company.name}
                    src={company.image}
                    style={styles.image}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/fallback-image.png'; // Add a fallback image
                    }}
                  />
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