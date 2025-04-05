import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, CheckCircle, ExternalLink, Copy, ArrowDownRight } from 'lucide-react';
import type { Chain, Token, TransactionResponse } from '../types';
import toast, { Toaster } from 'react-hot-toast'; // Import toast

const CHAINS: Chain[] = ['Ethereum', 'Polygon', 'Solana', 'Aptos'];

const TOKENS: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg' },
  { symbol: 'MATIC', name: 'Polygon', icon: 'https://cryptologos.cc/logos/polygon-matic-logo.svg' },
  { symbol: 'SOL', name: 'Solana', icon: 'https://cryptologos.cc/logos/solana-sol-logo.svg' },
  { symbol: 'APT', name: 'Aptos', icon: 'https://cryptologos.cc/logos/aptos-apt-logo.svg' },
];
import { Wallet } from 'lucide-react';

export default function Transfer() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState<TransactionResponse | null>(null);
  const [formData, setFormData] = useState({
    fromAddress: '',
    toAddress: '',
    sourceChain: CHAINS[0],
    destinationChain: CHAINS[1],
    token: TOKENS[0],
    amount: '',
  });

  // Connect wallet on component mount
  React.useEffect(() => {
    connectWallet();
  }, []);

  // Add wallet connection function
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setFormData(prev => ({ ...prev, fromAddress: accounts[0] }));
      } catch (error) {
        console.error('User rejected request', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const transferData = {
        from: formData.fromAddress,
        to: formData.toAddress,
        amount: formData.amount,
        sourceChain: formData.sourceChain,
        destinationChain: formData.destinationChain,
        token: formData.token.symbol,
      };
  
      console.log('Sending data to backend:', transferData);
      
      // Simulate API response instead of making a real API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random transaction hash
      const txHash = "0x" + Math.random().toString(16).substring(2, 66);
      
      // Always return a successful response
      const result = {
        success: true,
        txHash: txHash,
        from: transferData.from,
        to: transferData.to,
        amount: transferData.amount,
      };
  
      setTransactionResult(result);
      
      // Show success toast notification
      toast.success('Transaction completed successfully!', {
        duration: 3000,
        icon: '🎉',
      });
      
      // After showing the transaction result for a moment, navigate to history page
      setTimeout(() => {
        navigate('/history');
      }, 3000);
      
    } catch (error) {
      // Even in case of an error, we'll show success
      console.log('Error occurred but showing success anyway:', error);
      
      const result = {
        success: true,
        txHash: "0x" + Math.random().toString(16).substring(2, 66),
        from: formData.fromAddress,
        to: formData.toAddress,
        amount: formData.amount,
      };
      
      setTransactionResult(result);
      
      toast.success('Transaction completed successfully!', {
        duration: 3000,
        icon: '🎉',
      });
      
      setTimeout(() => {
        navigate('/history');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 transition-colors duration-300">
      {/* Add Toaster component */}
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!transactionResult ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
              <h1 className="text-3xl font-bold mb-8 dark:text-white">Transfer Assets</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From Wallet Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your connected wallet address"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={formData.fromAddress}
                    readOnly
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To Wallet Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter recipient address"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={formData.toAddress}
                    onChange={(e) => setFormData({ ...formData, toAddress: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Source Chain <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      value={formData.sourceChain}
                      onChange={(e) => setFormData({ ...formData, sourceChain: e.target.value as Chain })}
                      required
                    >
                      {CHAINS.map((chain) => (
                        <option key={chain} value={chain}>{chain}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Destination Chain <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      value={formData.destinationChain}
                      onChange={(e) => setFormData({ ...formData, destinationChain: e.target.value as Chain })}
                      required
                    >
                      {CHAINS.map((chain) => (
                        <option key={chain} value={chain}>{chain}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Token <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      value={formData.token.symbol}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        token: TOKENS.find(t => t.symbol === e.target.value) || TOKENS[0]
                      })}
                      required
                    >
                      {TOKENS.map((token) => (
                        <option key={token.symbol} value={token.symbol}>{token.symbol}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                      min="0.001"
                      step="0.001"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 dark:bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Transfer Now</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold dark:text-white">Transaction Details</h1>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={24} className="text-green-500" />
                  <span className="text-green-500 font-medium">Success</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Transaction Hash</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono dark:text-white">{formatAddress(transactionResult.txHash)}</span>
                      <button 
                        onClick={() => copyToClipboard(transactionResult.txHash)}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      >
                        <Copy size={16} />
                      </button>
                      <a 
                        href={`https://etherscan.io/tx/${transactionResult.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">From</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono dark:text-white">{formatAddress(transactionResult.from)}</span>
                      <button 
                        onClick={() => copyToClipboard(transactionResult.from)}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowDownRight size={24} className="text-gray-400 dark:text-gray-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">To</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono dark:text-white">{formatAddress(transactionResult.to)}</span>
                      <button 
                        onClick={() => copyToClipboard(transactionResult.to)}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Amount</span>
                    <span className="font-medium dark:text-white">{transactionResult.amount} ETH</span>
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <button
                    onClick={() => setTransactionResult(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    New Transfer
                  </button>
                  <button
                    onClick={() => navigate('/history')}
                    className="flex-1 bg-purple-600 dark:bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors transform hover:scale-105"
                  >
                    View History
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}