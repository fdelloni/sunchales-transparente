import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sunchales Transparente — Plataforma de Gestión y Transparencia Municipal",
  description:
    "Plataforma cívica de transparencia y eficiencia operativa para la Municipalidad de Sunchales — Capital Nacional del Cooperativismo.",
  themeColor: "#0F1B3D"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
