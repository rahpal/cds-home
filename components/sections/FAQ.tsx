"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is Cardexscan?",
    a: "Cardexscan is a DEX aggregator for the Cardano blockchain. Instead of swapping on a single DEX, Cardexscan queries all major Cardano DEXes simultaneously and routes your trade through the optimal path — giving you the best possible price every time.",
  },
  {
    q: "How does the price routing work?",
    a: "When you enter a swap, Cardexscan fetches real-time liquidity data from every integrated DEX pool. Our routing engine calculates which DEX (or combination of DEXes) will give you the highest output amount for your input, accounting for pool depth and price impact.",
  },
  {
    q: "Which wallets are supported?",
    a: "Cardexscan supports all major CIP-30 compatible Cardano wallets including Nami, Eternl, Vespr, Typhon, Flint, and GeroWallet. If your wallet supports the CIP-30 standard, it will work with Cardexscan.",
  },
  {
    q: "Does Cardexscan charge fees?",
    a: "Cardexscan charges a fixed platform fee of 0.9678 ADA per swap — no percentage cuts, no hidden charges. You always know exactly what you pay before confirming. The underlying DEX fees still apply and are shown transparently in the swap preview.",
  },
  {
    q: "What is a Rug Score?",
    a: "A Rug Score is a risk probability (0–100) assigned to each token that estimates the likelihood of it being a scam or rug-pull. Scores are calculated using on-chain data: liquidity concentration, wallet distribution, policy ID properties, and trading patterns. Higher score = higher risk.",
  },
  {
    q: "Is Cardexscan open source?",
    a: "The Cardexscan market data API and on-chain indexer are publicly accessible. The frontend and routing engine are proprietary. We believe in open data and publish our full trade history and pool data for anyone to use.",
  },
  {
    q: "Which DEXes are integrated?",
    a: "Currently integrated: Minswap, SundaeSwap, WingRiders, MuesliSwap, VyFinance, and Spectrum. We continuously add new DEXes as they launch and gain liquidity. Check our roadmap for upcoming integrations.",
  },
  {
    q: "Is my swap executed on-chain?",
    a: "Yes. Every swap is a real Cardano transaction signed by your wallet and settled on-chain. Cardexscan never takes custody of your funds — the smart contracts of the underlying DEX handle settlement directly.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-padding bg-surface/50">
      <div className="section-container">
        <SectionHeader
          label="FAQ"
          title="Frequently asked questions"
          highlightWord="Frequently"
          subtitle="Everything you need to know about Cardexscan and how it works."
          className="mb-16"
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
