import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/HomePage/Header";
import Footer from "@/components/HomePage/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Image Sharing Platform - Share Your Images Instantly",
  description: "Upload and share your images publicly or privately with ease. No sign-up required. Fast, secure and free image sharing.",
  keywords: "image sharing, free image upload, photo hosting, private image sharing, public image hosting",
  openGraph: {
    title: "Free Image Sharing Platform",
    description: "Upload and share your images publicly or privately with ease.",
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
    description: "Upload and share your images publicly or privately with ease.",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          <Header />
          {children}
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
