"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn, formatAda } from "@/lib/utils";
import type { Trade } from "@/lib/api";

interface GlobalTradesFeedProps {
  trades: Trade[];
}

const DEX_COLORS: Record<string, string> = {
  Minswap: "bg-primary/10 text-primary border-primary/20",
  SundaeSwap: "bg-accent-orange/10 text-accent-orange border-accent-orange/20",
  WingRiders: "bg-accent/10 text-accent border-accent/20",
  MuesliSwap: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  VyFinance: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Spectrum: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

type SlottedTrade = Trade & { slotId: number };

const VISIBLE_COUNT = 5;

export function GlobalTradesFeed({ trades }: GlobalTradesFeedProps) {
  const [visible, setVisible] = useState<SlottedTrade[]>(() =>
    trades.slice(0, VISIBLE_COUNT).map((t, i) => ({ ...t, slotId: i }))
  );
  const slotCounter = useRef(VISIBLE_COUNT);
  const cursor = useRef(VISIBLE_COUNT);

  useEffect(() => {
    if (trades.length === 0) return;
    const interval = setInterval(() => {
      const trade = trades[cursor.current % trades.length];
      cursor.current = (cursor.current + 1) % trades.length;
      const slotId = slotCounter.current++;
      setVisible((prev) => [{ ...trade, slotId }, ...prev.slice(0, VISIBLE_COUNT - 1)]);
    }, 3500);
    return () => clearInterval(interval);
  }, [trades]);

  return (
    <div className="card-surface p-6 flex flex-col gap-4 h-96 overflow-hidden">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <h3 className="font-heading font-semibold text-text-primary text-sm">
          Live Trades
        </h3>
      </div>

      <div className="flex flex-col gap-2 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((trade) => (
            <motion.div
              key={trade.slotId}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-elevated hover:bg-surface-elevated/80 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1 text-sm font-medium text-text-primary">
                  <span>{trade.tokenIn}</span>
                  <ArrowRight className="w-3 h-3 text-text-secondary shrink-0" />
                  <span className="text-accent">{trade.tokenOut}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-text-secondary font-mono">
                  {formatAda(trade.adaAmount)}
                </span>
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full border font-medium",
                    DEX_COLORS[trade.dex] ??
                      "bg-surface text-text-secondary border-border"
                  )}
                >
                  {trade.dex}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="text-xs text-text-secondary text-center">
        Updates every few seconds
      </p>
    </div>
  );
}
