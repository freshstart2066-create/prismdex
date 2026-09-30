import React, { createContext, useContext, useState, useEffect } from 'react';
import { Token, ChainId, SwapRoute } from '../types/dex';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warn';
}

interface DexContextType {
  tokens: Token[];
  fromToken: Token;
  setFromToken: (token: Token) => void;
  toToken: Token;
  setToToken: (token: Token) => void;
  fromAmount: string;
  setFromAmount: (amount: string) => void;
  
  activeChain: ChainId;
  setActiveChain: (chain: ChainId) => void;
  slippageTolerance: number;
  setSlippageTolerance: (s: number) => void;
  
  route: SwapRoute;
  isSwapping: boolean;
  executeSwap: () => void;
  gasGwei: number;
  
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'info' | 'warn') => void;
}

const TOKENS: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', decimals: 18, priceUsd: 3450.20, change24h: 3.4, balance: 4.85, color: '#627eea' },
  { symbol: 'USDC', name: 'USD Coin', decimals: 6, priceUsd: 1.00, change24h: 0.01, balance: 12450.00, color: '#2775ca' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', decimals: 8, priceUsd: 89400.50, change24h: 4.8, balance: 0.42, color: '#f7931a' },
  { symbol: 'SOL', name: 'Solana', decimals: 9, priceUsd: 195.40, change24h: -1.2, balance: 28.50, color: '#14f195' },
  { symbol: 'ARB', name: 'Arbitrum', decimals: 18, priceUsd: 1.15, change24h: 6.7, balance: 2400.00, color: '#28a0f0' },
  { symbol: 'UNI', name: 'Uniswap', decimals: 18, priceUsd: 9.80, change24h: 2.1, balance: 350.00, color: '#ff007a' }
];

const DexContext = createContext<DexContextType | null>(null);

export const DexProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState<Token[]>(TOKENS);
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]); // ETH
  const [toToken, setToToken] = useState<Token>(TOKENS[1]); // USDC
  const [fromAmount, setFromAmount] = useState<string>('1.5');
  const [activeChain, setActiveChain] = useState<ChainId>('ethereum');
  const [slippageTolerance, setSlippageTolerance] = useState<number>(0.5);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [gasGwei, setGasGwei] = useState<number>(14);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warn' = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Live gas fluctuation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setGasGwei(Math.floor(12 + Math.random() * 6));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Compute Optimal Multi-Hop Route
  const amountNum = parseFloat(fromAmount) || 0;
  const rawOutputUsd = amountNum * fromToken.priceUsd;
  const estimatedTokensOut = rawOutputUsd / toToken.priceUsd;
  const priceImpact = amountNum > 10 ? 0.28 : 0.04;
  const guaranteedMinOutput = estimatedTokensOut * (1 - slippageTolerance / 100);

  const route: SwapRoute = {
    hops: [
      {
        poolName: 'Uniswap v3',
        percentage: 65,
        fromToken: fromToken.symbol,
        toToken: toToken.symbol,
        feeTier: '0.05%'
      },
      {
        poolName: 'Curve Finance',
        percentage: 35,
        fromToken: fromToken.symbol,
        toToken: toToken.symbol,
        feeTier: '0.01%'
      }
    ],
    estimatedOutput: +estimatedTokensOut.toFixed(4),
    guaranteedMinOutput: +guaranteedMinOutput.toFixed(4),
    priceImpact,
    gasCostUsd: +(gasGwei * 0.18).toFixed(2),
    executionTimeMs: 420,
    routeType: 'Optimal Split'
  };

  const executeSwap = () => {
    if (amountNum <= 0) return;
    setIsSwapping(true);
    showToast(`Broadcasting transaction to ${activeChain.toUpperCase()} mempool...`, 'info');

    setTimeout(() => {
      // Deduct fromToken and credit toToken
      setTokens(prev => prev.map(t => {
        if (t.symbol === fromToken.symbol) {
          return { ...t, balance: Math.max(0, +(t.balance - amountNum).toFixed(4)) };
        }
        if (t.symbol === toToken.symbol) {
          return { ...t, balance: +(t.balance + route.estimatedOutput).toFixed(4) };
        }
        return t;
      }));

      const txHash = `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}...`;
      setIsSwapping(false);
      showToast(`🎉 Swapped ${fromAmount} ${fromToken.symbol} for ${route.estimatedOutput} ${toToken.symbol}! (Tx: ${txHash})`, 'success');
    }, 1200);
  };

  return (
    <DexContext.Provider
      value={{
        tokens,
        fromToken,
        setFromToken,
        toToken,
        setToToken,
        fromAmount,
        setFromAmount,
        activeChain,
        setActiveChain,
        slippageTolerance,
        setSlippageTolerance,
        route,
        isSwapping,
        executeSwap,
        gasGwei,
        toasts,
        showToast
      }}
    >
      {children}
    </DexContext.Provider>
  );
};

export const useDex = () => {
  const context = useContext(DexContext);
  if (!context) {
    throw new Error('useDex must be used within a DexProvider');
  }
  return context;
};
