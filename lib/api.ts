import { createHash, createDecipheriv } from "crypto";

const API_BASE = "https://cardexscan.com/api";
const API_KEY = "7c6095cf2eeeac500667241439ab5c3eac2488b9962526ca7f543d76b56a7c";
const SECRET = "61553794402181761075972151624328";

// --- AES decryption (OpenSSL EVP_BytesToKey, matches CryptoJS string-key mode) ---

function evpBytesToKey(
  password: string,
  salt: Buffer,
  keyLen: number,
  ivLen: number
): { key: Buffer; iv: Buffer } {
  const chunks: Buffer[] = [];
  let prev = Buffer.alloc(0);
  while (chunks.reduce((n, b) => n + b.length, 0) < keyLen + ivLen) {
    prev = createHash("md5")
      .update(Buffer.concat([prev, Buffer.from(password), salt]))
      .digest();
    chunks.push(prev);
  }
  const all = Buffer.concat(chunks);
  return { key: all.subarray(0, keyLen), iv: all.subarray(keyLen, keyLen + ivLen) };
}

function decrypt(encryptedText: string): any {
  const buf = Buffer.from(encryptedText, "base64");
  // OpenSSL format: "Salted__" (8 bytes) + salt (8 bytes) + ciphertext
  const salt = buf.subarray(8, 16);
  const ciphertext = buf.subarray(16);
  const { key, iv } = evpBytesToKey(SECRET, salt, 32, 16);
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return JSON.parse(decrypted.toString("utf8"));
}

// --- HTTP helpers ---

async function cdsGet(path: string, params?: Record<string, string>): Promise<any> {
  const url = new URL(`${API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    headers: { "x-api-key": API_KEY },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`CDS API ${path} → HTTP ${res.status}`);
  return res.json();
}

async function cdsPost(path: string, body: unknown): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`CDS API ${path} → HTTP ${res.status}`);
  return res.json();
}

// --- ADA Price ---

export interface AdaPrice {
  price: number;
  change24h: number;
  volume24h: number;
}

export async function fetchAdaPrice(): Promise<AdaPrice> {
  const raw = await cdsGet("/adaprice");
  const data = decrypt(raw.data);
  const inner = data?.adaPrice?.value ?? data;
  return {
    price: inner?.price ?? inner?.priceUSD ?? 0,
    change24h: inner?.priceChange24h ?? inner?.change24h ?? inner?.change_24h ?? 0,
    volume24h: inner?.volume24h ?? inner?.volumeUSD ?? 0,
  };
}

// --- Trending Tokens ---

export interface TrendingToken {
  rank: number;
  ticker: string;
  price: number; // price in ADA
  totalTxns: number;
  buyCount: number;
  sellCount: number;
}

export async function fetchTrendingTokens(count = 5): Promise<TrendingToken[]> {
  const raw = await cdsGet("/tokens/trending", {
    timeframe: "1 day",
    count: String(count),
  });
  const list: any[] = decrypt(raw.trendingTokens) ?? [];
  const top = list.slice(0, count);

  // Fetch prices for all trending tokens in one POST
  const policyIdList = top.map((t: any) => t.policyId).filter(Boolean);
  const hexList = top.map((t: any) => t.assetNameHex).filter(Boolean);
  let priceMap: Record<string, number> = {};
  try {
    const priceRaw = await cdsPost("/wallet/tokens/list", { policyIdList, hexList });
    const priceList: any[] = decrypt(priceRaw.table) ?? [];
    for (const p of priceList) {
      if (p.policyId && p.assetNameHex) {
        priceMap[`${p.policyId}${p.assetNameHex}`] = Number(p.price) || 0;
      }
    }
  } catch {
    // price fetch failed — continue with 0
  }

  return top.map((t: any, i: number) => ({
    rank: i + 1,
    ticker: t.assetName ?? "?",
    price: priceMap[`${t.policyId}${t.assetNameHex}`] ?? 0,
    totalTxns: Number(t.total_transactions) || 0,
    buyCount: Number(t.buy_count) || 0,
    sellCount: Number(t.sell_count) || 0,
  }));
}

// --- Global Trades ---

export interface Trade {
  id: string;
  tradeType: "Buy" | "Sell";
  tokenIn: string;
  tokenOut: string;
  adaAmount: number;   // ADA side of the trade
  tokenAmount: number; // token side of the trade
  dex: string;
  timestamp: string; // ISO string (safe for server → client serialization)
}

const DEX_NAME_MAP: Record<string, string> = {
  MINSWAP: "Minswap",
  MINSWAPV2: "Minswap",
  SUNDAESWAP: "SundaeSwap",
  SUNDAESWAPV3: "SundaeSwap",
  WINGRIDERS: "WingRiders",
  WINGRIDERSV2: "WingRiders",
  MUESLISWAP: "MuesliSwap",
  VYFINANCE: "VyFinance",
  SPECTRUM: "Spectrum",
  SPLASH: "Splash",
};

export async function fetchGlobalTrades(limit = 15): Promise<Trade[]> {
  const raw = await cdsGet("/data", { timeframe: "15 mins" });
  const list: any[] = decrypt(raw.table) ?? [];
  const seen = new Set<string>();
  const unique = list.filter((t) => {
    const key = t.txHash ?? "";
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return unique.slice(0, limit).map((t: any, i: number) => {
    const isBuy = t.tradeType === "Buy";
    return {
      id: t.txHash ?? String(i),
      tradeType: t.tradeType ?? "Buy",
      tokenIn: isBuy ? "ADA" : t.assetName,
      tokenOut: isBuy ? t.assetName : "ADA",
      adaAmount: Number(t.lovelace) / 1_000_000,
      tokenAmount: Number(t.amount),
      dex: DEX_NAME_MAP[t.dexName] ?? t.dexName ?? "?",
      timestamp: t.tx_datetime ?? new Date().toISOString(),
    };
  });
}
