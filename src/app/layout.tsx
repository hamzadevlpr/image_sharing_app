import ClientAuth from "@/components/Auth/ClientAuth";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Free Image Sharing Platform - Share Your Images Instantly",
  description:
    "Upload and share your images publicly or privately with ease. No sign-up required. Fast, secure and free image sharing.",
  keywords:
    "image sharing, free image upload, photo hosting, private image sharing, public image hosting",
  openGraph: {
    title: "Free Image Sharing Platform",
    description:
      "Upload and share your images publicly or privately with ease.",
    url: "https://image-sharing-app-theta.vercel.app/",
    siteName: "ImageShareApp",
    images: [
      {
        url: "https://image-sharing-app-theta.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Sharing Platform",
    description:
      "Upload and share your images publicly or privately with ease.",
    images: ["https://image-sharing-app-theta.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <div className="min-h-screen">
          <NextTopLoader color="#14b8a6" />
          <ClientAuth>
            {children}
            <Toaster />
          </ClientAuth>
        </div>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || "GTM-TXFBDTTG"} />
    </html>
  );
}
