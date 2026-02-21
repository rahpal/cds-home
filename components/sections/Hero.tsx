"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/shared/GradientText";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const stats = [
  { label: "DEXes integrated", target: 7, suffix: "+" },
  { label: "Tokens tracked", target: 1800, suffix: "+" },
  { label: "Swaps routed", target: 3_700, suffix: "+" },
  { label: "ADA volume", target: 2300000, suffix: "₳ +" },
];

const easeOut = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: easeOut },
});

export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blueOrbY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const tealOrbY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />

      {/* Glow orbs */}
      {!reduced && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #0066FF 0%, transparent 70%)", y: blueOrbY }}
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle, #00C9A7 0%, transparent 70%)", y: tealOrbY }}
            animate={{ x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 section-container text-center flex flex-col items-center gap-8 pt-24"
        style={{ y: contentY }}
      >
        {/* Badge */}
        <motion.div {...(reduced ? {} : fadeUp(0.1))}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
            <span className="relative flex items-center justify-center w-3.5 h-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <Activity className="relative w-3.5 h-3.5 text-green-400" />
            </span>
            Live on Cardano Mainnet
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-text-primary max-w-4xl leading-tight"
          {...(reduced ? {} : fadeUp(0.2))}
        >
          The{" "}
          <GradientText>Smartest Way</GradientText>
          {" "}to Swap on Cardano
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
          {...(reduced ? {} : fadeUp(0.3))}
        >
          Cardexscan routes your swap across all major Cardano DEXes simultaneously,
          guaranteeing the best price with minimal slippage — every single time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          {...(reduced ? {} : fadeUp(0.4))}
        >
          <Button size="xl" className="group" asChild>
            <a href="https://app.cardexscan.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Start Swapping
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button size="xl" variant="outline" asChild>
            <a href="#features">Explore Features</a>
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-8 sm:gap-16 pt-8 border-t border-border w-full justify-center"
          {...(reduced ? {} : fadeUp(0.55))}
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-bold font-heading font-mono text-text-primary">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </span>
              <span className="text-sm text-text-secondary">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
