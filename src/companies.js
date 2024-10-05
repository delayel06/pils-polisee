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
  const navigate = useNavigate();

  useEffect(() => {
    console.log(filters); // Use filters to avoid the error
  }, [filters]);

  const handleFilterChange = (value, category) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  const companies = [
    { name: 'Google', image: 'https://logo.clearbit.com/google.com', description: 'www.google.com' },
    { name: 'Apple', image: 'https://logo.clearbit.com/apple.com', description: 'www.apple.com' },
    { name: 'Microsoft', image: 'https://logo.clearbit.com/microsoft.com', description: 'www.microsoft.com' },
    { name: 'Amazon', image: 'https://logo.clearbit.com/amazon.com', description: 'www.amazon.com' },
    { name: 'Facebook', image: 'https://logo.clearbit.com/facebook.com', description: 'www.facebook.com' },
    { name: 'Tesla', image: 'https://logo.clearbit.com/tesla.com', description: 'www.tesla.com' },
    { name: 'Netflix', image: 'https://logo.clearbit.com/netflix.com', description: 'www.netflix.com' },
    { name: 'Adobe', image: 'https://logo.clearbit.com/adobe.com', description: 'www.adobe.com' },
  ];

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
            >Filters</h3>
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
            {companies.map(company => (
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