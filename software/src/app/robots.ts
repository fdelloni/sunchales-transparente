import type { MetadataRoute } from "next";

const BASE_URL = "https://ciudadan.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // El webhook de WhatsApp es interno (lo invoca Twilio); sin valor para crawlers.
        disallow: ["/api/v1/whatsapp"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
