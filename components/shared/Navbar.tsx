"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Market", href: "#market" },
  { label: "DEXes", href: "#dexes" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 font-heading font-bold text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1800 1648" className="w-8 h-8">
              <path transform="translate(881,8)" d="m0 0h18l17 5 18 8 26 14 105 60 48 28 26 15 48 28 26 15 24 14 28 16 23 13 25 14 28 17 28 16 23 13 28 16 26 15 48 28 26 15 27 16 22 14 15 11 10 9 4 7 1 147v169l-9 7-24 13-23 13-16 9-21 11-20 9-16 3h-5l-3-9-1-6-2-204-1-40-1-16-4-18-6-10-9-10-11-10-18-12-13-8-29-17-28-15-24-15-23-13-19-11-27-15-21-12-18-10-23-13-18-11-26-15-23-13-19-11-41-24-25-14-24-14-15-9-22-12-19-11-14-8-25-11-17-6-19 3-20 8-20 10-22 12-27 15-22 13-27 15-23 13-24 14-15 9-21 12-26 15-46 27-52 30-23 13-29 16-26 15-15 9-26 15-28 17-21 13-14 11-9 9-10 15-5 10-2 43-3 121-1 65v120l4 223 2 25 3 17 5 13 7 11 8 9 11 9 15 10 53 31 26 15 24 14 26 15 72 42 26 15 24 14 25 14 26 15 44 26 23 13 28 16 25 14 21 12 26 14 23 11 21 6 6-1 29-9 25-11 27-15 19-11 26-15 24-14 26-15 24-14 26-15 24-14 26-15 84-48 28-17 26-15 21-12 22-12 27-16 26-15 19-12 15-13 9-12 7-14 3-14 1-12 1-26 2-145 3-7 19-12 26-15 28-15 46-25 12-5h2l1 3 1 39v320l-2 8-7 8-15 15-17 12-19 12-105 60-25 14-24 14-23 13-17 10-24 14-27 16-24 13-17 10-15 9-28 16-27 15-49 28-29 17-26 15-22 13-56 32-22 13-15 9-28 15-16 8-13 4h-30l-21-7-24-13-75-44-41-24-52-30-16-9-18-10-16-10-25-14-24-14-17-9-13-8-35-21-14-8-24-14-14-8-24-14-14-8-24-14-23-13-48-28-10-6-14-7-11-7-14-8-18-10-33-22-14-11-7-8-10-19-4-15-1-8v-312l1-422 1-24 2-11 6-11 11-11 12-9 17-11 27-16 48-28 26-15 27-15 27-16 21-12 27-15 24-14 21-12 17-10 26-15 48-28 43-25 42-24 25-14 28-17 22-13 26-15 97-54 19-8z" fill="white"/>
              <path transform="translate(879,294)" d="m0 0h22l20 5 25 12 24 13 24 14 25 14 34 20 18 11 20 14 7 9-1 4-11 8-16 13-14 8-15 9-29 17-13 8-21 12-4 2h-9l-29-14-23-9-10-3h-24l-23 8-16 8-26 14-36 22-25 16-17 12-4 5-1 6 4 8 14 9 22 13 20 12 26 15 22 12 23 11 21 7 10 2 5-3 16-4 24-10 26-14 42-24 18-10 48-28 27-15 23-13 18-10 23-13 27-15 18-9 7-1 12 2 19 10 24 14 25 14 15 9 22 13 16 12 8 9 2 7 1 8 1 405v73l-1 27-3 11-8 9-17 12-21 12-27 15-17 10-21 12-25 14-26 15-17 10-24 14-28 16-48 28-49 28-25 14-21 12-24 14-23 12-16 8-18 6h-16l-22-6-30-15-23-13-17-10-19-11-24-14-14-8-27-16-25-14-14-8-24-14-23-13-24-14-25-14-22-13-28-16-26-15-45-27-16-11-7-8-5-11-2-15v-85l1-165 1-86 1-28 6-16 6 1 29 14 44 24 27 16 24 14 5 5 1 11 1 141 1 56 1 20 2 12 5 12 10 9 15 10 41 24 26 15 23 13 15 9 26 15 21 12 26 15 23 13 24 13 23 12 14 6 14 5 12 4 39-14 25-13 21-12 48-28 21-12 25-15 26-15 24-14 56-32 32-19 5-5 1-170v-194l-10 3-25 13-21 12-25 14-22 13-25 14-17 10-16 9-24 14-29 16-15 9-11 6-29 16-16 8-24 10-4 1h-15l-23-7-17-7-24-14-27-15-13-8-23-13-29-16-17-10-20-12-22-13-23-13-22-13-50-28-44-26-25-15-21-13-13-12-8-9-2-4v-11l2-9 7-13 8-7 13-9 25-15 26-15 27-16 21-12 27-16 28-16 27-15 26-15 27-16 21-12 27-16 25-14 23-13 18-10 19-9 14-5z" fill="white"/>
            </svg>
            <span className="text-text-primary">Card<span className="text-primary">ex</span>scan</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="solid" size="sm" asChild>
              <a href="https://app.cardexscan.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Launch App
              </a>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border bg-surface py-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors px-4 py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <Button variant="solid" size="sm" className="w-full" asChild>
                <a href="https://app.cardexscan.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Launch App
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
