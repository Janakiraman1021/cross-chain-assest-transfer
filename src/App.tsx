import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import Transfer from './pages/Transfer';
import TransactionStatus from './pages/TransactionStatus';
import History from './pages/History';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/status/:id" element={<TransactionStatus />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;