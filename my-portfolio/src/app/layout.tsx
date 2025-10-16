import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Load Poppins font (400 regular, 700 bold)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Metadata for your site
export const metadata: Metadata = {
  title: "Joram Entice | Portfolio",
  description:
    "Portfolio of Joram Entice – crafting innovative, high-performance, and accessible web experiences.",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
