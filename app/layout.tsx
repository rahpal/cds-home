import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const description =
  "Cardexscan is an innovative DeFi suite for trading on the Cardano blockchain. It uses advanced routing algorithms and real-time analytics to improve liquidity access, reduce slippage, and enhance the trading experience.";

const ogImage = "https://cardexscan.s3.amazonaws.com/public/ogseo.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://cardexscan.com"),
  title: "Cardexscan | A DeFi Suite on Cardano",
  description,
  robots: { index: true, follow: true },
  openGraph: {
    title: "Cardexscan | A DeFi Suite on Cardano",
    description,
    url: "https://cardexscan.com/",
    locale: "en_US",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "cardexscan.com",
    title: "Cardexscan | A DeFi Suite on Cardano",
    description,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://cardexscan.s3.amazonaws.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4NJCGCEZ3G"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4NJCGCEZ3G');`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
