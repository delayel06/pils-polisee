import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import Companies from './companies'; // Import the new page component
import NewPage from './NewPage';
import FeedbackPage from './FeedbackPage';
import ChromeExtensionPage from './ChromeExtensionPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/companies" element={<Companies />} /> 
      <Route path="/page/:companyName" element={<NewPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/chrome-extension" element={<ChromeExtensionPage />} />
      
    </Routes>
  </Router>
);

export default App;