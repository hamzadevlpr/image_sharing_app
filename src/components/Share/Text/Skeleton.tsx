import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

export default function Skeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-coral-50">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded-lg mb-6"></div>
                        <Card className="bg-white shadow-cus rounded-2xl">
                            <CardHeader className="pb-4">
                                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
