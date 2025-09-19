import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import PrivacyPolicy from './components/PrivacyPolicy';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <header className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white text-xl">
        <img src={logo} className="h-40 pointer-events-none" alt="logo" />
        <p className="mt-4">
          Edit <code className="text-blue-400">src/App.tsx</code> and save to reload.
        </p>
        <a
          className="text-blue-400 hover:text-blue-300 transition-colors"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="text-center">
        <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4">
            <Link to="/" className="flex items-center text-white text-xl md:text-2xl font-bold no-underline mb-4 md:mb-0">
              <img src={logo} className="h-8 md:h-10 mr-2" alt="logo" />
              <span>WantToDev</span>
            </Link>
            <div className="flex gap-4 md:gap-8">
              <Link to="/" className="text-white no-underline px-3 md:px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                ホーム
              </Link>
              <Link to="/privacy-policy" className="text-white no-underline px-3 md:px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
