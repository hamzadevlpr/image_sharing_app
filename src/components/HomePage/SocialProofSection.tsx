import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Wedding Photographer",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
        content: "PicShare has revolutionized how I deliver photos to my clients. The privacy controls and beautiful galleries make every delivery feel professional.",
        rating: 5
    },
    {
        name: "Mike Rodriguez",
        role: "Social Media Manager",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        content: "Managing visual content for multiple clients used to be a nightmare. PicShare's collaborative features and organization tools saved my sanity.",
        rating: 5
    },
    {
        name: "Emma Thompson",
        role: "Travel Blogger",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
        content: "I love how easy it is to share my travel albums with family and friends. The one-click sharing and unlimited storage mean I never have to worry about space.",
        rating: 5
    },
    {
        name: "David Kim",
        role: "Event Coordinator",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        content: "The collaborative collections feature has transformed how we handle event photography. Guests can contribute their own photos seamlessly.",
        rating: 5
    },
    {
        name: "Lisa Wang",
        role: "Family Portrait Photographer",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&q=80",
        content: "Client galleries have never looked better. The password protection gives families peace of mind when sharing precious memories.",
        rating: 5
    }
];

const companies = [
    "TechCrunch", "Forbes", "Wired", "The Verge", "Fast Company"
];

const SocialProofSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* As Featured In */}
                <div className="text-center mb-16">
                    <p className="text-sm font-medium text-gray-500 mb-8">AS FEATURED IN</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                        {companies.map((company) => (
                            <div key={company} className="text-lg font-semibold text-gray-400">
                                {company}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Loved by{" "}
                        <span className="bg-gradient-to-r from-[#ef4444] to-[#f87171] bg-clip-text text-transparent">
                            creators worldwide
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join thousands of photographers, creators, and teams who trust PicShare with their most precious memories.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <Carousel
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={testimonial.name} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Card
                                        className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 h-full animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <CardContent className="p-8 flex flex-col h-full">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 mb-6">
                                                <Quote className="w-6 h-6 text-white" />
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                                                ))}
                                            </div>

                                            {/* Content */}
                                            <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                                                "{testimonial.content}"
                                            </p>

                                            {/* Author */}
                                            <div className="flex items-center mt-auto">
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-12 h-12 rounded-full mr-4 object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default SocialProofSection;