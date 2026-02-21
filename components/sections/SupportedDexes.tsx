"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";

const S3 = "https://cardexscan.s3.amazonaws.com";

const dexes = [
  { name: "Minswap",    color: "#00B9F1", logo: `${S3}/public/minswap.png` },
  { name: "SundaeSwap", color: "#F59E0B", logo: `${S3}/sundaev3.jpg` },
  { name: "WingRiders", color: "#00C9A7", logo: `${S3}/public/wingriders.png` },
  { name: "MuesliSwap", color: "#8B5CF6", logo: `${S3}/public/muesli.png` },
  { name: "VyFinance",     color: "#EF4444", logo: `${S3}/public/vyfi.png` },
  { name: "Spectrum",      color: "#F97316", logo: `${S3}/public/spectrum.png` },
  { name: "Splash",        color: "#3B82F6", logo: `${S3}/public/splashlogo.jpeg` },
  { name: "WingRiders V2", color: "#00C9A7", logo: `${S3}/public/wingridersv2.png` },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

export function SupportedDexes() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section id="dexes" ref={sectionRef} className="section-padding bg-surface/50 relative overflow-hidden">
      {!reduced && (
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: "radial-gradient(circle, #00C9A7 0%, transparent 70%)", y: orbY }}
        />
      )}
      <div className="section-container">
        <SectionHeader
          label="Integrated DEXes"
          title="All major Cardano DEXes, one interface"
          highlightWord="one interface"
          subtitle="We aggregate liquidity from every major Cardano decentralized exchange so you always get the deepest pools."
          className="mb-16"
        />

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6 max-w-5xl mx-auto"
          variants={reduced ? {} : containerVariants}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
        >
          {dexes.map((dex) => (
            <motion.div
              key={dex.name}
              variants={reduced ? {} : itemVariants}
              whileHover={reduced ? {} : { scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surface-elevated cursor-default transition-colors duration-200"
            >
              <div
                className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center"
                style={{ border: `2px solid ${dex.color}44` }}
              >
                <img
                  src={dex.logo}
                  alt={dex.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-text-secondary text-xs text-center font-medium">
                {dex.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-text-secondary text-sm mt-10">
          More DEXes added regularly as the Cardano ecosystem grows.
        </p>
      </div>
    </section>
  );
}
