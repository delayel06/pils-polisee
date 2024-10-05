import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography, Tag, List } from 'antd';
import { ArrowLeftOutlined, RightOutlined } from '@ant-design/icons';
import BackgroundWrapper from './BackgroundWrapper'; // Assuming this is a custom component

const { Text } = Typography;

const containerStyle = {
  height: '90vh',
  margin: '1rem auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  boxSizing: 'border-box',
  textAlign: 'center',
  position: 'relative',
};

const logoStyle = {
  width: '100px',
  marginBottom: '1rem',
  alignSelf: 'center',
};

const backButtonStyle = {
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  fontSize: '1rem',
  padding: '0.5rem 1rem',
  transition: 'transform 0.3s',
};

const textContainerStyle = {
  width: '100%',
  height: '300px',
  overflowY: 'scroll',
  backgroundColor: 'white',
  padding: '10px',
  border: '1px solid #ccc',
  marginBottom: '1rem',
};

const categoryStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const roundedContainerStyle = {
  width: '90%',
  margin: '0 auto',
  padding: '2rem',
  backgroundColor: 'whitesmoke',
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const highlightStyle = {
  backgroundColor: 'yellow',
};

const NewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { company } = location.state || {};

  const [highlighted, setHighlighted] = useState(null);

  const redCategoryRef = useRef(null);
  const orangeCategoryRef = useRef(null);
  const greenCategoryRef = useRef(null);

  const handleScrollTo = (ref, category) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setHighlighted(category);
    }
  };

  const data = [
    {
      title: 'Red Category Text',
      color: 'red',
      link: () => handleScrollTo(redCategoryRef, 'red'),
    },
    {
      title: 'Orange Category Text',
      color: 'orange',
      link: () => handleScrollTo(orangeCategoryRef, 'orange'),
    },
    {
      title: 'Green Category Text',
      color: 'green',
      link: () => handleScrollTo(greenCategoryRef, 'green'),
    },
  ];

  return (
    <BackgroundWrapper>
      <div style={roundedContainerStyle}>
        <div style={containerStyle}>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            style={backButtonStyle}
            onClick={() => navigate(-1)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Back
          </Button>
          {company && <img src={company.image} alt={company.name} style={logoStyle} />}
          <div style={textContainerStyle}>
            <Text style={{ fontSize: '1.2rem' }}>
              <span ref={redCategoryRef} style={highlighted === 'red' ? highlightStyle : {}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              <span ref={orangeCategoryRef} style={highlighted === 'orange' ? highlightStyle : {}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              <span ref={greenCategoryRef} style={highlighted === 'green' ? highlightStyle : {}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
            </Text>
          </div>
          <div style={categoryStyle}>
            <Tag color="red" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Red Category</Tag>
            <List
              itemLayout="horizontal"
              dataSource={[{ title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: data[0].link }]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<RightOutlined style={{ color: 'red', fontSize: '1.2rem' }} />}
                    title={
                      <button 
                        onClick={item.link} 
                        style={{ 
                          transition: 'transform 0.3s', 
                          display: 'inline-block', 
                          marginLeft: '0.5rem', 
                          background: 'none', 
                          border: 'none', 
                          color: 'black', 
                          textDecoration: 'underline', 
                          cursor: 'pointer' 
                        }} 
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        {item.title}
                      </button>
                    }
                  />
                </List.Item>
              )}
              style={{ paddingLeft: '1rem' }}
            />
            <Tag color="orange" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Orange Category</Tag>
            <List
              itemLayout="horizontal"
              dataSource={[{ title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: data[1].link }]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<RightOutlined style={{ color: 'orange', fontSize: '1.2rem' }} />}
                    title={
                      <button 
                        onClick={item.link} 
                        style={{ 
                          transition: 'transform 0.3s', 
                          display: 'inline-block', 
                          marginLeft: '0.5rem', 
                          background: 'none', 
                          border: 'none', 
                          color: 'black', 
                          textDecoration: 'underline', 
                          cursor: 'pointer' 
                        }} 
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        {item.title}
                      </button>
                    }
                  />
                </List.Item>
              )}
              style={{ paddingLeft: '1rem' }}
            />
            <Tag color="green" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Green Category</Tag>
            <List
              itemLayout="horizontal"
              dataSource={[{ title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: data[2].link }]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<RightOutlined style={{ color: 'green', fontSize: '1.2rem' }} />}
                    title={
                      <button 
                        onClick={item.link} 
                        style={{ 
                          transition: 'transform 0.3s', 
                          display: 'inline-block', 
                          marginLeft: '0.5rem', 
                          background: 'none', 
                          border: 'none', 
                          color: 'black', 
                          textDecoration: 'underline', 
                          cursor: 'pointer' 
                        }} 
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        {item.title}
                      </button>
                    }
                  />
                </List.Item>
              )}
              style={{ paddingLeft: '1rem' }}
            />
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default NewPage;