'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-teal-600">PicShare</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-teal-600 transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-teal-600 transition-colors">Pricing</a>
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
              Sign In
            </Button>
            <Button className="bg-gradient-primary hover:from-teal-600 hover:to-teal-700">
              Get Started Free
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-4 animate-fade-in">
            <a href="#features" className="block text-gray-600 hover:text-teal-600 transition-colors">Features</a>
            <a href="#how-it-works" className="block text-gray-600 hover:text-teal-600 transition-colors">How It Works</a>
            <a href="#pricing" className="block text-gray-600 hover:text-teal-600 transition-colors">Pricing</a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Sign In
              </Button>
              <Button className="bg-gradient-primary hover:from-teal-600 hover:to-teal-700">
                Get Started Free
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;