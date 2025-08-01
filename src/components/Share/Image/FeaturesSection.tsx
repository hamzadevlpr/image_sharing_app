
import { Card, CardContent } from "@/components/ui/card";
import { Folder, Share2, Shield, Users, Cloud, Zap } from "lucide-react";

const features = [
  {
    icon: Folder,
    title: "Unlimited Albums",
    description: "Create as many themed collections as you like—never delete another photo again. Organize by events, projects, or any way that makes sense to you."
  },
  {
    icon: Share2,
    title: "One-Click Sharing",
    description: "Generate shareable links or embed codes in seconds. Share your entire album or individual photos with just a click."
  },
  {
    icon: Shield,
    title: "Privacy Controls",
    description: "Password-protected galleries and expiring links keep your images safe. You control who sees what, when."
  },
  {
    icon: Users,
    title: "Collaborative Collections",
    description: "Invite friends or clients to add images to shared albums. Perfect for events, projects, or team collaborations."
  },
  {
    icon: Cloud,
    title: "Automatic Backups",
    description: "Sync and store all uploads in the cloud without lifting a finger. Your memories are always safe and accessible."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Upload, organize, and share at blazing speed. Our optimized platform ensures your photos load instantly, every time."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-[#ef4444] to-[#f87171] bg-clip-text text-transparent">
              organize & share
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            PicShare combines powerful organization tools with seamless sharing capabilities, 
            all while keeping your privacy and security at the forefront.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in bg-gradient-to-br from-white to-gray-50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;