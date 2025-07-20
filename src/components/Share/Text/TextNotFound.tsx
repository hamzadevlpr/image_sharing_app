import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import React from 'react'

export default function TextNotFound({ handleHome }: { handleHome: () => void }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-coral-50">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Text Not Found
                    </h1>
                    <p className="text-gray-600 mb-6">
                        The shared text you're looking for doesn't exist or has burned.
                    </p>
                    <Button
                        onClick={handleHome}
                        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Return Home
                    </Button>
                </div>
            </main>
        </div>
    )
}
