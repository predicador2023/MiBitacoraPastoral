import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { MantineProvider } from "@mantine/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi Bitácora Pastoral",
  description: "Proyecto pastoral con Next.js y Mantine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider>
          {/* 🔹 Ya no ponemos Header aquí */}
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}