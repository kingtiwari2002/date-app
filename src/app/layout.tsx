import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { AdminBanner } from "@/components/ui/AdminBanner";
import { NavigationControls } from "@/components/ui/NavigationControls";
import NextTopLoader from "nextjs-toploader";

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
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-black text-white selection:bg-brand selection:text-black relative`}>
        <NextTopLoader color="#D4AF37" showSpinner={false} height={3} shadow="0 0 10px #D4AF37,0 0 5px #D4AF37" />
        <AdminBanner />
        <FloatingParticles />
        <NavigationControls />
        <div className="relative z-10 flex-1 flex flex-col pt-10">
          {children}
        </div>
      </body>
    </html>
  );
}
