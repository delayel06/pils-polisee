import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import Companies from './companies'; // Import the new page component
import NewPage from './NewPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/companies" element={<Companies />} /> 
      <Route path="/page/:companyName" element={<NewPage />} />
    </Routes>
  </Router>
);

export default App;