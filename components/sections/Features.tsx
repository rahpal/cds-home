"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  GitBranch,
  Layers,
  ShieldCheck,
  Sliders,
  Wallet,
  Globe,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: GitBranch,
    title: "Best Price Routing",
    description:
      "We query all available DEX pools simultaneously and route your swap through the optimal path to maximize your output.",
    accent: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Layers,
    title: "Multi-DEX Aggregation",
    description:
      "Connected to Minswap, SundaeSwap, WingRiders, MuesliSwap, VyFinance, Spectrum and more — all in one interface.",
    accent: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: ShieldCheck,
    title: "Rug Score Checks",
    description:
      "Every token is scored for rug-pull risk before you swap. We flag suspicious projects so you can trade with confidence.",
    accent: "text-accent-orange",
    bg: "bg-accent-orange/10",
  },
  {
    icon: Sliders,
    title: "Low Slippage",
    description:
      "Smart split routing divides your order across multiple pools to minimize price impact on large trades.",
    accent: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Wallet,
    title: "Any Cardano Wallet",
    description:
      "Connect with Nami, Eternl, Vespr, Typhon, Flint, and other popular Cardano wallets seamlessly.",
    accent: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Globe,
    title: "Open Market Data",
    description:
      "All trade data, token prices, and pool liquidity are publicly accessible. Transparent DeFi, the way it should be.",
    accent: "text-accent-orange",
    bg: "bg-accent-orange/10",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export function Features() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="features" ref={sectionRef} className="section-padding bg-surface/50 relative overflow-hidden">
      {!reduced && (
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: "radial-gradient(circle, #0066FF 0%, transparent 70%)", y: orbY }}
        />
      )}
      <div className="section-container">
        <SectionHeader
          label="How It Works"
          title="Everything you need to swap smarter"
          highlightWord="swap smarter"
          subtitle="Cardexscan combines intelligent routing, real-time pool data, and safety checks into one seamless experience."
          className="mb-16"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={reduced ? {} : containerVariants}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feat, i) => (
            <motion.div
              key={i}
              variants={reduced ? {} : itemVariants}
            >
              <Card className="h-full hover:border-primary/30 transition-colors duration-300 hover:bg-surface-elevated group">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center`}>
                    <feat.icon className={`w-6 h-6 ${feat.accent}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold font-heading text-text-primary mb-2 group-hover:text-accent transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
