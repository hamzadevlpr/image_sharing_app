import Status from '@/components/Status'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "PicShare System Status | Uptime & Service Updates",
    description: "Check real-time status of PicShare's file-sharing platform. Stay informed about system uptime, scheduled maintenance, and incident reports.",
    keywords: "PicShare status, system status, service uptime, file-sharing status, platform status, service availability, maintenance updates",
    openGraph: {
        title: "PicShare System Status | Uptime & Service Updates",
        description: "Real-time system status, uptime, and incident updates for PicShare's secure file-sharing platform.",
        url: `${process.env.NEXT_PUBLIC_HOST_URL}/status`,
        siteName: "PicShare",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_HOST_URL}/og-images/status.png`,
                width: 1200,
                height: 630,
                alt: "PicShare System Status Overview",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "PicShare System Status | Uptime & Service Updates",
        description: "Get live updates on PicShare's system status, maintenance, and service availability.",
        images: [ `${process.env.NEXT_PUBLIC_HOST_URL}/og-images/status.png`],
    },
};

export default function page() {
    return (
        <Status />
    )
}
