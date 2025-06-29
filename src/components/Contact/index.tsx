'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Contact form submitted:", data);

        toast.success("Your message has been sent successfully! We'll get back to you shortly.");

        form.reset();
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
            <main className="pt-20 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Have a question or need help? We're here to support you. Send us a message and we'll respond as quickly as possible.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm z-10">
                                <CardHeader className="pb-6">
                                    <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                                        <Send className="h-6 w-6 text-teal-600" />
                                        Send us a Message
                                    </CardTitle>
                                    <p className="text-gray-600">
                                        Fill out the form below and we'll get back to you soon.
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Your full name"
                                                                    className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="your.email@example.com"
                                                                    className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>


                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-gray-700 font-medium">Message</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Tell us how we can help you..."
                                                                className="min-h-[120px] border-gray-200 focus:border-teal-500 focus:ring-teal-500 resize-none"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-3 transition-all duration-200"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="h-4 w-4 mr-2" />
                                                        Send Message
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Alternate Contact Methods */}
                            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl text-gray-800">Other Ways to Reach Us</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-teal-50/50 hover:bg-teal-50 transition-colors">
                                        <Mail className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-medium text-gray-800">Email Support</h3>
                                            <p className="text-sm text-gray-600 mb-1">For general inquiries</p>
                                            <a href="mailto:support@picshare.com" className="text-teal-600 hover:text-teal-700 font-medium">
                                                support@picshare.com
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Support Hours */}
                            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-gray-600" />
                                        Support Hours
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Monday - Friday</span>
                                            <span className="font-medium text-gray-800">9 AM - 6 PM UTC</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Saturday</span>
                                            <span className="font-medium text-gray-800">10 AM - 4 PM UTC</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Sunday</span>
                                            <span className="font-medium text-gray-600">Closed</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                                        <p className="text-sm text-teal-800">
                                            <strong>Response Time:</strong> We typically respond within 2-4 hours during business hours.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Links */}
                            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl text-gray-800">Quick Links</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <a href="#" className="block text-teal-600 hover:text-teal-700 font-medium">
                                            Help Center
                                        </a>
                                        <a href="#" className="block text-teal-600 hover:text-teal-700 font-medium">
                                            FAQ
                                        </a>
                                        <a href="/status" className="block text-teal-600 hover:text-teal-700 font-medium">
                                            System Status
                                        </a>
                                        <a href="#" className="block text-teal-600 hover:text-teal-700 font-medium">
                                            API Documentation
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default Contact;