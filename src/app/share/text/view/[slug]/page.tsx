import ViewSharedText from "@/components/Share/Text/ViewSharedText";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Text Everywhere - PicShare",
  description:
    "Share text effortlessly with PicShare. Create shareable links for your text content and share everywhere securely and instantly.",
  keywords: [
    "share everywhere",
    "text sharing",
    "share text online",
    "PicShare",
    "secure text sharing",
    "instant text links",
  ],
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
    }/share/text`,
  },
  openGraph: {
    title: "Share Text Everywhere - PicShare",
    description:
      "Easily share text with shareable links using PicShare. Share everywhere with confidence, securely and instantly.",
    url: `${
      process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
    }/share/text`,
    siteName: "PicShare",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
        }/og-text-sharing.png`,
        width: 1200,
        height: 630,
        alt: "Share Text Everywhere with PicShare",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Share Text Everywhere - PicShare",
    description:
      "Use PicShare to share text instantly with secure links. Share everywhere with ease!",
    images: [
      `${
        process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
      }/og-text-sharing.png`,
    ],
  },
};
export default function page() {
  return <ViewSharedText />;
}
