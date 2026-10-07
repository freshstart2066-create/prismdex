# 🌈 PrismDEX — Concentrated Liquidity AMM & Multi-Hop Swap Simulator

[![React 19](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**PrismDEX** is a high-performance visual decentralized exchange (DEX) terminal, concentrated liquidity pool simulator, and multi-hop routing graph analyzer inspired by Uniswap v3/v4.

Designed for DeFi engineers and traders to visualize automated market maker (AMM) tick pricing, slippage impact curves, multi-hop liquidity routing paths, and concentrated position fee earnings.

---

## ⚡ Key Features

- **Concentrated Liquidity Depth Visualizer**: Real-time tick bar chart displaying active liquidity distributions across price intervals $[p_a, p_b]$.
- **Multi-Hop Swap Routing Engine**: Graph-based pathfinder identifying optimal execution routes across synthetic liquidity pools (e.g. `ETH -> USDC -> WBTC`) to minimize price impact and slippage.
- **Interactive Swap Card**:
  - 🔄 Instant slippage calculation ($0.1\%, 0.5\%, 1.0\%$) and minimum received guarantees.
  - ⚡ Price impact warnings with simulated gas fee estimation.
  - 💱 Token balance state machine with live price feeds.
- **Pool Analytics & Fee Tier Modeling**: Configurable pool fee tiers ($0.01\%, 0.05\%, 0.30\%, 1.00\%$) with simulated 24h volume, TVL, and APR calculations.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React.
- **AMM Math**: Concentrated liquidity invariant math ($L = \frac{\Delta y}{\sqrt{P_b} - \sqrt{P_a}}$).
- **State**: React DEX Context with atomic trade execution simulation.
- **Build**: Vite 6, Oxlint.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/freshstart2066-create/prismdex.git
cd prismdex

# Install dependencies
npm install

# Start development terminal
npm run dev
```

---

## 📄 License

Licensed under the **Apache License, Version 2.0**.
