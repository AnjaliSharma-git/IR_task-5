import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TimeTracker from './components/TimeTracker';
import ChartPage from './components/ChartPage';
import './App.css';

const App = () => {
  const [entries, setEntries] = useState([]);

  return (
    <Router>
      <div className="app">
        <div className="sidebar">
          <h2>Navigation</h2>
          <ul>
            <li>
              <Link to="/">Time Tracker</Link>
            </li>
            <li>
              <Link to="/chart">Chart</Link>
            </li>
          </ul>
        </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<TimeTracker setEntries={setEntries} entries={entries} />} />
            <Route path="/chart" element={<ChartPage entries={entries} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
