import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import Companies from './companies'; // Import the new page component

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/companies" element={<Companies />} /> {/* Define the route for the new page */}
    </Routes>
  </Router>
);

export default App;