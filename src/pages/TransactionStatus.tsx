import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CheckCircle, Clock, XCircle, ExternalLink } from 'lucide-react';

interface TransactionData {
  success: boolean;
  txHash: string;
  from: string;
  to: string;
  amount: string;
}

export default function TransactionStatus() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [transaction, setTransaction] = useState<TransactionData | null>(null);
  
  // Check if transaction data was passed via location state
  useEffect(() => {
    if (location.state && location.state.transaction) {
      setTransaction(location.state.transaction);
    } else if (id) {
      // If no state was passed but we have an ID, fetch from API
      fetch(`http://localhost:5000/transaction/${id}`)
        .then(response => response.json())
        .then(data => setTransaction(data))
        .catch(error => console.error('Error fetching transaction:', error));
    }
  }, [id, location.state]);
  
  // If transaction is still loading
  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <Clock size={48} className="text-yellow-500 animate-pulse" />
        <p className="ml-4 text-xl dark:text-white">Loading transaction data...</p>
      </div>
    );
  }

  const getStatusIcon = () => {
    if (transaction.success) {
      return <CheckCircle size={48} className="text-green-500" />;
    } else {
      return <XCircle size={48} className="text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
          <div className="flex flex-col items-center mb-8">
            {getStatusIcon()}
            <h1 className="text-3xl font-bold mt-4 dark:text-white">Transaction Status</h1>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between py-4 border-b dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Transaction Hash</span>
              <span className="font-medium dark:text-white font-mono">{transaction.txHash}</span>
            </div>

            <div className="flex justify-between py-4 border-b dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">From Address</span>
              <span className="font-medium dark:text-white font-mono">{transaction.from}</span>
            </div>

            <div className="flex justify-between py-4 border-b dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">To Address</span>
              <span className="font-medium dark:text-white font-mono">{transaction.to}</span>
            </div>

            <div className="flex justify-between py-4 border-b dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Amount</span>
              <span className="font-medium dark:text-white">{transaction.amount} ETH</span>
            </div>

            <div className="flex justify-between py-4">
              <span className="text-gray-600 dark:text-gray-300">Status</span>
              <span className={`font-medium capitalize ${transaction.success ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.success ? 'Success' : 'Failed'}
              </span>
            </div>

            <div className="flex flex-col space-y-4 mt-8">
              <a
                href={`https://etherscan.io/tx/${transaction.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transform hover:scale-105 transition-all"
              >
                <span>View on Ethereum Explorer</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}