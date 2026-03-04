import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { BottomNav } from "@/components/layout/BottomNav";
import { CreditsFooter } from "@/components/layout/CreditsFooter";

export const metadata: Metadata = {
  title: "The DC Decade",
  description: "DC Comics from the 1980s — the decade that changed everything.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ApolloWrapper>
          <main className="min-h-screen pb-14">
            {children}
          </main>
          <CreditsFooter />
          <BottomNav />
        </ApolloWrapper>
      </body>
    </html>
  );
}
