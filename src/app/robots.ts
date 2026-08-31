import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/checkout/",
        "/login/",
        "/register/",
        "/cart/",
        "/account/",
      ],
    },

    sitemap: "https://www.priyaatextile.in/sitemap.xml",
  };
}