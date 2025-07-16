import { Lock, QrCode, Share, Upload } from 'lucide-react'
import React from 'react'
import ProTips from './ProTips'

export default function HowToShareImage() {
    return (
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Share Images</h2>
            <div className="bg-white rounded-3xl shadow-cus p-8 md:p-12">
                <div className="max-w-5xl mx-auto">
                    <p className="text-lg text-gray-600 mb-8 text-center">
                        Follow these simple steps to share your images securely and efficiently
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-cus">
                                <Upload className="h-10 w-10 text-white" />
                            </div>
                            <div className="w-8 h-1 bg-gradient-primary rounded-full mx-auto mb-4"></div>
                            <h3 className="font-bold text-gray-900 mb-2 text-cus">1. Upload Images</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Drag & drop or select multiple images from your device. All formats supported.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-gradient-to-r from-coral-400 to-coral-500 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-cus">
                                <Lock className="h-10 w-10 text-white" />
                            </div>
                            <div className="w-8 h-1 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full mx-auto mb-4"></div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">2. Set Security</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Add password protection and set expiration dates for sensitive images.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-cus">
                                <QrCode className="h-10 w-10 text-white" />
                            </div>
                            <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4"></div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">3. Generate Link</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get instant shareable links and QR codes for easy mobile sharing.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-cus">
                                <Share className="h-10 w-10 text-white" />
                            </div>
                            <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-4"></div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">4. Share Anywhere</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Send via email, social media, or messaging apps. Works everywhere.
                            </p>
                        </div>
                    </div>

                    {/* Pro Tips */}
                    <ProTips />

                </div>
            </div>
        </div>
    )
}
