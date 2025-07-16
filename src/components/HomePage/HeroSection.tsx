
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";
import VideoModal from "./VideoModal";

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-coral-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
            Meet PicShare: The{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Ultimate Home
            </span>
            <br />
            for Your Photos
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Start for free, share with anyone, control your privacy.
            The modern way to organize and protect your memories.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              href="/services"
              className="bg-gradient-primary hover:from-teal-600 hover:to-teal-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started for Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="mb-4">Trusted by 50,000+ photographers and creators worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-teal-600 rounded-full"></div>
                <span>Unlimited Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-coral-500 rounded-full"></div>
                <span>Privacy First</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                <span>Free Forever</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="max-w-5xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1200&q=80"
              alt="Person using PicShare on laptop"
              className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId="dQw4w9WgXcQ" // Replace with your actual YouTube video ID
      />
    </section>
  );
};

export default HeroSection;