import { Card, CardContent } from '@/components/ui/card';
import {
    Globe,
    Shield,
    Smartphone,
    Zap
} from 'lucide-react';

export default function FeatureCards() {
    const features = [
        {
            icon: Shield,
            title: 'Secure Upload',
            description: 'End-to-end encryption protects your images'
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Upload and share images in seconds'
        },
        {
            icon: Globe,
            title: 'Global Access',
            description: 'Share anywhere in the world instantly'
        },
        {
            icon: Smartphone,
            title: 'Mobile Friendly',
            description: 'Perfect experience on all devices'
        }
    ];
    return (
        <div className="space-y-4">
            {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-gray-200">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    )
}
