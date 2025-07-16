'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ArrowRight,
    Clock,
    Download,
    Globe,
    Link2,
    Lock,
    MessageSquare,
    QrCode,
    Share,
    Upload,
    Users
} from 'lucide-react';
import Link from 'next/link';

const Services = () => {
    const mainServices = [
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

    const additionalFeatures = [
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

    return (
        <div className="min-h-screen bg-gradient-hero">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                                    <Share className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">PicShare</h1>
                                    <p className="text-sm text-gray-600">All Services</p>
                                </div>
                            </Link>
                        </div>
                        <Button asChild className="bg-gradient-primary hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                            <Link href="/">
                                <ArrowRight className="h-4 w-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Everything You Need to
                        <span className="bg-gradient-to-r from-teal-600 to-coral-500 bg-clip-text text-transparent block">
                            Share Securely
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From files to text, links to QR codes - PicShare provides all the tools you need
                        for secure, fast, and reliable content sharing.
                    </p>
                </div>

                {/* Main Services */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {mainServices.map((service) => {
                            const IconComponent = service.icon;
                            return (
                                <Card key={service.id} className="relative group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                                    {service.popular && (
                                        <div className="absolute top-4 right-4 bg-gradient-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                                            Most Popular
                                        </div>
                                    )}

                                    <CardHeader className="pb-4">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                                            {service.title}
                                        </CardTitle>
                                        <p className="text-gray-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        <div className="space-y-3">
                                            {service.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                                                    </div>
                                                    <span className="text-sm text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button
                                            asChild
                                            className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                                        >
                                            <Link href={service.href}>
                                                Try {service.title}
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Additional Features */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Powerful Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {additionalFeatures.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-gray-200">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                                <IconComponent className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 mb-2">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Ready to Start Sharing?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join thousands of users who trust PicShare for secure, fast, and reliable content sharing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-primary hover:from-teal-600 hover:to-teal-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Link href="/share">
                                    <Upload className="h-5 w-5 mr-2" />
                                    Share Files Now
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8 py-6 rounded-xl"
                            >
                                <Link href="/text">
                                    <MessageSquare className="h-5 w-5 mr-2" />
                                    Share Text
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;