import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";
import { Toaster } from "@/components/ui/toaster";
import WebVitals from "@/lib/web-vitals";

const manrope = Manrope({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Bowal Forms",
  description: "Create an online form as easily as creating a document",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className} suppressHydrationWarning>
        <WebVitals />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
