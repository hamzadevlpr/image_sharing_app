'use client';
import FeaturesSection from "@/components/Share/Image/FeaturesSection";
import HeroSection from "@/components/HomePage/HeroSection";
import HowItWorksSection from "@/components/HomePage/HowItWorksSection";
import SocialProofSection from "@/components/HomePage/SocialProofSection";
import FAQSection from "@/components/HomePage/FAQSection";
import PricingSection from "@/components/HomePage/PricingSection";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SocialProofSection />
      <PricingSection />
      {/* <UpdatedPricingPlan /> */}
      <FAQSection />
    </React.Fragment>
  );
}
