import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Alegreya_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const alegreyaSans = Alegreya_Sans({
  variable: "--font-alegreya-sans",
  subsets: ["latin"],
  weight: ["700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://napolipizzeriacny.com'),
  title: "Napoli Pizzeria - Authentic NY-Style Pizza | Syracuse, NY",
  description: "Authentic NY-style pizza and Italian cuisine in Liverpool, North Syracuse and surrounding areas. Fresh lunch specials, delivery and takeout available daily.",
  keywords: "pizza, Italian food, Syracuse, NY, Liverpool, North Syracuse, lunch specials, delivery, takeout, Napoli Pizzeria, walk-in specials",
  authors: [{ name: "Mike Perrucci" }],
  icons: '/brand/favicon-napoli.jpg',
  openGraph: {
    title: "Napoli Pizzeria - Authentic NY-Style Pizza",
    description: "Authentic NY-style pizza and Italian cuisine in Liverpool, North Syracuse and surrounding areas. Fresh lunch specials and delivery available.",
    url: "https://napolipizzeriacny.com",
    siteName: "Napoli Pizzeria",
    images: [
      {
        url: "/brand/social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Napoli Pizzeria - Authentic NY-Style Pizza",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Napoli Pizzeria - Authentic NY-Style Pizza",
    description: "Authentic NY-style pizza and Italian cuisine in Liverpool, North Syracuse and surrounding areas. Fresh lunch specials and delivery available.",
    images: ["/brand/social-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${poppins.variable} ${alegreyaSans.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Script src="/promo-banner.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
