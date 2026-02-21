"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { TrendingToken } from "@/lib/api";

interface TrendingTokensProps {
  tokens: TrendingToken[];
}

type SlottedToken = TrendingToken & { slotId: number };

const VISIBLE_COUNT = 5;

export function TrendingTokens({ tokens }: TrendingTokensProps) {
  const [visible, setVisible] = useState<SlottedToken[]>(() =>
    tokens.slice(0, VISIBLE_COUNT).map((t, i) => ({ ...t, slotId: i }))
  );
  const slotCounter = useRef(VISIBLE_COUNT);
  const cursor = useRef(VISIBLE_COUNT);

  useEffect(() => {
    if (tokens.length === 0) return;
    const interval = setInterval(() => {
      const token = tokens[cursor.current % tokens.length];
      cursor.current = (cursor.current + 1) % tokens.length;
      const slotId = slotCounter.current++;
      setVisible((prev) => [{ ...token, slotId }, ...prev.slice(0, VISIBLE_COUNT - 1)]);
    }, 3500);
    return () => clearInterval(interval);
  }, [tokens]);

  return (
    <div className="card-surface p-6 flex flex-col gap-4 h-96 overflow-hidden">
      <div className="flex items-center gap-2">
        <Flame className="w-4 h-4 text-accent-orange" />
        <h3 className="font-heading font-semibold text-text-primary text-sm">
          Trending Tokens
        </h3>
      </div>

      <div className="flex flex-col gap-2 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((token) => {
            const isBuyHeavy = token.totalTxns > 0
              ? token.buyCount / token.totalTxns >= 0.5
              : true;
            return (
              <motion.div
                key={token.slotId}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-elevated hover:bg-surface-elevated/80 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-medium text-text-primary">
                    {token.ticker}
                  </span>
                  <span className="text-xs text-text-secondary font-mono">
                    #{token.rank}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-text-secondary font-mono">
                    ₳{formatPrice(token.price)}
                  </span>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-0.5",
                      isBuyHeavy
                        ? "bg-accent/10 text-accent border-accent/20"
                        : "bg-danger/10 text-danger border-danger/20"
                    )}
                  >
                    {isBuyHeavy
                      ? <TrendingUp className="w-3 h-3" />
                      : <TrendingDown className="w-3 h-3" />
                    }
                    {token.buyCount}/{token.sellCount}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="text-xs text-text-secondary text-center">
        Updates every few seconds
      </p>
    </div>
  );
}
