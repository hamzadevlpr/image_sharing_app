import ImageShare from "@/components/Share/Image/ShareImage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Share Image Everywhere - PicShare',
    description:
        'Share Image effortlessly with PicShare. Create shareable links for your Image content and share everywhere securely and instantly.',
    keywords: [
        'share everywhere',
        'Image sharing',
        'share Image online',
        'PicShare',
        'secure Image sharing',
        'instant Image links',
    ],
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
            }/share/Image`,
    },
    openGraph: {
        title: 'Share Image Everywhere - PicShare',
        description:
            'Easily share Image with shareable links using PicShare. Share everywhere with confidence, securely and instantly.',
        url: `${process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
            }/share/Image`,
        siteName: 'PicShare',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
                    }/og-Image-sharing.png`,
                width: 1200,
                height: 630,
                alt: 'Share Image Everywhere with PicShare',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Share Image Everywhere - PicShare',
        description:
            'Use PicShare to share Image instantly with secure links. Share everywhere with ease!',
        images: [
            `${process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
            }/og-Image-sharing.png`,
        ],
    },
};
export default function page() {
    return (
        <ImageShare />
    );
}
