import React from 'react';
import { Shield, Zap, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Overview Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">About Crossyyy AI</h1>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Crossyyy AI is a cutting-edge cross-chain transfer platform that leverages artificial intelligence to optimize your crypto transfers across different blockchains. Our platform ensures secure, fast, and cost-effective transfers while maintaining the highest standards of security and reliability.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center transform hover:scale-105 transition-all">
                <Shield size={40} className="text-purple-600 dark:text-purple-400 mb-4 animate-float" />
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Secure</h3>
                <p className="text-gray-600 dark:text-gray-300">Enterprise-grade security protocols protecting your assets</p>
              </div>
              <div className="flex flex-col items-center text-center transform hover:scale-105 transition-all">
                <Zap size={40} className="text-purple-600 dark:text-purple-400 mb-4 animate-float" />
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Fast</h3>
                <p className="text-gray-600 dark:text-gray-300">Lightning-fast transfers with AI-optimized routing</p>
              </div>
              <div className="flex flex-col items-center text-center transform hover:scale-105 transition-all">
                <Users size={40} className="text-purple-600 dark:text-purple-400 mb-4 animate-float" />
                <h3 className="text-lg font-semibold mb-2 dark:text-white">User-Friendly</h3>
                <p className="text-gray-600 dark:text-gray-300">Intuitive interface for seamless transfers</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center transform hover:scale-105 transition-all">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
                  alt="Sarah Chen"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover hover:shadow-lg transition-shadow"
                />
                <h3 className="font-semibold dark:text-white">Sarah Chen</h3>
                <p className="text-gray-600 dark:text-gray-300">Founder & CEO</p>
              </div>
              <div className="text-center transform hover:scale-105 transition-all">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                  alt="David Williams"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover hover:shadow-lg transition-shadow"
                />
                <h3 className="font-semibold dark:text-white">David Williams</h3>
                <p className="text-gray-600 dark:text-gray-300">CTO</p>
              </div>
              <div className="text-center transform hover:scale-105 transition-all">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop"
                  alt="Emily Rodriguez"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover hover:shadow-lg transition-shadow"
                />
                <h3 className="font-semibold dark:text-white">Emily Rodriguez</h3>
                <p className="text-gray-600 dark:text-gray-300">Head of Product</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="transform hover:translate-x-2 transition-transform">
                <h3 className="font-semibold mb-2 dark:text-white">How does Crossyyy AI work?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Crossyyy AI uses advanced algorithms to optimize your cross-chain transfers, finding the most efficient routes and lowest fees across different blockchains.
                </p>
              </div>
              <div className="transform hover:translate-x-2 transition-transform">
                <h3 className="font-semibold mb-2 dark:text-white">What chains are supported?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We currently support Ethereum, Polygon, Solana, and Aptos, with more chains being added regularly.
                </p>
              </div>
              <div className="transform hover:translate-x-2 transition-transform">
                <h3 className="font-semibold mb-2 dark:text-white">How long do transfers take?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Transfer times vary depending on the chains involved, but typically complete within 5-15 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}