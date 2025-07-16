
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FolderOpen, Share } from "lucide-react";

const steps = [
    {
        icon: Upload,
        number: "01",
        title: "Upload Your Photos",
        description: "Drag and drop your images or select them from your device. Our smart uploader handles multiple files effortlessly."
    },
    {
        icon: FolderOpen,
        number: "02",
        title: "Organize Into Albums",
        description: "Create themed collections and organize your photos the way you want. Tag, sort, and structure your memories."
    },
    {
        icon: Share,
        number: "03",
        title: "Share Securely",
        description: "Generate secure sharing links with privacy controls. Share with anyone while maintaining complete control over access."
    }
];

const HowItWorksSection = () => {
    return (
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Get started in{" "}
                        <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                            3 simple steps
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        From chaos to organized in minutes. PicShare makes photo management effortless.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connection lines for desktop */}
                    <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
                        <div className="flex justify-between items-center px-24">
                            <div className="w-32 h-px bg-gradient-to-r from-teal-300 to-coral-300"></div>
                            <div className="w-32 h-px bg-gradient-to-r from-teal-300 to-coral-300"></div>
                        </div>
                    </div>

                    {steps.map((step, index) => (
                        <Card
                            key={step.title}
                            className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white animate-fade-in"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <CardContent className="p-8 text-center">
                                {/* Step number */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-coral-500 to-coral-400 flex items-center justify-center text-white font-bold text-sm">
                                        {step.number}
                                    </div>
                                </div>

                                {/* Icon */}
                                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 mx-auto mb-6 mt-4">
                                    <step.icon className="w-10 h-10 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;