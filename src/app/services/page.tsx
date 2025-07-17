import Services from "@/components/Services/Services";
import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Image Hosting & Optimization Services – Fast, Secure, Unlimited | ImageShareApp",
  description:
    "Discover our powerful image hosting and optimization services: resize, compress, transform, and deliver your images at lightning speed. No signup required—public or private sharing made easy.",
  keywords: [
    "image hosting",
    "image optimization",
    "image resizing",
    "photo compression",
    "image transformation",
    "CDN image delivery",
    "fast image serving",
    "secure image storage",
    "private image sharing",
    "public image hosting",
  ],
  openGraph: {
    title: "Image Hosting & Optimization Services – ImageShareApp",
    description:
      "Leverage ImageShareApp’s suite of services to resize, compress, and optimize your images—publicly or privately hosted with blazing‑fast CDN delivery and zero signup.",
    url: "https://image-sharing-app-theta.vercel.app/services",
    siteName: "ImageShareApp",
    images: [
      {
        url: "https://image-sharing-app-theta.vercel.app/services-og.png",
        width: 1200,
        height: 630,
        alt: "ImageShareApp Services – Hosting & Optimization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Hosting & Optimization Services | ImageShareApp",
    description:
      "Optimize, resize, and host your images instantly with ImageShareApp’s free, secure services. No account needed—share publicly or keep it private.",
    images: ["https://image-sharing-app-theta.vercel.app/services-og.png"],
  },
};
export default function page() {
  return <Services />;
}
