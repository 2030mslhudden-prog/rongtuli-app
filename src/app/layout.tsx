import type { Metadata } from "next";
import { Hanken_Grotesk, Manrope, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rongtuli - Digital Marketplace",
  description: "Art of Imagination - Premium Design Assets",
  icons: {
    icon: "/images/Favicon.jpg",
    shortcut: "/images/Favicon.jpg",
    apple: "/images/Favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${hanken.variable} ${manrope.variable} ${hind.variable} antialiased bg-background text-on-background min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
