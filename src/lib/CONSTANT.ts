import {
    Clock,
    Download,
    Globe,
    Link2,
    Lock,
    MessageSquare,
    QrCode,
    Upload,
    Users
} from 'lucide-react';
export const mainServices = [
    {
        id: 'file-sharing',
        title: 'File Sharing',
        description: 'Upload and share files of any size securely. Perfect for documents, images, videos, and more.',
        icon: Upload,
        features: ['Unlimited file size', 'End-to-end encryption', 'Password protection', 'Expiration dates'],
        color: 'from-teal-500 to-teal-600',
        href: '/share/image',
        popular: true
    },
    {
        id: 'text-sharing',
        title: 'Text Sharing',
        description: 'Share text snippets, notes, and messages instantly with advanced security options.',
        icon: MessageSquare,
        features: ['Quick sharing', 'Burn after reading', 'QR code generation', 'No registration needed'],
        color: 'from-coral-400 to-coral-500',
        href: '/share/text',
        popular: false
    },
    {
        id: 'qr-generator',
        title: 'QR Code Generator',
        description: 'Generate QR codes for any content, making mobile sharing incredibly easy.',
        icon: QrCode,
        features: ['Instant generation', 'High resolution', 'Mobile optimized', 'Scannable anywhere'],
        color: 'from-purple-500 to-purple-600',
        href: '/share/qr',
        popular: false
    }
];

export const additionalFeatures = [
    {
        title: 'Password Protection',
        description: 'Secure your shared content with custom passwords',
        icon: Lock,
        color: 'text-red-600 bg-red-100'
    },
    {
        title: 'Expiration Control',
        description: 'Set automatic deletion dates for sensitive content',
        icon: Clock,
        color: 'text-orange-600 bg-orange-100'
    },
    {
        title: 'Download Tracking',
        description: 'Monitor who accessed your shared files',
        icon: Download,
        color: 'text-green-600 bg-green-100'
    },
    {
        title: 'Link Customization',
        description: 'Create memorable, branded sharing links',
        icon: Link2,
        color: 'text-blue-600 bg-blue-100'
    },
    {
        title: 'Team Collaboration',
        description: 'Share with multiple users and manage permissions',
        icon: Users,
        color: 'text-indigo-600 bg-indigo-100'
    },
    {
        title: 'Global Access',
        description: 'Share content worldwide with reliable delivery',
        icon: Globe,
        color: 'text-teal-600 bg-teal-100'
    }
];

export const faqs = [
    {
        question: "Is PicShare really free forever?",
        answer:
            "Yes! We believe everyone deserves a safe place for their memories. Our free plan includes unlimited uploads, storage, and sharing features. As we grow, we'll introduce optional premium features for power users, but the core experience will always remain free.",
    },
    {
        question: "How secure are my photos on PicShare?",
        answer:
            "Your privacy is our top priority. All photos are encrypted during upload and storage. We use bank-level security protocols, and you have complete control over who can see your images. We never sell your data or use your photos for advertising.",
    },
    {
        question:
            "Can I share my photos with people who don't have PicShare accounts?",
        answer:
            "Absolutely! You can create shareable links that work for anyone, even without an account. You control the privacy settings - make albums public, private, or password-protected. Recipients can view and download photos directly from their browser.",
    },
    {
        question: "What file formats and sizes are supported?",
        answer:
            "We support all major image formats including JPEG, PNG, GIF, HEIC, and RAW files from most cameras. There's no limit on file size or resolution - upload your photos in their original quality and we'll handle the rest.",
    },
    {
        question: "How do I organize my photos into albums?",
        answer:
            "Creating albums is super simple! Just drag and drop photos into new or existing albums. You can organize by date, event, people, or any way that makes sense to you. Use tags and smart search to find photos instantly, even in large collections.",
    },
    {
        question: "Can I access my photos from mobile devices?",
        answer:
            "Yes! PicShare works seamlessly across all your devices. Access your photos from any smartphone, tablet, or computer through our responsive web app. Your photos sync instantly, so you'll always have access to your memories wherever you are.",
    },
];
