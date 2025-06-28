import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { ArrowLeft, Shield } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'
export const metadata: Metadata = {
    title: "Privacy Policy | PicShare - Your Data, Protected",
    description:
        "Learn how PicShare collects, uses, and protects your personal information. We prioritize your privacy with secure file sharing, data encryption, and full transparency.",
    keywords: [
        "Privacy Policy",
        "PicShare Privacy",
        "Data Protection",
        "Personal Data",
        "File Sharing Privacy",
        "Data Security",
        "User Rights",
        "GDPR Privacy",
        "End-to-End Encryption",
        "Secure File Sharing"
    ],
    robots: "index, follow",
    openGraph: {
        title: "Privacy Policy | PicShare",
        description:
            "Your privacy matters. Discover how PicShare safeguards your personal data with strict security, encryption, and transparency.",
        url: `${process.env.NEXT_PUBLIC_VERCEL_URl}/privacy-policy`,
        siteName: "PicShare",
        type: "website",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_VERCEL_URl}/og-images/privacy-policy.png`,
                width: 1200,
                height: 630,
                alt: "PicShare Privacy Policy",
            },
        ],
    },
};


export default function page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <div className="text-2xl font-bold text-teal-600">PicShare</div>
                        </Link>
                        <Link href="/">
                            <Button variant="ghost" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
                        {/* Header Section */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-teal-100 rounded-lg">
                                <Shield className="h-8 w-8 text-teal-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                    Privacy Policy
                                </h1>
                                <p className="text-gray-600">Last updated: December 2024</p>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="mb-8">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Your privacy matters to us. This Privacy Policy explains how PicShare collects, uses, protects, and shares your information when you use our secure file-sharing platform. We're committed to transparency and giving you control over your data.
                            </p>
                        </div>

                        <Separator className="my-8" />

                        {/* Content Sections */}
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">Information You Provide</h3>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                            <li>Account information (email, username, password)</li>
                                            <li>Files and content you upload or share</li>
                                            <li>Communication with our support team</li>
                                            <li>Payment information (processed securely by third parties)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">Automatically Collected Information</h3>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                            <li>Device information and IP address</li>
                                            <li>Usage data and analytics</li>
                                            <li>Cookies and similar technologies</li>
                                            <li>Log files and error reports</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Provide and improve our file-sharing services</li>
                                    <li>Secure your account and prevent fraud</li>
                                    <li>Send important service updates and notifications</li>
                                    <li>Analyze usage patterns to enhance user experience</li>
                                    <li>Comply with legal obligations</li>
                                    <li>Process payments and manage subscriptions</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                                <p className="text-gray-700 mb-4">We never sell your personal information. We may share your information only in these limited circumstances:</p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>With your explicit consent</li>
                                    <li>To comply with legal requirements</li>
                                    <li>With trusted service providers (under strict confidentiality)</li>
                                    <li>To protect our rights and prevent fraud</li>
                                    <li>In case of business transfer or merger</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                                <p className="text-gray-700 mb-4">We implement industry-standard security measures:</p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>End-to-end encryption for file transfers</li>
                                    <li>Secure data storage with encryption at rest</li>
                                    <li>Regular security audits and monitoring</li>
                                    <li>Multi-factor authentication options</li>
                                    <li>Secure access controls and permissions</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Access, update, or delete your personal information</li>
                                    <li>Control cookie preferences and tracking</li>
                                    <li>Opt out of marketing communications</li>
                                    <li>Request data portability</li>
                                    <li>File complaints with data protection authorities</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                                <p className="text-gray-700">
                                    If you have questions about this Privacy Policy or your data, contact us at:
                                    <br />
                                    <strong>Email:</strong> privacy@picshare.com
                                    <br />
                                    <strong>Address:</strong> 123 Privacy Street, Data City, DC 12345
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
