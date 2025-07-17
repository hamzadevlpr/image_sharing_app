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
export     const mainServices = [
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
