'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileX, Home, Search } from "lucide-react";
import Link from "next/link";

const NotFound = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* 404 Illustration */}
                <div className="mb-8 relative">
                    <div className="text-8xl md:text-9xl font-bold text-teal-100 select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 backdrop-blur-sm rounded-full p-6 shadow-lg">
                            <FileX className="h-16 w-16 md:h-20 md:w-20 text-teal-600" />
                        </div>
                    </div>
                </div>

                {/* Main Message */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Oops! The page you're looking for doesn't exist.
                </h1>

                {/* Supporting Text */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    It seems you've found a broken link or mistyped the address. But no worries — let's get you back on track.
                </p>

                {/* Search Bar */}
                <div className="mb-8 max-w-md mx-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            type="text"
                            placeholder="Search for what you need..."
                            className="pl-10 pr-4 py-3 border-gray-200 focus:border-teal-500 focus:ring-teal-500 rounded-lg"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        onClick={() => window.location.href = '/'}
                        className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        <Home className="h-5 w-5 mr-2" />
                        Back to Home
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => window.location.href = '/contact'}
                        className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3 rounded-lg font-medium transition-all duration-200"
                    >
                        Contact Support
                    </Button>
                </div>

                {/* Decorative Elements */}
                <div className="mt-12 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-teal-300 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>

                {/* Helpful Links */}
                <div className="mt-8 text-sm text-gray-500">
                    <p className="mb-4">Looking for something specific?</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/" className="text-teal-600 hover:text-teal-700 transition-colors">
                            Home
                        </Link>
                        <Link href="/share" className="text-teal-600 hover:text-teal-700 transition-colors">
                            File Sharing
                        </Link>
                        <Link href="/status" className="text-teal-600 hover:text-teal-700 transition-colors">
                            System Status
                        </Link>
                        <Link href="/contact" className="text-teal-600 hover:text-teal-700 transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;