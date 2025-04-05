import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Feather as Ethereum, Circle, Sun, Box } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-slide-up">
            Cross-chain transfers made easy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up delay-200">
            Transfer your assets seamlessly across different blockchains with AI-powered optimization
          </p>
          <button
            onClick={() => navigate('/transfer')}
            className="flex items-center space-x-2 bg-purple-600 dark:bg-purple-500 text-white px-8 py-4 rounded-xl hover:bg-purple-700 dark:hover:bg-purple-600 transition-all transform hover:scale-105 mx-auto animate-bounce-subtle"
          >
            <span className="text-lg">Start Transfer</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Supported Chains */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in dark:text-white">Supported Blockchains</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:rotate-2 animate-slide-up">
            <Ethereum size={48} className="text-blue-600 mb-4 animate-float" />
            <span className="font-semibold dark:text-white">Ethereum</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:rotate-2 animate-slide-up delay-100">
            <Circle size={48} className="text-purple-600 mb-4 animate-float" />
            <span className="font-semibold dark:text-white">Polygon</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:rotate-2 animate-slide-up delay-200">
            <Sun size={48} className="text-green-600 mb-4 animate-float" />
            <span className="font-semibold dark:text-white">Solana</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:rotate-2 animate-slide-up delay-300">
            <Box size={48} className="text-blue-500 mb-4 animate-float" />
            <span className="font-semibold dark:text-white">Aptos</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all hover:rotate-1 animate-slide-up">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Fast & Secure</h3>
            <p className="text-gray-600 dark:text-gray-300">Lightning-fast transfers with enterprise-grade security protocols</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all hover:rotate-1 animate-slide-up delay-100">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">AI Optimized</h3>
            <p className="text-gray-600 dark:text-gray-300">Smart routing and fee optimization powered by AI</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all hover:rotate-1 animate-slide-up delay-200">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Multi-Chain</h3>
            <p className="text-gray-600 dark:text-gray-300">Seamlessly transfer assets across major blockchains</p>
          </div>
        </div>
      </div>
    </div>
  );
}