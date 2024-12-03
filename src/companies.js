import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from './BackgroundWrapper';
import LoadingScreen from './LoadingScreen';

const { Meta } = Card;

const Companies = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of companies from the API
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://patient-bush-a521.delayel06.workers.dev/websites', {
          headers: {
            'apikey': 'saleputes', // Replace with your actual API key
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch companies: ${response.statusText}`);
        }

        const websites = await response.json();

        // Transform API data into the expected format for rendering
        const formattedCompanies = websites.map((website) => ({
          name: website,
          image: `https://${website}.com/favicon.ico`,
          description: `www.${website}.com`,
        }));

        setCompanies(formattedCompanies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const containerStyle = {
    backgroundColor: 'whitesmoke',
    borderRadius: '20px',
    padding: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    width: '90%',
    height: '90vh',
    margin: '1rem auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    boxSizing: 'border-box',
  };

  const cardContainerStyle = {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
    overflowY: 'auto',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '240px',
    flex: '1 1 calc(33.333% - 1rem)',
  };

  const imgStyle = {
    width: 'auto',
    height: 'auto',
    margin: '1rem auto',
  };

  const handleCardClick = (company) => {
    navigate(`/page/${company.name}`, { state: { company } });
  };

  return (
    <BackgroundWrapper>
      {loading && <LoadingScreen setLoading={setLoading} />}
      {!loading && (
        <div style={containerStyle}>
          <div style={cardContainerStyle}>
            {companies.map((company) => (
              <Card
                key={company.name}
                hoverable
                style={cardStyle}
                cover={<img alt={company.name} src={company.image} style={imgStyle} />}
                onClick={() => handleCardClick(company)}
              >
                <Meta title={company.name} description={company.description} />
              </Card>
            ))}
          </div>
        </div>
      )}
    </BackgroundWrapper>
  );
};

export default Companies;
