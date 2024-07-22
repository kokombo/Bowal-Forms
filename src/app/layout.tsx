import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";

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
      <body className={manrope.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
