import type { Metadata } from "next";
import { Archivo, Kaushan_Script } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

// One variable family for display + text (width axis does the heavy lifting),
// plus a brush script for the hand-written signatures.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const kaushan = Kaushan_Script({
  variable: "--font-kaushan",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orchard Kitchen | Whole-Ingredient Fast Casual • King St. W Toronto",
  description:
    "Eliminating ultra-processed foods. Whole-ingredient bowls, plates, salads, soups, and immunity shots at 700 King St. W, Toronto. Order ahead for pickup 8am–8pm daily.",
};

// Runs before paint: marks motion-capable visits (so entrances can hide their
// targets) and skips the preloader for the rest of the session.
const bootScript = `(function(){try{var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('js-motion');if(r||sessionStorage.getItem('ok-preloaded'))d.classList.add('preloaded');}catch(e){document.documentElement.classList.add('preloaded');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${kaushan.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{`.preloader{display:none!important}.hero-hide{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col font-sans bg-cream text-ink selection:bg-lime selection:text-forest-ink">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
