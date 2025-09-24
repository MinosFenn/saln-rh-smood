import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mazzardBold = Inter({
  variable: "--font-mazzard-bold",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "Wheel Salon RH - Roue de la Fortune",
  description: "Tentez votre chance avec notre roue de la fortune et gagnez des réductions exclusives !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mazzardBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
