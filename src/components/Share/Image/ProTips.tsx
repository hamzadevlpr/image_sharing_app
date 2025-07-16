import { ImageIcon } from 'lucide-react'
import React from 'react'

export default function ProTips() {
    return (
        <div className="bg-gradient-to-r from-teal-50 to-coral-50 rounded-3xl p-8 mb-8">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center text-xl">
                <ImageIcon className="h-6 w-6 mr-3 text-teal-600" />
                Pro Tips for Perfect Image Sharing
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <div>
                            <span className="font-semibold text-gray-800">High Resolution:</span>
                            <p className="text-gray-600 text-sm mt-1">Upload images in original resolution for best quality preservation</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-2 h-2 bg-coral-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <div>
                            <span className="font-semibold text-gray-800">Batch Upload:</span>
                            <p className="text-gray-600 text-sm mt-1">Select multiple images at once to create albums and galleries</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <div>
                            <span className="font-semibold text-gray-800">Format Support:</span>
                            <p className="text-gray-600 text-sm mt-1">JPG, PNG, GIF, WebP, HEIC, and many more formats supported</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <div>
                            <span className="font-semibold text-gray-800">Mobile Ready:</span>
                            <p className="text-gray-600 text-sm mt-1">QR codes make sharing to mobile devices instant and effortless</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
