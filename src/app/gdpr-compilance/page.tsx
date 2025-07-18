import React from 'react'
import { Scale, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "GDPR Compliance | PicShare - Protecting Your Data Privacy",
    description:
        "Discover how PicShare ensures full GDPR compliance. Learn about your rights under European data protection laws, our security measures, and how you can exercise your privacy rights.",
    keywords: [
        "GDPR",
        "GDPR Compliance",
        "PicShare GDPR",
        "Data Protection",
        "Privacy Rights",
        "EU Data Rights",
        "Personal Data",
        "Right to Erasure",
        "Data Portability",
        "GDPR Policy"
    ],
    robots: "index, follow",
    openGraph: {
        title: "GDPR Compliance | PicShare",
        description:
            "Your privacy matters. See how PicShare complies with GDPR to protect your personal data and ensure transparency.",
        url: `${process.env.NEXT_PUBLIC_HOST_URL}/gdpr`,
        siteName: "PicShare",
        type: "website",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_HOST_URL}/og-images/gdpr.png`,
                width: 1200,
                height: 630,
                alt: "PicShare GDPR Compliance",
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
                            <div className="p-3 bg-indigo-100 rounded-lg">
                                <Scale className="h-8 w-8 text-indigo-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                    GDPR Compliance
                                </h1>
                                <p className="text-gray-600">Last updated: December 2024</p>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="mb-8">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                PicShare is committed to protecting your privacy rights under the General Data Protection Regulation (GDPR). This page explains your rights as an EU resident and how we ensure compliance with European data protection laws.
                            </p>
                        </div>

                        <Separator className="my-8" />

                        {/* Content Sections */}
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your GDPR Rights</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Right to Information</h3>
                                        <p className="text-gray-700">
                                            We provide clear information about how we collect, use, and process your personal data.
                                        </p>
                                    </div>
                                    <div className="bg-teal-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Right of Access</h3>
                                        <p className="text-gray-700">
                                            You can request access to all personal data we hold about you at any time.
                                        </p>
                                    </div>
                                    <div className="bg-indigo-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Right to Rectification</h3>
                                        <p className="text-gray-700">
                                            You can correct inaccurate or incomplete personal data in your account.
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Right to Erasure</h3>
                                        <p className="text-gray-700">
                                            You can request deletion of your personal data under certain circumstances.
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Right to Portability</h3>
                                        <p className="text-gray-700">
                                            You can export your data in a structured, machine-readable format.
                                        </p>
                                    </div>
                                    <div className="bg-orange-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">Right to Object</h3>
                                        <p className="text-gray-700">
                                            You can object to processing based on legitimate interests or direct marketing.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Legal Basis for Processing</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">Consent</h3>
                                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                            <li>Marketing communications and newsletters</li>
                                            <li>Optional cookies and tracking</li>
                                            <li>Beta features and product testing</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">Contract Performance</h3>
                                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                            <li>Account creation and management</li>
                                            <li>File sharing and storage services</li>
                                            <li>Payment processing and billing</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">Legitimate Interest</h3>
                                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                            <li>Security and fraud prevention</li>
                                            <li>Service improvement and analytics</li>
                                            <li>Customer support and communication</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection Measures</h2>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Privacy by design and by default principles</li>
                                    <li>Regular data protection impact assessments</li>
                                    <li>Staff training on GDPR compliance</li>
                                    <li>Secure data processing agreements with vendors</li>
                                    <li>Incident response and breach notification procedures</li>
                                    <li>Regular security audits and penetration testing</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Transfers</h2>
                                <p className="text-gray-700 mb-4">
                                    When transferring your data outside the EU, we ensure adequate protection through:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Standard Contractual Clauses (SCCs)</li>
                                    <li>Adequacy decisions by the European Commission</li>
                                    <li>Binding Corporate Rules for internal transfers</li>
                                    <li>Certification schemes and approved codes of conduct</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Exercising Your Rights</h2>
                                <div className="bg-teal-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-800 mb-3">How to Contact Us</h3>
                                    <p className="text-gray-700 mb-4">
                                        To exercise your GDPR rights or ask questions about data protection:
                                    </p>
                                    <ul className="space-y-2 text-gray-700">
                                        <li><strong>Email:</strong> gdpr@picshare.com</li>
                                        <li><strong>Data Protection Officer:</strong> dpo@picshare.com</li>
                                        <li><strong>Address:</strong> 123 GDPR Street, Privacy City, PC 12345</li>
                                        <li><strong>Response Time:</strong> Within 30 days of your request</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Complaints and Supervisory Authority</h2>
                                <p className="text-gray-700 mb-4">
                                    If you're not satisfied with how we handle your personal data, you have the right to lodge a complaint with your local supervisory authority:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Contact your national data protection authority</li>
                                    <li>File a complaint online through their official website</li>
                                    <li>You can also contact us first to resolve issues directly</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-800 mb-3">Retention Periods</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li><strong>Account Data:</strong> Until account deletion + 30 days</li>
                                        <li><strong>File Content:</strong> Per your retention settings</li>
                                        <li><strong>Usage Logs:</strong> Maximum 2 years</li>
                                        <li><strong>Support Tickets:</strong> 3 years after resolution</li>
                                        <li><strong>Payment Records:</strong> 7 years (legal requirement)</li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
