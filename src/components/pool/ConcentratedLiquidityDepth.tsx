import React from 'react';
import { useDex } from '../../context/DexContext';
import { BarChart3, Layers } from 'lucide-react';

const BINS = [
  { price: 3200, depth: 15 },
  { price: 3300, depth: 35 },
  { price: 3400, depth: 75 },
  { price: 3450, depth: 95 }, // Current price
  { price: 3500, depth: 85 },
  { price: 3600, depth: 40 },
  { price: 3700, depth: 20 },
];

export const ConcentratedLiquidityDepth: React.FC = () => {
  const { fromToken, toToken } = useDex();

  return (
    <div className="bg-[#0e1017] border border-[#1e2330] rounded-3xl p-6 select-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1e2330]">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
            Uniswap v3 Concentrated Liquidity Density
          </h3>
        </div>
        <span className="text-[10px] text-zinc-400 font-mono">Active Price Range: $3,200 - $3,700</span>
      </div>

      {/* Visual Depth Histogram */}
      <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2">
        {BINS.map(b => {
          const isCurrent = b.price === 3450;

          return (
            <div key={b.price} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
              <div
                style={{ height: `${b.depth}%` }}
                className={`w-full rounded-t-lg transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-t from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-[#181d2c] hover:bg-[#20273c]'
                }`}
              />
              <span className={`text-[10px] font-mono ${isCurrent ? 'text-cyan-400 font-bold' : 'text-zinc-500'}`}>
                ${b.price}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
