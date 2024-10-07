import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, ChromeOutlined } from '@ant-design/icons'; // Import icons
import BackgroundWrapperSearch from './BackgroundWrapperSearch'; // Import the BackgroundWrapper component

const knownCompanies = {
  facebook: { name: 'Facebook', image: 'https://logo.clearbit.com/facebook.com' },
  google: { name: 'Google', image: 'https://logo.clearbit.com/google.com' },
  amazon: { name: 'Amazon', image: 'https://logo.clearbit.com/amazon.com' },
  apple: { name: 'Apple', image: 'https://logo.clearbit.com/apple.com' },
  microsoft: { name: 'Microsoft', image: 'https://logo.clearbit.com/microsoft.com' },
  twitter: { name: 'Twitter', image: 'https://logo.clearbit.com/twitter.com' },
  linkedin: { name: 'LinkedIn', image: 'https://logo.clearbit.com/linkedin.com' },
  netflix: { name: 'Netflix', image: 'https://logo.clearbit.com/netflix.com' },
  adobe: { name: 'Adobe', image: 'https://logo.clearbit.com/adobe.com' },
  spotify: { name: 'Spotify', image: 'https://logo.clearbit.com/spotify.com' },
};

const SearchPage = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [chromeButtonHovered, setChromeButtonHovered] = useState(false); // State for chrome button hover
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = Object.keys(knownCompanies).filter(company =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompanies(results);
    } else {
      setFilteredCompanies([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setFilteredCompanies([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  const inputWidth = inputFocused 
    ? (isMobileView ? '100%' : '70%') 
    : (isMobileView ? '70%' : '30%');

  const handleButtonClick = () => {
    navigate('/companies'); // Navigate to the new page
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCompanyClick = (company) => {
    navigate(`/page/${knownCompanies[company].name}`, { state: { company: knownCompanies[company] } });
  };

  const logoStyles = {
    width: isMobileView ? '80%' : '25%', 
    paddingTop: '3rem',
  };

  const containerStyles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 0.2,
    justifyContent: 'center',
    position: 'relative',
  };

  const inputStyles = {
    width: inputWidth,
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '9999px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    height: '3.5rem',
    transition: 'all 0.3s ease-in-out',
  };

  const buttonStyles = {
    marginTop: '1rem', 
    height: '3.5rem', 
    width: isMobileView ? '35%' : '15%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    backgroundColor: buttonHovered ? 'blue' : 'white',
    color: buttonHovered ? 'white' : 'black',
    transition: 'all 0.3s ease-in-out',
    fontFamily: 'Roboto, sans-serif',
  };

  const chromeButtonStyles = {
    marginTop: '1rem', 
    height: '3.5rem', 
    width: isMobileView ? '35%' : '15%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    backgroundColor: chromeButtonHovered ? 'green' : 'white',
    color: chromeButtonHovered ? 'white' : 'black',
    transition: 'all 0.3s ease-in-out',
    fontFamily: 'Roboto, sans-serif',
    marginLeft: '10px', // Add margin to separate buttons
  };

  const cardContainerStyles = {
    position: 'absolute',
    top: '4rem', // Positioning the cards right below the input
    width: inputWidth,
    zIndex: 1,
    backgroundColor: 'white', // Ensure the background covers the area behind the dropdown
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    borderRadius: '0 0 10px 10px',
  };

  const cardStyles = {
    cursor: 'pointer',
    marginBottom: 0, // Remove margin between cards
    transition: 'background-color 0.3s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  };

  const cardHoverStyles = {
    backgroundColor: '#f0f0f0', // Darken background on hover
  };

  const logoInCardStyles = {
    width: '30px',
    height: '30px',
    marginRight: '10px',
  };

  return (
    <BackgroundWrapperSearch>
      <img 
        src="logo2.png" 
        alt="Company Logo" 
        style={logoStyles} 
      />
      
      <div style={containerStyles} ref={containerRef}>
        <Input 
          placeholder="Company Name" 
          size="large"
          style={inputStyles}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={handleInputChange}
        />
        <div style={cardContainerStyles}>
          {filteredCompanies.slice(0, 3).map(company => (
            <Card 
              key={company} 
              style={cardStyles} 
              onClick={() => handleCompanyClick(company)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = cardHoverStyles.backgroundColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <img 
                src={knownCompanies[company].image} 
                alt={`${knownCompanies[company].name} Logo`} 
                style={logoInCardStyles} 
              />
              {knownCompanies[company].name}
            </Card>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button 
            shape="round" 
            size="large" 
            style={buttonStyles}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            onClick={handleButtonClick} // Add the click handler
            icon={<ArrowRightOutlined />} // Add arrow icon
          >
            Explore Company Policies
          </Button>
          <Button 
            shape="round" 
            size="large" 
            style={chromeButtonStyles}
            onMouseEnter={() => setChromeButtonHovered(true)}
            onMouseLeave={() => setChromeButtonHovered(false)}
            href="https://google.com" // Link to Chrome extension
            target="_blank"
            icon={<ChromeOutlined />} // Add Chrome icon
          >
            Chrome Extension
          </Button>
        </div>
      </div>
    </BackgroundWrapperSearch>
  );
};

export default SearchPage;