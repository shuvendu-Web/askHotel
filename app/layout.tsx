import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "askHotel — Find Your Perfect Luxury Escape",
  description:
    "Discover handpicked five-star hotels, private villas, and exclusive resorts worldwide. Book your dream stay with askHotel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="flex min-h-full flex-col bg-white" style={{ fontFamily: '"Inter", sans-serif', fontOpticalSizing: 'auto' }}>{children}</body>
    </html>
  );
}
