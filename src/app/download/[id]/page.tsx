import DownloadPage from "@/components/DownloadPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Download Shared Images - ImageShareApp",
  description: "Download your shared images securely and easily.",
  openGraph: {
    title: "Download Shared Images",
    description: "Download your shared images securely and easily.",
    url: "https://image-sharing-app-theta.vercel.app/download",
    siteName: "ImageShareApp",
    images: [
      {
        url: "https://image-sharing-app-theta.vercel.app/og-download.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Shared Images",
    description: "Download your shared images securely and easily.",
    images: ["https://image-sharing-app-theta.vercel.app/og-download.png"],
  },
};

export default function page() {
  return <DownloadPage />;
}
