import Contact from '@/components/Contact'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Contact Us | Get Support from PicShare",
    description: "Need help or have questions? Reach out to PicShare's support team for assistance with billing, technical issues, or general inquiries.",
    keywords: "Contact PicShare, PicShare support, file-sharing help, technical support, billing support, PicShare contact form",
    openGraph: {
        title: "Contact Us | Get Support from PicShare",
        description: "Reach out to our friendly PicShare support team. We're here to help with any questions or issues you may have.",
        url: `${process.env.NEXT_PUBLIC_HOST_URL}/contact`,
        siteName: "PicShare",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_HOST_URL}/og-images/contact.png`,
                width: 1200,
                height: 630,
                alt: "PicShare Support Team",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us | Get Support from PicShare",
        description: "Have questions or need support? Contact PicShare for prompt assistance.",
        images: [`${process.env.NEXT_PUBLIC_HOST_URL}/og-images/contact.png`],
    },
};

export default function page() {
    return (
        <Contact />
    )
}
