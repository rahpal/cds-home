"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Circle } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "completed" | "in-progress" | "planned";

interface Milestone {
  period: string;
  title: string;
  bullets: string[];
  status: Status;
}

const milestones: Milestone[] = [
  {
    period: "Q3 2024",
    title: "Core Aggregation Engine",
    bullets: [
      "Real-time pool querying across 4 DEXes",
      "Best-price routing algorithm",
      "Public API launch",
    ],
    status: "completed",
  },
  {
    period: "Q4 2024",
    title: "Rug Score & Token Safety",
    bullets: [
      "ML-powered rug-pull probability scoring",
      "Token verification badges",
      "Pool liquidity depth analysis",
    ],
    status: "completed",
  },
  {
    period: "Q1 2025",
    title: "P2P Marketplace Beta",
    bullets: [
      "Peer-to-peer token trading",
      "Escrow-based settlement",
      "Offer history & discovery",
    ],
    status: "in-progress",
  },
  {
    period: "Q2 2025",
    title: "Portfolio Tracker",
    bullets: [
      "Multi-wallet aggregated view",
      "PnL tracking with ADA & USD values",
      "Token position history",
    ],
    status: "planned",
  },
  {
    period: "Q3 2025",
    title: "Mobile App",
    bullets: [
      "iOS & Android native apps",
      "Push alerts for price targets",
      "One-tap swap from any wallet",
    ],
    status: "planned",
  },
];

const statusConfig: Record<Status, { icon: typeof CheckCircle2; label: string; badgeVariant: "success" | "orange" | "muted" }> = {
  completed: { icon: CheckCircle2, label: "Completed", badgeVariant: "success" },
  "in-progress": { icon: Clock, label: "In Progress", badgeVariant: "orange" },
  planned: { icon: Circle, label: "Planned", badgeVariant: "muted" },
};

export function Roadmap() {
  const reduced = useReducedMotion();

  return (
    <section id="roadmap" className="section-padding">
      <div className="section-container">
        <SectionHeader
          label="Roadmap"
          title="Where we've been and where we're going"
          highlightWord="where we're going"
          subtitle="Cardexscan is built in public, shipping continuously."
          className="mb-16"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="flex flex-col gap-12">
            {milestones.map((m, i) => {
              const { icon: Icon, label, badgeVariant } = statusConfig[m.status];
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  className={cn(
                    "relative flex gap-6 md:gap-0 pl-20 md:pl-0",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                  initial={reduced ? {} : { opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={reduced ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Content card */}
                  <div className={cn("md:w-5/12", isLeft ? "md:pr-8 md:text-right" : "md:pl-8")}>
                    <div className="card-surface p-5 hover:border-primary/30 transition-colors">
                      <div className={cn("flex items-center gap-2 mb-3", isLeft ? "md:flex-row-reverse" : "flex-row")}>
                        <Badge variant={badgeVariant as any} className="shrink-0">
                          <Icon className="w-3 h-3 mr-1" />
                          {label}
                        </Badge>
                        <span className="text-text-secondary text-xs font-mono">{m.period}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-text-primary mb-3">
                        {m.title}
                      </h3>
                      <ul className={cn("space-y-1", isLeft ? "md:text-right" : "text-left")}>
                        {m.bullets.map((b, j) => (
                          <li key={j} className="text-text-secondary text-sm flex items-start gap-2">
                            <span className="text-accent mt-0.5 shrink-0">—</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-primary bg-background z-10" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
