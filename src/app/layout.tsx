  import "./globals.css";
  import { Geist } from "next/font/google";
  import { cn } from "@/lib/utils";
  import { Toaster } from "sonner";
  import WhatsAppButton from "@/components/whatsappButton";
  import { Metadata } from "next";


  const geist = Geist({subsets:['latin'],variable:'--font-sans'});

  export const metadata:Metadata = {
    metadataBase:new URL("https://www.priyaatextile.in"),
    title: {
    default: "Priyaa Textile | Sarees & Women's Clothing",
    template: "%s | Priyaa Textile",
  },

  description:
    "Shop sarees, silk sarees, designer sarees and women's clothing online from Priyaa Textile. Discover quality fashion and exciting offers.",

  keywords: [
    "Priyaa Textile",
    "sarees online",
    "sarees in Vellore",
    "textile shop in Vellore",
    "sarees in Gudiyattam",
    "silk sarees",
    "designer sarees",
    "women's clothing",
  ],
    icons: {
      icon: "/logo.png",
    },
     robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "Priyaa Textile",
    title: "Priyaa Textile | Sarees & Women's Clothing",
    description:
      "Shop sarees, silk sarees, designer sarees and women's clothing online from Priyaa Textile.",
    url: "https://www.priyaatextile.in",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Priyaa Textile",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Priyaa Textile | Sarees & Women's Clothing",
    description:
      "Shop sarees, silk sarees, designer sarees and women's clothing online from Priyaa Textile.",
    images: ["/logo.png"],
  },
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en" className={cn("font-sans", geist.variable)}>
        <body>
          {children}
          <WhatsAppButton/>
          <Toaster richColors position="top-right" />
          </body>
      </html>
    );
  }