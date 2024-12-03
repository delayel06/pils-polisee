import React, { useState, useEffect } from 'react';
import { Select, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from './BackgroundWrapper';
import LoadingScreen from './LoadingScreen';

const { Option } = Select;
const { Meta } = Card;

const Companies = () => {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    companyType: null,
    location: null,
    size: null,
  });
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
          image: `https://logo.clearbit.com/${website}`,
          description: `www.${website}`,
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

  const handleFilterChange = (value, category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

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

  const filterContainerStyle = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
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
          <div style={filterContainerStyle}>
            <h3
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              Filters
            </h3>
            <Select
              style={{ width: '100%', marginBottom: '1rem' }}
              placeholder="Select Company Type"
              onChange={(value) => handleFilterChange(value, 'companyType')}
            >
              <Option value="tech">Tech</Option>
              <Option value="finance">Finance</Option>
              <Option value="healthcare">Healthcare</Option>
            </Select>
            <Select
              style={{ width: '100%', marginBottom: '1rem' }}
              placeholder="Select Location"
              onChange={(value) => handleFilterChange(value, 'location')}
            >
              <Option value="us">United States</Option>
              <Option value="eu">Europe</Option>
              <Option value="asia">Asia</Option>
            </Select>
            <Select
              style={{ width: '100%', marginBottom: '1rem' }}
              placeholder="Select Company Size"
              onChange={(value) => handleFilterChange(value, 'size')}
            >
              <Option value="small">Small</Option>
              <Option value="medium">Medium</Option>
              <Option value="large">Large</Option>
            </Select>
          </div>
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
