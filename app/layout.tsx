import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kilimanJaroSans = localFont({
  src: "./fonts/KilimanjaroSans-Regular.woff2",
  variable: "--font-kiliman-jaro-sans",
});

const domaineDisplay = localFont({
  src: "./fonts/TestDomaineDisplay-Regular-BF66174a224cb3d.woff2",
  variable: "--font-domaine-display",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kilimanJaroSans.variable} ${domaineDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
