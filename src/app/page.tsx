"use client";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HomePage/HeroSection";
import HowItWorksSection from "@/components/HomePage/HowItWorksSection";
import UpdatedPricingPlan from "@/components/HomePage/UpdatedPricingPlan";
import SocialProofSection from "@/components/HomePage/SocialProofSection";
import UploadArea from "@/components/UploadArea";
import UploadHeader from "@/components/UploadHeader";
import UploadProvider from "@/components/UploadProvider";
import FAQSection from "@/components/HomePage/FAQSection";
import PricingSection from "@/components/HomePage/PricingSection";

export default function Home() {
  return (
    <UploadProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <UploadHeader />
        <main className="container mx-auto px-4 py-8">
          <UploadArea />
        </main>
      </div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SocialProofSection />
      <PricingSection />
      {/* <UpdatedPricingPlan /> */}
      <FAQSection />
    </UploadProvider>
  );
}
