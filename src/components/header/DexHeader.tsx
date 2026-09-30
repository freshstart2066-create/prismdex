import React from 'react';
import { useDex } from '../../context/DexContext';
import { 
  Sparkles, 
  Wallet, 
  Fuel, 
  Globe, 
  Layers, 
  ChevronDown 
} from 'lucide-react';
import { ChainId } from '../../types/dex';

const CHAINS: { id: ChainId; name: string; color: string }[] = [
  { id: 'ethereum', name: 'Ethereum', color: '#627eea' },
  { id: 'arbitrum', name: 'Arbitrum One', color: '#28a0f0' },
  { id: 'base', name: 'Base', color: '#0052ff' },
  { id: 'solana', name: 'Solana', color: '#14f195' },
];

export const DexHeader: React.FC = () => {
  const { activeChain, setActiveChain, gasGwei } = useDex();

  return (
    <header className="h-16 bg-[#090b10] border-b border-[#1e2330] px-6 flex items-center justify-between select-none z-30">
      {/* Brand & Chain Switcher */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm font-mono tracking-wider">PRISM<span className="text-cyan-400">DEX</span></span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.2 rounded border border-cyan-500/30 font-mono">
                AGGREGATOR
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">Cross-Chain Multi-Hop Liquidity Routing</p>
          </div>
        </div>

        {/* Chain Selector */}
        <div className="flex items-center gap-1.5 bg-[#121520] border border-[#1e2330] p-1 rounded-xl text-xs font-mono">
          {CHAINS.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveChain(c.id)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeChain === c.id
                  ? 'bg-white text-black font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Right Readouts */}
      <div className="flex items-center gap-4">
        {/* Gas Tracker */}
        <div className="flex items-center gap-1.5 bg-[#121520] border border-[#1e2330] px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-300">
          <Fuel className="w-3.5 h-3.5 text-amber-400" />
          <span>{gasGwei} Gwei</span>
        </div>

        {/* Connected Wallet Badge */}
        <div className="flex items-center gap-2 bg-[#121520] border border-[#1e2330] px-3 py-1.5 rounded-xl text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-white font-bold">0x742d...44e</span>
        </div>

        {/* GitHub Link */}
        <a
          href="https://github.com/freshstart2066-create/prismdex"
          target="_blank"
          rel="noreferrer"
          className="p-2 bg-[#121520] hover:bg-[#191e2e] border border-[#1e2330] text-zinc-400 hover:text-white rounded-xl transition-colors cursor-pointer"
          title="View GitHub Repository"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
      </div>
    </header>
  );
};
