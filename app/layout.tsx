import type { Metadata } from "next";
import "./globals.css";
import { DM_Serif_Display, Inter, Italianno } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif"
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const script = Italianno({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script"
});

export const metadata: Metadata = {
  title: "Althea Villaluna | Portfolio",
  description:
    "A playful, polished portfolio built like a deck of cards, marketing and multimedia associate work by Althea Villaluna."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${script.variable}`}
    >
      <body className="min-h-screen font-sans text-poster-ink">
        <NoiseOverlay />
        <div className="min-h-screen flex flex-col">
          <Header />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
