import React from 'react';
import { DexProvider } from './context/DexContext';
import { DexHeader } from './components/header/DexHeader';
import { SwapCard } from './components/swap/SwapCard';
import { MultiHopRoutingGraph } from './components/routing/MultiHopRoutingGraph';
import { ConcentratedLiquidityDepth } from './components/pool/ConcentratedLiquidityDepth';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#08090d] text-zinc-100 font-sans select-none overflow-x-hidden">
      {/* Top Header */}
      <DexHeader />

      {/* Main Aggregator Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Swap Card (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <SwapCard />
        </div>

        {/* Right Column: Routing Graph & Liquidity Depth (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <MultiHopRoutingGraph />
          <ConcentratedLiquidityDepth />
        </div>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DexProvider>
      <AppContent />
    </DexProvider>
  );
};

export default App;
