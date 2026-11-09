import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { HashScroll } from "@/components/providers/hash-scroll";
import { LanguageProvider } from "@/components/providers/language-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Monang Abadi | Legal, Visa & Permit Consulting",
    template: "%s | Monang Abadi",
  },
  description:
    "Modern legal consulting website for visa, permit, and documentation services with future-ready tracking and client portal foundations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} min-h-full antialiased`}
    >
      <body className="min-h-full">
        <LanguageProvider>
          <HashScroll />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
