import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdaPriceWidgetProps {
  price: number;
  change24h: number;
  volume24h: number;
}

export function AdaPriceWidget({ price, change24h, volume24h }: AdaPriceWidgetProps) {
  const isPositive = change24h >= 0;

  return (
    <div className="card-surface p-6 flex flex-col gap-5 h-96">
      {/* ADA Logo + label */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
          <span className="text-primary font-bold text-sm">₳</span>
        </div>
        <div>
          <p className="text-text-secondary text-xs uppercase tracking-widest">Cardano</p>
          <p className="text-text-primary font-semibold font-heading text-sm">ADA / USD</p>
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="font-mono text-4xl font-bold text-text-primary">
          ${price.toFixed(4)}
        </p>
        <div
          className={cn(
            "flex items-center gap-1 mt-2 text-sm font-medium",
            isPositive ? "text-accent" : "text-danger"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>
            {isPositive ? "+" : ""}
            {change24h.toFixed(2)}% (24h)
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">24h Volume</p>
        <p className="font-mono text-text-primary font-semibold">
          ${(volume24h / 1_000_000).toFixed(1)}M
        </p>
      </div>
    </div>
  );
}
