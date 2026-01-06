import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Brygada_1918 } from "next/font/google";
import "./globals.css";
import NavBar from "../components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brygada = Brygada_1918({
  variable: "--font-brygada",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CMU Africa Book Club",
  description: "Discover, read, and connect through African literature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brygada.variable} antialiased font-brygada`}
      >
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
