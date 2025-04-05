import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Add this function to handle MetaMask connection
async function connectMetaMask() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error('User rejected request', error);
      return null;
    }
  } else {
    alert('Please install MetaMask!');
    return null;
  }
}

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  // Add state for wallet address
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform animate-gradient"
          onClick={() => navigate('/')}
        >
          Crossyyy AI
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => navigate('/transfer')}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all hover:scale-105 transform"
          >
            Transfer
          </button>
          <button 
            onClick={() => navigate('/history')}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all hover:scale-105 transform"
          >
            History
          </button>
          <button 
            onClick={() => navigate('/about')}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all hover:scale-105 transform"
          >
            About
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105 hover:rotate-12"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-500 animate-spin-slow" />
            ) : (
              <Moon size={20} className="text-gray-600 animate-pulse" />
            )}
          </button>
          <button 
            onClick={async () => {
              const address = await connectMetaMask();
              if (address) {
                setWalletAddress(address);
              }
            }}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 hover:shadow-lg dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            <Wallet size={20} className="animate-bounce-subtle" />
            <span>{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </button>
          <button 
            className="transform hover:scale-110 transition-transform"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transform transition-all duration-300 ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <button 
            onClick={() => {
              navigate('/transfer');
              setIsMenuOpen(false);
            }}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all transform hover:translate-x-2"
          >
            Transfer
          </button>
          <button 
            onClick={() => {
              navigate('/history');
              setIsMenuOpen(false);
            }}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all transform hover:translate-x-2"
          >
            History
          </button>
          <button 
            onClick={() => {
              navigate('/about');
              setIsMenuOpen(false);
            }}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all transform hover:translate-x-2"
          >
            About
          </button>
          <button className="flex items-center space-x-2 bg-purple-600 dark:bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-all transform hover:scale-105">
            <Wallet size={20} className="animate-bounce-subtle" />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </header>
  );
}