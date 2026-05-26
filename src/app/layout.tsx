import type { Metadata } from "next";
import { Libre_Baskerville, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const baskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400","700"], variable: "--font-display", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "PropGenAI — De la discovery au contrat signé en 48h",
  description: "Notes de call → proposition PDF → DocuSign. Relance automatique jusqu'à signature.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${baskerville.variable} ${bricolage.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", background: "#fff1f2" }}>{children}</body>
    </html>
  );
}
