import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import PwaRegister from "@/components/PwaRegister";

const TITULO = "Sunchales Transparente — Plataforma de Gestión y Transparencia Municipal";
const DESCRIPCION =
  "Plataforma cívica de transparencia y eficiencia operativa para la Municipalidad de Sunchales — Capital Nacional del Cooperativismo. Brechas declaradas, datos abiertos CC-BY-4.0, API REST pública.";

/**
 * Viewport mobile-first.
 *
 * - width=device-width + initialScale=1 → encaja al ancho real del dispositivo.
 * - maximumScale=5 + userScalable=true → respeta la posibilidad de zoom del
 *   usuario por accesibilidad (no bloqueamos pinch-zoom).
 * - viewportFit=cover → habilita el uso de safe-area-inset-* para iPhone con
 *   notch y Android con barras gestuales translúcidas.
 * - themeColor → verde institucional Sunchales (header del navegador en
 *   Android Chrome + barra de estado en PWA standalone).
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F5E1F" },
    { media: "(prefers-color-scheme: dark)", color: "#0F5E1F" },
  ],
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
  // PWA — manifest declara nombre, iconos, modo standalone, scope.
  manifest: "/manifest.webmanifest",
  // iOS Safari: meta tags propietarios para que se instale como PWA con
  // barra de estado correcta y nombre de app legible.
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sunchales Transparente",
  },
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  // Formato de detección automática de iOS: desactivamos teléfonos para
  // que no aparezcan links de "Llamar" en cualquier número del sitio.
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-[100dvh] flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
        <PwaRegister />
      </body>
    </html>
  );
}
