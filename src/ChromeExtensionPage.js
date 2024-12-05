import React from 'react';
import { Typography, Button } from 'antd';
import { ChromeOutlined } from '@ant-design/icons';
import BackgroundWrapperSearch from './BackgroundWrapperSearch';

const { Title, Paragraph } = Typography;

const ChromeExtensionPage = () => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '20px',
  };

  const titleStyles = {
    color: 'white',
    fontSize: '3rem',
    marginBottom: '20px',
  };

  const subtitleStyles = {
    color: 'white',
    fontSize: '1.5rem',
    maxWidth: '600px',
    marginBottom: '30px',
  };

  const handleNotifyClick = () => {
    // Implement email collection for notifications
    alert('We will notify you when the extension is available!');
  };

  return (
    <BackgroundWrapperSearch>
      <div style={containerStyles}>
        <ChromeOutlined style={{ fontSize: '100px', color: 'white', marginBottom: '20px' }} />
        <Title style={titleStyles}>
          Chrome Extension Coming Soon!
        </Title>
        <Paragraph style={subtitleStyles}>
          Get ready to understand privacy policies with a single click. We're working hard to bring you the most intuitive privacy policy tool.
        </Paragraph>
        <Button 
          size="large" 
          type="primary" 
          onClick={handleNotifyClick}
        >
          Notify Me When Ready
        </Button>
      </div>
    </BackgroundWrapperSearch>
  );
};

export default ChromeExtensionPage;