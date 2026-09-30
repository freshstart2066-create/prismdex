export type ChainId = 'ethereum' | 'arbitrum' | 'solana' | 'base' | 'polygon';

export interface Token {
  symbol: string;
  name: string;
  decimals: number;
  priceUsd: number;
  change24h: number;
  iconUrl?: string;
  balance: number;
  color: string;
}

export interface RouteHop {
  poolName: 'Uniswap v3' | 'Curve Finance' | 'Balancer' | 'SushiSwap';
  percentage: number;
  fromToken: string;
  toToken: string;
  feeTier: string;
}

export interface SwapRoute {
  hops: RouteHop[];
  estimatedOutput: number;
  guaranteedMinOutput: number;
  priceImpact: number;
  gasCostUsd: number;
  executionTimeMs: number;
  routeType: 'Optimal Split' | 'Direct Pool' | 'Multi-Hop Tri-Pool';
}
