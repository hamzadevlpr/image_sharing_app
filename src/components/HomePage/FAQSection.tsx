import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is PicShare really free forever?",
      answer:
        "Yes! We believe everyone deserves a safe place for their memories. Our free plan includes unlimited uploads, storage, and sharing features. As we grow, we'll introduce optional premium features for power users, but the core experience will always remain free.",
    },
    {
      question: "How secure are my photos on PicShare?",
      answer:
        "Your privacy is our top priority. All photos are encrypted during upload and storage. We use bank-level security protocols, and you have complete control over who can see your images. We never sell your data or use your photos for advertising.",
    },
    {
      question:
        "Can I share my photos with people who don't have PicShare accounts?",
      answer:
        "Absolutely! You can create shareable links that work for anyone, even without an account. You control the privacy settings - make albums public, private, or password-protected. Recipients can view and download photos directly from their browser.",
    },
    {
      question: "What file formats and sizes are supported?",
      answer:
        "We support all major image formats including JPEG, PNG, GIF, HEIC, and RAW files from most cameras. There's no limit on file size or resolution - upload your photos in their original quality and we'll handle the rest.",
    },
    {
      question: "How do I organize my photos into albums?",
      answer:
        "Creating albums is super simple! Just drag and drop photos into new or existing albums. You can organize by date, event, people, or any way that makes sense to you. Use tags and smart search to find photos instantly, even in large collections.",
    },
    {
      question: "Can I access my photos from mobile devices?",
      answer:
        "Yes! PicShare works seamlessly across all your devices. Access your photos from any smartphone, tablet, or computer through our responsive web app. Your photos sync instantly, so you'll always have access to your memories wherever you are.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Got Questions? We've Got{" "}
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                Answers
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about PicShare, from getting started
              to advanced features.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-teal-600 transition-colors duration-200 py-6 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-6 pt-2 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-teal-50 to-coral-50 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our friendly support team is here to help you get the most out of
              PicShare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors duration-200">
                Contact Support
              </button>
              <button className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-xl hover:bg-teal-50 transition-colors duration-200">
                Browse Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
