import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { MarketData } from "@/components/sections/MarketData";
import { SupportedDexes } from "@/components/sections/SupportedDexes";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MarketData />
        <SupportedDexes />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
