import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Transaction = {
  success: boolean;
  txHash: string;
  from: string;
  to: string;
  amount: string;
  timestamp: string;
};

const styles = {
  page: "min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 md:pt-24 transition-colors duration-300",
  container: "container mx-auto px-4 py-4 md:py-8",
  grid: "grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8",

  card: "bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 animate-fade-in",
  historyHeader: "text-xl md:text-2xl font-bold mb-4 md:mb-6 dark:text-white",
  txItem: (isSelected: boolean) =>
    `p-3 md:p-4 rounded-lg md:rounded-xl border transition-all cursor-pointer hover:shadow-md ${
      isSelected ? "border-purple-500 bg-purple-50 dark:bg-gray-700" : "border-gray-200 dark:border-gray-700"
    }`,
  txDetails: "flex items-center justify-between",
  txInfo: "flex items-center space-x-2 md:space-x-3",
  txText: "font-medium text-sm md:text-base dark:text-white truncate max-w-[100px] md:max-w-[150px]",
  txTime: "text-xs md:text-sm text-gray-500 dark:text-gray-400",
  txAmountRight: "text-right",
  txAmount: "font-medium text-sm md:text-base dark:text-white",
  txTo: "text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate max-w-full",

  newTransferBtn:
    "w-full bg-purple-600 dark:bg-purple-500 text-white py-2 md:py-3 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2",

  detailsCard: "bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 animate-fade-in lg:sticky lg:top-24",
  detailsHeader: "text-lg md:text-xl font-bold mb-3 md:mb-4 dark:text-white",
  row: "flex flex-col md:flex-row md:justify-between py-2 border-b dark:border-gray-700",
  lastRow: "flex flex-col md:flex-row md:justify-between py-2",
  label: "text-gray-600 dark:text-gray-300 text-sm md:text-base",
  mono: "font-mono text-xs md:text-sm dark:text-white break-all",
  value: "font-medium text-sm md:text-base dark:text-white",

  etherscanLink:
    "flex items-center justify-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300",

  fullDetailsBtn:
    "w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm md:text-base",
};

export default function TransactionHistory() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  useEffect(() => {
    const defaultTxs: Transaction[] = [
      {
        success: true,
        txHash: "0x5b5e5b561b3479c110c155b8582e50d4b4a4d2d54c01571d0293581ebdfb8b26",
        from: "0x8fB5F72B24f03362EAFed7e62BAEB0D052bD56cE",
        to: "0x66BF5E8AB086fBB6243516cc7597059de90644d0",
        amount: "0.001",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      },
      {
        success: true,
        txHash: "0xd750a60e77cf688d1c2383a3e21e018e8c43e5d944b6d5d1ee3cf7f84a7e6f75",
        from: "0x8fB5F72B24f03362EAFed7e62BAEB0D052bD56cE",
        to: "0x66BF5E8AB086fBB6243516cc7597059de90644d0",
        amount: "0.001",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
      },
      {
        success: true,
        txHash: "0x172c940a6f648f844df9c35d87dfc9f0bd980180cfc38910a259fca19e0c179b",
        from: "0x8fB5F72B24f03362EAFed7e62BAEB0D052bD56cE",
        to: "0x66BF5E8AB086fBB6243516cc7597059de90644d0",
        amount: "0.001",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      }
    ];

    // Get stored transactions or use defaults
    let storedTxs: Transaction[] = JSON.parse(localStorage.getItem("all_tx") || "null") || defaultTxs;

    // Always add a new transaction when the page loads
    const newTx: Transaction = {
      success: true,
      txHash: `0x${Math.random().toString(16).substring(2, 64)}`,
      from: "0x8fB5F72B24f03362EAFed7e62BAEB0D052bD56cE",
      to: "0x66BF5E8AB086fBB6243516cc7597059de90644d0",
      amount: "0.001", // Fixed amount of 0.001 instead of random
      timestamp: new Date().toISOString()
    };

    // Add the new transaction to the beginning of the array
    storedTxs = [newTx, ...storedTxs];
    
    // Save updated transactions to localStorage
    localStorage.setItem("all_tx", JSON.stringify(storedTxs));

    // Update state
    setTransactions(storedTxs);
    setSelectedTx(storedTxs[0]);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Transaction List */}
          <div className="lg:col-span-2">
            <div className={styles.card}>
              <h2 className={styles.historyHeader}>
                Transaction History 
                <span className="text-sm md:text-base ml-2 text-gray-500">({transactions.length})</span>
              </h2>
              <div className="space-y-2 md:space-y-3">
                {transactions.map((tx, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTx(tx)}
                    className={styles.txItem(selectedTx?.txHash === tx.txHash)}
                  >
                    <div className={styles.txDetails}>
                      <div className={styles.txInfo}>
                        <span className={styles.txText}>{tx.txHash.slice(0, 10)}...</span>
                        {index === 0 && (
                          <span className="ml-1 px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <div className={styles.txAmountRight}>
                        <div className={styles.txAmount}>{tx.amount} ETH</div>
                        <div className={styles.txTime}>
                          {new Date(tx.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                    <div className={styles.txTo}>To: {tx.to.slice(0, 10)}...</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 md:mt-6">
                <button
                  onClick={() => navigate('/transfer')}
                  className={styles.newTransferBtn}
                >
                  <span>New Transfer</span>
                  <ArrowRight size={16} className="md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Transaction Detail */}
          <div className="mt-4 lg:mt-0">
            <div className={styles.detailsCard}>
              {selectedTx && (
                <>
                  <h2 className={styles.detailsHeader}>Details</h2>
                  <div className={styles.row}>
                    <span className={styles.label}>Status:</span>
                    <span className={styles.value}>{selectedTx.success ? "✅ Success" : "❌ Failed"}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Hash:</span>
                    <span className={styles.mono}>{selectedTx.txHash.slice(0, 18)}...</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>From:</span>
                    <span className={styles.mono}>{selectedTx.from.slice(0, 10)}...</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>To:</span>
                    <span className={styles.mono}>{selectedTx.to.slice(0, 10)}...</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Amount:</span>
                    <span className={styles.value}>{selectedTx.amount} ETH</span>
                  </div>
                  <div className={styles.lastRow}>
                    <span className={styles.label}>Time:</span>
                    <span className={styles.value}>
                      {new Date(selectedTx.timestamp).toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
