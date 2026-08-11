import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#D4AF37",
};

export const metadata: Metadata = {
  title: "Date Experience",
  description: "A premium interactive date experience.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Date Experience",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-black text-white selection:bg-brand selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
