import Auth from "@/components/Auth/Auth";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login | PicShare - Secure File Sharing",
  description:
    "Access your PicShare account to securely share and manage your files. Simple, fast, and protected file sharing made easy.",
  keywords: [
    "PicShare",
    "Secure File Sharing",
    "File Upload",
    "File Download",
    "Protected Files",
    "Private File Sharing",
    "Cloud Storage",
  ],
  openGraph: {
    title: "Login | PicShare - Secure File Sharing",
    description:
      "Access your PicShare account to securely share and manage your files. Simple, fast, and protected file sharing made easy.",
    url: `${process.env.NEXT_PUBLIC_HOST_URL}/login`,
    siteName: "PicShare",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_HOST_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "PicShare - Secure File Sharing",
      },
    ],
    type: "website",
  },
};

export default function page() {
  return <Auth />;
}
