"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import {
    BookOpen,
    Check,
    CheckCheck,
    Copy,
    FileText,
    Globe,
    MessageSquare,
    Shield,
    TextIcon
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CTA from "../Image/CTA";
import ExportOptions from "./ExportOptions";
import ProTips from "./ProTips";

interface SharedText {
    id: string;
    content: string;
    createdAt: Date;
    isPasswordProtected: boolean;
    burnAfterReading: boolean;
    shareCount: number;
    shareUrl: string;
}

const SameNetworkShare = () => {
    const [copied, setCopied] = useState(false);
    const [textContent, setTextContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const handleInputChange = (value: string) => {
        setTextContent(value);
        setIsTyping(value.length > 0);
    };

    const handleAction = async (type: string) => {
        try {
            await navigator.clipboard.writeText(textContent);
            toast.success("Link copied!");

            // show check for 3s
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch {
            toast.error("Failed to copy");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-hero">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-cus">
                        <MessageSquare className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Secure Text
                        <span className="bg-gradient-to-r from-teal-600 to-coral-500 bg-clip-text text-transparent block">
                            Sharing on Your Local Network
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Experience lightning‑fast text collaboration across devices connected to the same Wi‑Fi network. Our{" "}
                        <strong>LAN‑only</strong> pastebin lets you instantly paste and retrieve snippets without routing through the{" "}
                        <strong>public internet</strong>. Perfect for confidential notes, code reviews, meeting minutes, and{" "}
                        <strong>temporary messages</strong>.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
                    {/* Left column */}
                    <div id="text-share-section" className="lg:col-span-2 flex flex-col">
                        <Card className="border-gray-200 shadow-cus flex flex-col flex-1">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <MessageSquare
                                        className={`h-5 w-5 ${isTyping ? "text-teal-600" : "text-gray-400"}`}
                                    />
                                    Paste Your Text
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex flex-col h-[450px] overflow-hidden">
                                <div className="relative flex flex-col flex-1 overflow-hidden">
                                    <Button
                                        onClick={() => handleAction("copy")}
                                        variant="outline"
                                        disabled={loading || !textContent}
                                        className="z-10 absolute top-1 right-1 bg-white border-gray-200 hover:bg-teal-50 hover:border-teal-300"
                                        aria-label="Copy text content"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 text-green-600 animate-pulse" />
                                        ) : (
                                            <Copy className="h-4 w-4 group-hover:text-teal-600" />
                                        )}
                                    </Button>
                                    <Textarea
                                        id="content"
                                        placeholder="Type or paste your text here..."
                                        value={textContent}
                                        onChange={(e) => handleInputChange(e.target.value)}
                                        className="flex-1 min-h-0 resize-none overflow-auto border-gray-200 focus:border-teal-400 focus:ring-teal-400"
                                        aria-label="Text content input"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col space-y-6 h-[550px]">
                        <Card className="border-gray-200 shadow-cus bg-gradient-to-br from-teal-50 to-coral-50 flex-1 overflow-auto">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-gray-900 mb-2">Why Choose Local Network Text Sharing?</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• No Internet Required</li>
                                    <li>• End‑to‑End Encryption</li>
                                    <li>• One‑Click Paste & Read</li>
                                    <li>• Built‑In File Export</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 shadow-cus flex-1 flex flex-col">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <FileText className="h-5 w-5" />
                                    Export Options
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-auto">
                                <ExportOptions content={textContent} />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Instructions Section */}
                <div className="mb-16">
                    <div className="bg-white rounded-2xl shadow-cus border border-gray-100 p-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    How It Works
                                </h2>
                                <p className="text-xl text-gray-600">
                                    1. Paste Your Text → 2. Configure Security → 3. Generate & Share → 4. Access & Self‑Destruct
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 mb-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageSquare className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Paste Your Text</h3>
                                    <p className="text-gray-600 text-sm">
                                        Simply paste or type your text into the large, scrollable textarea.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Shield className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Configure Security</h3>
                                    <p className="text-gray-600 text-sm">
                                        Enable “Delete After Reading” or set a password for sensitive snippets.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Globe className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Generate & Share</h3>
                                    <p className="text-gray-600 text-sm">
                                        Click Create Link or generate a QR code—accessible only on your LAN.
                                    </p>
                                </div>
                            </div>

                            <ProTips />

                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Perfect for confidential notes, code reviews, meeting minutes, and quick one‑time messages.
                                </p>
                                <Button
                                    className="bg-gradient-primary hover:from-teal-600 hover:to-teal-700"
                                    onClick={() =>
                                        document.getElementById("text-share-section")?.scrollIntoView({ behavior: "smooth" })
                                    }
                                >
                                    Start Sharing Text Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <CTA
                    title="Ready to Share Your Thoughts?"
                    description="Writers and teams love our local pastebin for its instant, secure sharing experience."
                    primary={{
                        label: "Start Writing Now",
                        icon: FileText,
                        onClick: () => document.getElementById("text-share-section")?.scrollIntoView({ behavior: "smooth" }),
                    }}
                    secondary={{
                        label: "Explore Blogs",
                        icon: MessageSquare,
                        href: "/blogs",
                    }}
                />
            </div>
        </div>
    );
};

export default SameNetworkShare;
