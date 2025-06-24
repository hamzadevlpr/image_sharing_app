import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-teal-50 to-coral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Start free,{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              upgrade when ready
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get unlimited uploads, albums, and sharing—completely free. No credit card required.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="border-2 border-gray-200 shadow-lg bg-white animate-fade-in">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Forever</h3>
                  <p className="text-gray-600 mb-4">Perfect for personal use</p>
                  <div className="text-4xl font-bold text-gray-900">$0</div>
                  <p className="text-gray-500">forever</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Unlimited uploads & albums</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>One-click sharing links</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Basic privacy controls</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Cloud backup</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Community support</span>
                  </li>
                </ul>

                <Button className="w-full bg-gradient-primary hover:from-teal-600 hover:to-teal-700 text-lg py-6">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-teal-500 shadow-xl bg-white relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Coming Soon
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                  <p className="text-gray-600 mb-4">For professional creators</p>
                  <div className="text-4xl font-bold text-gray-900">$9</div>
                  <p className="text-gray-500">per month</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>API access</span>
                  </li>
                </ul>

                <Button variant="outline" className="w-full border-2 border-teal-500 text-teal-600 hover:bg-teal-50 text-lg py-6" disabled>
                  Notify Me
                </Button>
              </CardContent>
            </Card>

            {/* Team Plan */}
            <Card className="border-2 border-gray-200 shadow-lg bg-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Team</h3>
                  <p className="text-gray-600 mb-4">For agencies & teams</p>
                  <div className="text-4xl font-bold text-gray-900">$29</div>
                  <p className="text-gray-500">per month</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Advanced permissions</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>White-label options</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                    <span>Dedicated support</span>
                  </li>
                </ul>

                <Button variant="outline" className="w-full border-2 border-gray-300 text-gray-600 hover:bg-gray-50 text-lg py-6" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center bg-white rounded-2xl p-8 shadow-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Zap className="w-8 h-8 text-coral-500 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to get started?
                </h3>
                <p className="text-gray-600 mb-4">
                  Join thousands of creators who trust PicShare with their memories.
                </p>
                <Button className="bg-gradient-primary hover:from-teal-600 hover:to-teal-700">
                  Create Your Free Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;