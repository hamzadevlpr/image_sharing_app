import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Cookie } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
    title: "Cookie Policy | PicShare - Understand How We Use Cookies",
    description:
        "Learn how PicShare uses cookies to enhance your experience. Understand what types of cookies we use, why we use them, and how you can manage your preferences.",
    keywords: [
        "Cookie Policy",
        "PicShare Cookies",
        "How we use cookies",
        "Manage cookie preferences",
        "Essential cookies",
        "Analytics cookies",
        "Marketing cookies",
        "Third-party cookies",
        "File sharing privacy",
        "Cookie settings"
    ],
    robots: "index, follow",
    openGraph: {
        title: "Cookie Policy | PicShare",
        description:
            "We use cookies to ensure you have the best experience on PicShare. Discover how they work and how to control them.",
        url: `${process.env.NEXT_PUBLIC_VERCEL_URl}/cookie-policy`,
        siteName: "PicShare",
        type: "website",
        images: [
            {
                url:`${process.env.NEXT_PUBLIC_VERCEL_URl}/og-images/cookie-policy.png`,
                width: 1200,
                height: 630,
                alt: "PicShare Cookie Policy",
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
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <Cookie className="h-8 w-8 text-orange-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                    Cookie Policy
                                </h1>
                                <p className="text-gray-600">Last updated: December 2024</p>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="mb-8">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                This Cookie Policy explains how PicShare uses cookies and similar tracking technologies on our file-sharing platform. We believe in transparency about how we collect and use data to improve your experience.
                            </p>
                        </div>

                        <Separator className="my-8" />

                        {/* Content Sections */}
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
                                <p className="text-gray-700 mb-4">
                                    Cookies are small text files stored on your device when you visit our website. They help us remember your preferences, improve functionality, and analyze how you use our service.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Session cookies: Deleted when you close your browser</li>
                                    <li>Persistent cookies: Remain until expiration or deletion</li>
                                    <li>First-party cookies: Set by PicShare directly</li>
                                    <li>Third-party cookies: Set by our trusted partners</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Essential Cookies</h3>
                                        <p className="text-gray-700 mb-2">Required for basic website functionality:</p>
                                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                            <li>Authentication and login management</li>
                                            <li>Security and fraud prevention</li>
                                            <li>Load balancing and performance</li>
                                            <li>Form submission and error handling</li>
                                        </ul>
                                    </div>

                                    <div className="bg-blue-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Analytics Cookies</h3>
                                        <p className="text-gray-700 mb-2">Help us understand how you use our service:</p>
                                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                            <li>Page views and user journeys</li>
                                            <li>Feature usage and engagement</li>
                                            <li>Error tracking and diagnostics</li>
                                            <li>Performance monitoring</li>
                                        </ul>
                                    </div>

                                    <div className="bg-teal-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Functional Cookies</h3>
                                        <p className="text-gray-700 mb-2">Remember your preferences and settings:</p>
                                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                            <li>Language and region preferences</li>
                                            <li>Theme and display settings</li>
                                            <li>File organization preferences</li>
                                            <li>Notification settings</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Marketing Cookies</h3>
                                        <p className="text-gray-700 mb-2">Used for personalized advertising (with consent):</p>
                                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                            <li>Targeted advertising campaigns</li>
                                            <li>Social media integration</li>
                                            <li>Conversion tracking</li>
                                            <li>Retargeting and remarketing</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
                                <p className="text-gray-700 mb-4">We work with trusted partners who may set cookies:</p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>Google Analytics:</strong> Website analytics and reporting</li>
                                    <li><strong>Stripe:</strong> Payment processing and fraud prevention</li>
                                    <li><strong>Intercom:</strong> Customer support chat functionality</li>
                                    <li><strong>Hotjar:</strong> User experience and heatmap analysis</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Your Cookies</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">Cookie Preferences</h3>
                                        <p className="text-gray-700 mb-2">You can control cookie settings through:</p>
                                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                            <li>Our cookie banner when you first visit</li>
                                            <li>Cookie preferences in your account settings</li>
                                            <li>Browser settings and controls</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">Browser Controls</h3>
                                        <p className="text-gray-700 mb-2">Most browsers allow you to:</p>
                                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                            <li>View and delete existing cookies</li>
                                            <li>Block cookies from specific sites</li>
                                            <li>Block third-party cookies entirely</li>
                                            <li>Clear cookies when closing the browser</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie Retention</h2>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Session cookies expire when you close your browser</li>
                                    <li>Functional cookies typically last 1-2 years</li>
                                    <li>Analytics cookies usually expire after 2 years</li>
                                    <li>Marketing cookies may last up to 2 years</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                                <p className="text-gray-700">
                                    Questions about our cookie usage? Contact us at:
                                    <br />
                                    <strong>Email:</strong> cookies@picshare.com
                                    <br />
                                    <strong>Address:</strong> 123 Cookie Street, Data City, DC 12345
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
