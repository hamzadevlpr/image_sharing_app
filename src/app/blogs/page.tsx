import Blog from "@/components/Blog/Blog";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Latest Articles & Tips - Image Sharing Blog | ImageShareApp",
  description:
    "Explore expert tips, platform updates, and creative ideas on image sharing. Stay informed with our latest blog posts covering photo security, sharing tools, and community stories.",
  keywords:
    "image sharing blog, photo tips, image upload news, secure image hosting, creative photo sharing, photo privacy, photography blog, image hosting tutorials",
  openGraph: {
    title: "Image Sharing Blog - Tips, Updates & Inspiration",
    description:
      "Stay updated with expert articles, platform features, and creative tips on how to share images safely and effectively.",
    url: `${process.env.NEXT_PUBLIC_HOST_URL}/blog`,
    siteName: "ImageShareApp",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_HOST_URL}/blog-og-image.png`,
        width: 1200,
        height: 630,
        alt: "Blog section hero image showing photo sharing insights",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Sharing Blog - Tips & Tutorials | ImageShareApp",
    description:
      "Learn how to upload, share, and protect your images. Follow our blog for expert insights, guides, and feature updates.",
    images: [`${process.env.NEXT_PUBLIC_HOST_URL}/blog-og-image.png`],
  },
};

export default function page() {
  return <Blog />;
}
