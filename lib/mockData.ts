export const mockAdaPrice = {
  price: 0.4821,
  change24h: 3.42,
  volume24h: 18_400_000,
};

import type { TrendingToken } from "@/lib/api";

export const mockTrendingTokens: TrendingToken[] = [
  { rank: 1, ticker: "SNEK",  price: 0.003241, totalTxns: 420, buyCount: 240, sellCount: 180 },
  { rank: 2, ticker: "MIN",   price: 0.0541,   totalTxns: 310, buyCount: 180, sellCount: 130 },
  { rank: 3, ticker: "HUNT",  price: 0.00812,  totalTxns: 205, buyCount:  90, sellCount: 115 },
  { rank: 4, ticker: "INDY",  price: 1.234,    totalTxns: 180, buyCount: 110, sellCount:  70 },
  { rank: 5, ticker: "WMT",   price: 0.1872,   totalTxns: 155, buyCount:  70, sellCount:  85 },
];

import type { Trade } from "@/lib/api";

export const mockRecentTrades: Trade[] = [
  { id: "t1", tradeType: "Buy",  tokenIn: "ADA",  tokenOut: "SNEK", adaAmount: 500,   tokenAmount: 154_289, dex: "Minswap",    timestamp: new Date(Date.now() - 12000).toISOString() },
  { id: "t2", tradeType: "Sell", tokenIn: "SNEK", tokenOut: "ADA",  adaAmount: 807,   tokenAmount: 250_000, dex: "SundaeSwap", timestamp: new Date(Date.now() - 45000).toISOString() },
  { id: "t3", tradeType: "Buy",  tokenIn: "ADA",  tokenOut: "MIN",  adaAmount: 1000,  tokenAmount: 18_412,  dex: "Minswap",    timestamp: new Date(Date.now() - 78000).toISOString() },
  { id: "t4", tradeType: "Buy",  tokenIn: "ADA",  tokenOut: "INDY", adaAmount: 2500,  tokenAmount: 2021,    dex: "WingRiders", timestamp: new Date(Date.now() - 120000).toISOString() },
  { id: "t5", tradeType: "Sell", tokenIn: "WMT",  tokenOut: "ADA",  adaAmount: 935,   tokenAmount: 5000,    dex: "MuesliSwap", timestamp: new Date(Date.now() - 180000).toISOString() },
  { id: "t6", tradeType: "Buy",  tokenIn: "ADA",  tokenOut: "HUNT", adaAmount: 750,   tokenAmount: 92_241,  dex: "VyFinance",  timestamp: new Date(Date.now() - 240000).toISOString() },
  { id: "t7", tradeType: "Buy",  tokenIn: "ADA",  tokenOut: "SNEK", adaAmount: 200,   tokenAmount: 61_541,  dex: "Spectrum",   timestamp: new Date(Date.now() - 310000).toISOString() },
  { id: "t8", tradeType: "Sell", tokenIn: "MIN",  tokenOut: "ADA",  adaAmount: 540,   tokenAmount: 10_000,  dex: "Minswap",    timestamp: new Date(Date.now() - 380000).toISOString() },
];
