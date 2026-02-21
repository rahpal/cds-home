export const mockAdaPrice = {
  price: 0.4821,
  change24h: 3.42,
  volume24h: 18_400_000,
};

export interface TrendingToken {
  rank: number;
  ticker: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
}

export const mockTrendingTokens: TrendingToken[] = [
  { rank: 1, ticker: "SNEK", name: "Snek", price: 0.003241, change24h: 12.4, volume24h: 890_000 },
  { rank: 2, ticker: "MIN", name: "Minswap", price: 0.0541, change24h: 5.7, volume24h: 620_000 },
  { rank: 3, ticker: "HUNT", name: "Hunter Coin", price: 0.00812, change24h: -3.2, volume24h: 430_000 },
  { rank: 4, ticker: "INDY", name: "Indigo", price: 1.234, change24h: 8.1, volume24h: 310_000 },
  { rank: 5, ticker: "WMT", name: "World Mobile", price: 0.1872, change24h: -1.8, volume24h: 280_000 },
];

export interface Trade {
  id: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: number;
  amountOut: number;
  dex: string;
  timestamp: Date;
}

const now = Date.now();
export const mockRecentTrades: Trade[] = [
  { id: "t1", tokenIn: "ADA", tokenOut: "SNEK", amountIn: 500, amountOut: 154_289, dex: "Minswap", timestamp: new Date(now - 12000) },
  { id: "t2", tokenIn: "SNEK", tokenOut: "ADA", amountIn: 250_000, amountOut: 807, dex: "SundaeSwap", timestamp: new Date(now - 45000) },
  { id: "t3", tokenIn: "ADA", tokenOut: "MIN", amountIn: 1000, amountOut: 18_412, dex: "Minswap", timestamp: new Date(now - 78000) },
  { id: "t4", tokenIn: "ADA", tokenOut: "INDY", amountIn: 2500, amountOut: 2021, dex: "WingRiders", timestamp: new Date(now - 120000) },
  { id: "t5", tokenIn: "WMT", tokenOut: "ADA", amountIn: 5000, amountOut: 935, dex: "MuesliSwap", timestamp: new Date(now - 180000) },
  { id: "t6", tokenIn: "ADA", tokenOut: "HUNT", amountIn: 750, amountOut: 92_241, dex: "VyFinance", timestamp: new Date(now - 240000) },
  { id: "t7", tokenIn: "ADA", tokenOut: "SNEK", amountIn: 200, amountOut: 61_541, dex: "Spectrum", timestamp: new Date(now - 310000) },
  { id: "t8", tokenIn: "MIN", tokenOut: "ADA", amountIn: 10_000, amountOut: 540, dex: "Minswap", timestamp: new Date(now - 380000) },
];
