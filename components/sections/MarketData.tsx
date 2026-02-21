import { SectionHeader } from "@/components/shared/SectionHeader";
import { AdaPriceWidget } from "@/components/widgets/AdaPriceWidget";
import { TrendingTokens } from "@/components/widgets/TrendingTokens";
import { GlobalTradesFeed } from "@/components/widgets/GlobalTradesFeed";
import { fetchAdaPrice, fetchTrendingTokens, fetchGlobalTrades } from "@/lib/api";
import { mockAdaPrice, mockTrendingTokens, mockRecentTrades } from "@/lib/mockData";

export async function MarketData() {
  const [adaPrice, trendingTokens, globalTrades] = await Promise.all([
    fetchAdaPrice().catch(() => null),
    fetchTrendingTokens(15).catch(() => null),
    fetchGlobalTrades(12).catch(() => null),
  ]);

  const ada = adaPrice ?? mockAdaPrice;
  const tokens = trendingTokens ?? mockTrendingTokens;
  const trades = globalTrades ?? mockRecentTrades;

  return (
    <section id="market" className="section-padding">
      <div className="section-container">
        <SectionHeader
          label="Live Market"
          title="Real-time Cardano market data"
          highlightWord="Real-time"
          subtitle="Stay ahead of the market with live pricing, trending tokens, and a feed of recent swaps across all DEXes."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AdaPriceWidget
            price={ada.price}
            change24h={ada.change24h ?? 0}
            volume24h={ada.volume24h ?? 0}
          />
          <TrendingTokens tokens={tokens} />
          <GlobalTradesFeed trades={trades} />
        </div>
      </div>
    </section>
  );
}
