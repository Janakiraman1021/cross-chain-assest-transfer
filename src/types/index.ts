export type Chain = 'Ethereum' | 'Polygon' | 'Solana' | 'Aptos';

export type Token = {
  symbol: string;
  name: string;
  icon: string;
};

export type Transaction = {
  id: string;
  fromChain: Chain;
  toChain: Chain;
  fromAddress: string;
  toAddress: string;
  token: Token;
  amount: string;
  status: 'pending' | 'success' | 'failed';
  date: string;
};

export type TransactionResponse = {
  success: boolean;
  txHash: string;
  from: string;
  to: string;
  amount: string;
};