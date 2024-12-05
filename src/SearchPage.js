import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, ChromeOutlined, MessageOutlined } from '@ant-design/icons';
import BackgroundWrapperSearch from './BackgroundWrapperSearch';

const { Text, Title } = Typography;

const SearchPage = () => {
  const [companies, setCompanies] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [sitesAnalyzed, setSitesAnalyzed] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const baseUrl = 'https://patient-bush-a521.delayel06.workers.dev';
        const headers = {
          'apikey': process.env.REACT_APP_API_KEY,
          'Accept': 'application/json',
        };

        const response = await fetch(`${baseUrl}/websites`, { headers });
        const data = await response.json();
        
        const formattedCompanies = data
          .filter(name => typeof name === 'string')
          .map(name => ({
            id: name,
            name: name,
            website: `${name}.com`
          }));
        
        setCompanies(formattedCompanies);
        setSitesAnalyzed(formattedCompanies.length);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = companies.filter(company => {
        const searchLower = searchTerm.toLowerCase();
        const companyName = (company.name || '').toLowerCase();
        const companyWebsite = (company.website || '').toLowerCase();
        
        return companyName.includes(searchLower) || companyWebsite.includes(searchLower);
      });
      
      setFilteredCompanies(results.slice(0, 3));
    } else {
      setFilteredCompanies([]);
    }
  }, [searchTerm, companies]);

  const handleCompanyClick = (company) => {
    navigate(`/page/${company.name}`, { state: { company } });
  };

  const logoStyles = {
    width: '25%', 
    paddingTop: '3rem',
  };

  const containerStyles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const inputWidth = inputFocused ? '70%' : '30%';
  const inputStyles = {
    width: inputWidth,
    padding: '0.5rem 1rem',
    fontSize: '1.5rem',
    borderRadius: '9999px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    height: '4.5rem',
    transition: 'all 0.3s ease-in-out',
  };

  const buttonStyles = {
    marginTop: '1rem', 
    height: '3.5rem', 
    width: '15%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease-in-out',
    fontFamily: 'Roboto, sans-serif',
  };

  const cardContainerStyles = {
    position: 'absolute',
    top: '4rem',
    width: inputWidth,
    zIndex: 1,
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    borderRadius: '0 0 10px 10px',
  };

  return (
    <BackgroundWrapperSearch>
      <img 
        src="logo2.png" 
        alt="Company Logo" 
        style={logoStyles} 
      />
      
      <Title level={2} style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginBottom: '1rem',
        fontSize: '2rem'
      }}>
        Understand privacy policies at a glance!
      </Title>
      
      <Text 
        style={{
          fontSize: '1.2rem',
          color: 'white',
          marginBottom: '1rem',
          textAlign: 'center'
        }}
      >
        More than {sitesAnalyzed} sites analyzed!
      </Text>
      
      <div style={containerStyles} ref={containerRef}>
        <Input 
          placeholder="Company Name" 
          size="large"
          style={inputStyles}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={cardContainerStyles}>
          {filteredCompanies.map(company => (
            <Card 
              key={company.id}
              style={{
                cursor: 'pointer',
                marginBottom: 0,
                transition: 'background-color 0.3s ease-in-out',
              }}
              onClick={() => handleCompanyClick(company)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              {company.name}
            </Card>
          ))}
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          width: '100%', 
          gap: '1rem',
          marginTop: '1rem' 
        }}>
          <Button 
            type="primary" 
            shape="round" 
            size="large" 
            style={buttonStyles}
            onClick={() => navigate('/companies')}
            icon={<ArrowRightOutlined />}
          >
            Explore Policies
          </Button>
          <Button 
            type="default" 
            shape="round" 
            size="large" 
            style={buttonStyles}
            onClick={() => navigate('/chrome-extension')}
            icon={<ChromeOutlined />}
          >
            Chrome Extension
          </Button>
          <Button 
            type="default" 
            shape="round" 
            size="large" 
            style={buttonStyles}
            onClick={() => navigate('/feedback')}
            icon={<MessageOutlined />}
          >
            Feedback
          </Button>
        </div>
      </div>
    </BackgroundWrapperSearch>
  );
};

export default SearchPage;