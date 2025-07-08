import { CheckCircle } from 'lucide-react'

export default function ProTips() {
    return (
        <div className="bg-teal-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Why Choose PicShare for Text Sharing?</h3>
            <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                    End-to-end encryption for all shared content
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                    Password protection and expiration options
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                    QR code generation for mobile sharing
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                    No registration required - completely free
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                    Works on all devices and browsers
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                    Export options (TXT, PDF formats)
                </li>
            </ul>
        </div>
    )
}
