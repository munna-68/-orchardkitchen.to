import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orchard Kitchen | Whole-Ingredient Fast Casual • King St. W Toronto",
  description:
    "Eliminating ultra-processed foods. Whole-ingredient bowls, plates, salads, soups, and immunity shots at 700 King St. W, Toronto. Order ahead for pickup 8am–8pm daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF7F2] text-[#1E1B18] selection:bg-[#E54F38] selection:text-white">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
