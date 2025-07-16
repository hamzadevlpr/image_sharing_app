import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import type { LucideIcon } from 'lucide-react'

type CTAProps = {
    title: string
    description: string
    primary: {
        label: string
        icon: LucideIcon
        onClick?: () => void
    }
    secondary: {
        label: string
        icon: LucideIcon
        href: string
    }
}

export default function CTA({
    title,
    description,
    primary,
    secondary,
}: CTAProps) {
    return (
        <div className="bg-white text-center">
            <div className="max-w-7xl rounded-3xl shadow-cus p-12 mx-auto ">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {title}
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-gradient-primary hover:from-teal-600 hover:to-teal-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={primary.onClick}
                    >
                        <primary.icon className="h-5 w-5 mr-2" />
                        {primary.label}
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8 py-6 rounded-xl"
                    >
                        <Link href={secondary.href}>
                            <secondary.icon className="h-5 w-5 mr-2" />
                            {secondary.label}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
