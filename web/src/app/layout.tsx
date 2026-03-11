import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { BottomNav } from "@/components/layout/BottomNav";
import { CreditsFooter } from "@/components/layout/CreditsFooter";

export const metadata: Metadata = {
  title: "The DC Decade",
  description: "DC Comics from the 1980s — the decade that changed everything.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "The DC Decade",
    description: "DC Comics from the 1980s — the decade that changed everything.",
    images: [{ url: "/app-tile.png", width: 512, height: 512, alt: "The DC Decade" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "The DC Decade",
    description: "DC Comics from the 1980s — the decade that changed everything.",
    images: ["/app-tile.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ApolloWrapper>
          <main id="main-content" className="min-h-screen pb-nav">
            {children}
          </main>
          <CreditsFooter />
          <BottomNav />
        </ApolloWrapper>
      </body>
    </html>
  );
}
