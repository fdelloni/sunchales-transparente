import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const TITULO = "Sunchales Transparente — Plataforma de Gestión y Transparencia Municipal";
const DESCRIPCION =
  "Plataforma cívica de transparencia y eficiencia operativa para la Municipalidad de Sunchales — Capital Nacional del Cooperativismo. Brechas declaradas, datos abiertos CC-BY-4.0, API REST pública.";

export const viewport: Viewport = {
  themeColor: "#0F1B3D",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ciudadan.com"),
  title: {
    default: TITULO,
    template: "%s",
  },
  description: DESCRIPCION,
  applicationName: "Sunchales Transparente",
  authors: [{ name: "Proyecto Sunchales Transparente" }],
  keywords: [
    "Sunchales",
    "transparencia",
    "municipalidad",
    "datos abiertos",
    "acceso a la información",
    "AIP",
    "Ordenanza 1872/2009",
    "rendición de cuentas",
    "Santa Fe",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://ciudadan.com",
    siteName: "Sunchales Transparente",
    title: TITULO,
    description: DESCRIPCION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "government",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
