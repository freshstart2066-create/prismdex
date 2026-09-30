import React from 'react';
import { useDex } from '../../context/DexContext';
import { GitMerge, Layers, Zap, ShieldCheck } from 'lucide-react';

export const MultiHopRoutingGraph: React.FC = () => {
  const { fromToken, toToken, fromAmount, route } = useDex();

  return (
    <div className="bg-[#0e1017] border border-[#1e2330] rounded-3xl p-6 select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1e2330]">
        <div className="flex items-center gap-2">
          <GitMerge className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
            Optimal Smart Order Routing (SOR)
          </h3>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          Save ~${(parseFloat(fromAmount || '1') * 4.2).toFixed(2)} vs Single DEX
        </span>
      </div>

      {/* Visual Routing Graph SVG */}
      <div className="relative h-44 bg-[#090b10] border border-[#171b26] rounded-2xl p-4 flex items-center justify-between overflow-hidden">
        {/* Animated Liquidity Flow Stream SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="route-line-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="route-line-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Top Hop Line (Uniswap v3 65%) */}
          <path d="M 80 88 C 160 40, 240 40, 320 40 C 400 40, 480 88, 560 88" fill="none" stroke="url(#route-line-1)" strokeWidth="2.5" />
          <circle r="3.5" fill="#00f0ff" className="filter drop-shadow-[0_0_6px_#00f0ff]">
            <animateMotion path="M 80 88 C 160 40, 240 40, 320 40 C 400 40, 480 88, 560 88" dur="1.4s" repeatCount="indefinite" />
          </circle>

          {/* Bottom Hop Line (Curve 35%) */}
          <path d="M 80 88 C 160 136, 240 136, 320 136 C 400 136, 480 88, 560 88" fill="none" stroke="url(#route-line-2)" strokeWidth="2" strokeDasharray="4 4" />
          <circle r="3" fill="#a855f7" className="filter drop-shadow-[0_0_6px_#a855f7]">
            <animateMotion path="M 80 88 C 160 136, 240 136, 320 136 C 400 136, 480 88, 560 88" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Input Token Badge (Left) */}
        <div className="relative z-10 p-3 bg-[#131722] border border-[#232a3d] rounded-2xl flex items-center gap-2.5 shadow-xl">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor: fromToken.color }}>
            {fromToken.symbol[0]}
          </div>
          <div>
            <span className="text-xs font-bold text-white font-mono">{fromAmount} {fromToken.symbol}</span>
            <span className="text-[10px] text-zinc-400 block font-mono">100% In</span>
          </div>
        </div>

        {/* Middle DEX Pool Nodes */}
        <div className="relative z-10 flex flex-col justify-between h-full py-1">
          {/* Top Pool: Uniswap v3 65% */}
          <div className="p-2 bg-[#121624] border border-cyan-500/40 rounded-xl flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <div>
              <span className="text-xs font-bold text-white font-mono">Uniswap v3 (65%)</span>
              <span className="text-[9px] text-zinc-400 block font-mono">0.05% Fee Tier</span>
            </div>
          </div>

          {/* Bottom Pool: Curve 35% */}
          <div className="p-2 bg-[#121624] border border-purple-500/40 rounded-xl flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div>
              <span className="text-xs font-bold text-white font-mono">Curve Finance (35%)</span>
              <span className="text-[9px] text-zinc-400 block font-mono">0.01% Low-Slippage</span>
            </div>
          </div>
        </div>

        {/* Output Token Badge (Right) */}
        <div className="relative z-10 p-3 bg-[#131722] border border-[#232a3d] rounded-2xl flex items-center gap-2.5 shadow-xl">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor: toToken.color }}>
            {toToken.symbol[0]}
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 font-mono">{route.estimatedOutput} {toToken.symbol}</span>
            <span className="text-[10px] text-zinc-400 block font-mono">100% Settled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
