import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | PicShare - Secure File Sharing Agreement",
  description:
    "Review the Terms of Service for PicShare. Understand your rights, responsibilities, and how we ensure secure, respectful use of our file-sharing platform.",
  keywords: [
    "Terms of Service",
    "PicShare Terms",
    "File Sharing Terms",
    "User Agreement",
    "Service Terms",
    "File Sharing Policy",
    "Secure File Sharing",
    "Intellectual Property",
    "Account Responsibilities",
    "PicShare Legal",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Terms of Service | PicShare",
    description:
      "By using PicShare, you agree to our Terms of Service. Learn about acceptable use, prohibited content, account responsibilities, and more.",
    url: `${process.env.NEXT_PUBLIC_HOST_URL}/terms-of-service`,
    siteName: "PicShare",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_HOST_URL}/og-images/terms-of-service.png`,
        width: 1200,
        height: 630,
        alt: "PicShare Terms of Service",
      },
    ],
  },
};

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-cus p-8 lg:p-12">
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Terms of Service
                </h1>
                <p className="text-gray-600">Last updated: December 2024</p>
              </div>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to PicShare! These Terms of Service govern your use of
                our secure file-sharing platform. By using our service, you
                agree to these terms. We've written them in clear language to
                help you understand your rights and responsibilities.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Content Sections */}
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Acceptance of Terms
                </h2>
                <p className="text-gray-700 mb-4">
                  By accessing or using PicShare, you agree to be bound by these
                  Terms of Service and our Privacy Policy. If you don't agree,
                  please don't use our service.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>You must be at least 13 years old to use our service</li>
                  <li>You're responsible for maintaining account security</li>
                  <li>You must provide accurate registration information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Service Description
                </h2>
                <p className="text-gray-700 mb-4">
                  PicShare provides secure file-sharing and storage services
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Encrypted file upload and sharing</li>
                  <li>Password-protected file access</li>
                  <li>Link expiration and download limits</li>
                  <li>File organization and management tools</li>
                  <li>Analytics and usage tracking</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  User Responsibilities
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Acceptable Use
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Use the service lawfully and respectfully</li>
                      <li>Don't upload malicious or harmful content</li>
                      <li>Respect intellectual property rights</li>
                      <li>Don't attempt to breach security measures</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Prohibited Content
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Illegal, harmful, or offensive material</li>
                      <li>Copyrighted content without permission</li>
                      <li>Malware, viruses, or malicious code</li>
                      <li>Content that violates privacy rights</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Service Availability
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    We strive for 99.9% uptime but don't guarantee uninterrupted
                    service
                  </li>
                  <li>Scheduled maintenance will be announced in advance</li>
                  <li>
                    We're not liable for service interruptions beyond our
                    control
                  </li>
                  <li>Free accounts may have usage limitations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Intellectual Property
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>You retain ownership of your uploaded content</li>
                  <li>You grant us license to store and process your files</li>
                  <li>Our platform and technology remain our property</li>
                  <li>Respect others' intellectual property rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-gray-700 mb-4">
                  To the maximum extent permitted by law, PicShare shall not be
                  liable for any indirect, incidental, special, or consequential
                  damages arising from your use of our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Termination
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Either party may terminate the agreement at any time</li>
                  <li>We may suspend accounts for terms violations</li>
                  <li>You can delete your account through settings</li>
                  <li>Data retention policies apply after termination</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-700">
                  Questions about these terms? Contact us at:
                  <br />
                  <strong>Email:</strong> legal@picshare.com
                  <br />
                  <strong>Address:</strong> 123 Legal Street, Terms City, TC
                  12345
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
