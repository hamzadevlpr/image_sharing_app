
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Zap, Star } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-teal-50 to-coral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            🎉 Launch Special:{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Everything free forever
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All features unlocked, unlimited uploads and albums—completely free. No credit card required.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Free Forever Card */}
          <Card className="border-2 border-teal-500 shadow-2xl bg-white relative animate-fade-in">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-coral-500 to-coral-400 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Launch Offer
              </div>
            </div>

            <CardContent className="p-12">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Free Forever</h3>
                <p className="text-gray-600 mb-6">All features unlocked during our launch period</p>
                <div className="text-5xl font-bold text-teal-600 mb-2">$0</div>
                <p className="text-gray-500">No credit card required</p>
              </div>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center">
                  <Check className="w-6 h-6 text-teal-600 mr-4" />
                  <span className="text-lg">Unlimited uploads & albums</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-6 h-6 text-teal-600 mr-4" />
                  <span className="text-lg">One-click sharing links</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-6 h-6 text-teal-600 mr-4" />
                  <span className="text-lg">Privacy controls & password protection</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-6 h-6 text-teal-600 mr-4" />
                  <span className="text-lg">Collaborative collections</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-6 h-6 text-teal-600 mr-4" />
                  <span className="text-lg">Automatic cloud backup</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-6 h-6 text-teal-600 mr-4" />
                  <span className="text-lg">Lightning-fast performance</span>
                </li>
              </ul>

              <Button className="w-full bg-gradient-primary hover:from-teal-600 hover:to-teal-700 text-xl py-8 text-white font-semibold">
                Get Started Free - No Credit Card Required
              </Button>
            </CardContent>
          </Card>

          {/* Future Plans Info */}
          <div className="text-center mt-12 bg-white rounded-2xl p-8 shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              What's Coming Next?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              As our community grows, we'll introduce flexible paid tiers with advanced analytics,
              white-labeling options, and priority support—but that's still months away.
            </p>
            <div className="inline-flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              Early adopters keep free access forever
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;