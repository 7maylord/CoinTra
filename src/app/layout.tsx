import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoinTra",
  description: "CoinTra is your everyday tool to track your Crypto coin Prices in Real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-900 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(34, 211, 238, 0.3)', // Cyan border
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                padding: '12px',
                boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)', // Neon glow
                transition: 'all 0.3s ease-in-out',
              },
              error: {
                style: {
                  borderColor: 'rgba(239, 68, 68, 0.5)', // Red for errors
                  boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
                },
              },
              success: {
                style: {
                  borderColor: 'rgba(74, 222, 128, 0.5)', // Green for success
                  boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)', // Green glow
                },
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
