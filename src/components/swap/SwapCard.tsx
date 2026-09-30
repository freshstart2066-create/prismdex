import React, { useState } from 'react';
import { useDex } from '../../context/DexContext';
import { 
  ArrowDownUp, 
  Settings, 
  Zap, 
  Fuel, 
  ShieldCheck, 
  ChevronDown,
  Loader2
} from 'lucide-react';
import { Token } from '../../types/dex';

export const SwapCard: React.FC = () => {
  const { 
    tokens, 
    fromToken, 
    setFromToken, 
    toToken, 
    setToToken, 
    fromAmount, 
    setFromAmount, 
    route, 
    isSwapping, 
    executeSwap,
    slippageTolerance,
    setSlippageTolerance,
    gasGwei 
  } = useDex();

  const [showSettings, setShowSettings] = useState(false);
  const [isFromSelectOpen, setIsFromSelectOpen] = useState(false);
  const [isToSelectOpen, setIsToSelectOpen] = useState(false);

  const handleFlip = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  return (
    <div className="w-full max-w-lg bg-[#0e1017] border border-[#1e2330] rounded-3xl p-6 select-none shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1e2330]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white font-mono">Swap Tokens</span>
          <span className="text-[10px] bg-cyan-500/10 text-cyan-400 font-bold px-2 py-0.5 rounded-full border border-cyan-500/20 font-mono">
            Zero MEV Slippage
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Slippage Settings Drawer */}
      {showSettings && (
        <div className="p-3 bg-[#131722] border border-[#1e2330] rounded-2xl space-y-2 text-xs font-mono">
          <div className="flex justify-between text-zinc-400">
            <span>Max Slippage Tolerance:</span>
            <span className="text-cyan-400 font-bold">{slippageTolerance}%</span>
          </div>
          <div className="flex items-center gap-2">
            {[0.1, 0.5, 1.0].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setSlippageTolerance(s)}
                className={`flex-1 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  slippageTolerance === s ? 'bg-cyan-500 text-black' : 'bg-[#090b10] text-zinc-400 hover:text-white'
                }`}
              >
                {s}%
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FROM Token Input Box */}
      <div className="p-4 bg-[#121520] border border-[#1e2330] rounded-2xl space-y-2">
        <div className="flex justify-between text-xs text-zinc-400 font-mono">
          <span>You Pay</span>
          <span>Balance: {fromToken.balance} {fromToken.symbol}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-transparent text-2xl font-bold text-white font-mono focus:outline-none placeholder:text-zinc-600"
          />

          {/* Token Selector */}
          <button
            type="button"
            onClick={() => setIsFromSelectOpen(!isFromSelectOpen)}
            className="flex items-center gap-2 bg-[#191e2e] hover:bg-[#20273c] border border-[#232a3d] px-3 py-1.5 rounded-xl text-xs font-bold text-white font-mono transition-all cursor-pointer shrink-0"
          >
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: fromToken.color }}>
              {fromToken.symbol[0]}
            </span>
            <span>{fromToken.symbol}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        </div>

        <span className="text-[11px] text-zinc-500 font-mono block">
          ≈ ${((parseFloat(fromAmount || '0')) * fromToken.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
        </span>
      </div>

      {/* Flip Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <button
          type="button"
          onClick={handleFlip}
          className="p-2 bg-[#191e2e] hover:bg-cyan-500 hover:text-black border border-[#232a3d] text-zinc-300 rounded-full transition-all cursor-pointer shadow-lg hover:scale-110"
          title="Switch Tokens"
        >
          <ArrowDownUp className="w-4 h-4" />
        </button>
      </div>

      {/* TO Token Output Box */}
      <div className="p-4 bg-[#121520] border border-[#1e2330] rounded-2xl space-y-2">
        <div className="flex justify-between text-xs text-zinc-400 font-mono">
          <span>You Receive (Estimated)</span>
          <span>Balance: {toToken.balance} {toToken.symbol}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-2xl font-bold text-emerald-400 font-mono">
            {route.estimatedOutput}
          </span>

          {/* Token Selector */}
          <button
            type="button"
            onClick={() => setIsToSelectOpen(!isToSelectOpen)}
            className="flex items-center gap-2 bg-[#191e2e] hover:bg-[#20273c] border border-[#232a3d] px-3 py-1.5 rounded-xl text-xs font-bold text-white font-mono transition-all cursor-pointer shrink-0"
          >
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ backgroundColor: toToken.color }}>
              {toToken.symbol[0]}
            </span>
            <span>{toToken.symbol}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        </div>

        <span className="text-[11px] text-zinc-500 font-mono block">
          Guaranteed Min: {route.guaranteedMinOutput} {toToken.symbol}
        </span>
      </div>

      {/* Swap Breakdown Accordion */}
      <div className="p-3 bg-[#131722] border border-[#1e2330] rounded-2xl space-y-1.5 text-[11px] font-mono">
        <div className="flex justify-between text-zinc-400">
          <span>Rate</span>
          <span className="text-white">1 {fromToken.symbol} = {(fromToken.priceUsd / toToken.priceUsd).toFixed(4)} {toToken.symbol}</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>Price Impact</span>
          <span className="text-emerald-400 font-bold">{route.priceImpact}%</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>Network Gas Fee</span>
          <span className="text-zinc-200 flex items-center gap-1">
            <Fuel className="w-3 h-3 text-amber-400" />
            ${route.gasCostUsd} ({gasGwei} Gwei)
          </span>
        </div>
      </div>

      {/* Execute Swap Button */}
      <button
        type="button"
        onClick={executeSwap}
        disabled={isSwapping || parseFloat(fromAmount || '0') <= 0}
        className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 disabled:opacity-50 text-black font-extrabold text-sm uppercase tracking-wider rounded-2xl transition-all cursor-pointer shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 font-mono"
      >
        {isSwapping ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-black" />
            <span>Executing Atomic Swap...</span>
          </>
        ) : (
          <span>Execute Multi-Hop Swap</span>
        )}
      </button>
    </div>
  );
};
