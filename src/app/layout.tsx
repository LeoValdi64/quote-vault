import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuoteVault - Daily Inspirational Quotes Collection",
  description:
    "Discover, save, and share inspirational quotes from great thinkers. Browse a curated collection of wisdom and build your personal favorites list.",
  openGraph: {
    title: "QuoteVault - Daily Inspirational Quotes Collection",
    description:
      "Discover, save, and share inspirational quotes from great thinkers. Browse a curated collection of wisdom and build your personal favorites list.",
    images: ["/og-image.png"],
    url: "https://quote-vault-phi.vercel.app",
  },
  alternates: {
    canonical: "https://quote-vault-phi.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "QuoteVault",
              description:
                "Discover, save, and share inspirational quotes from great thinkers. Browse a curated collection of wisdom and build your personal favorites list.",
              url: "https://quote-vault-phi.vercel.app",
              applicationCategory: "ReferenceApplication",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
