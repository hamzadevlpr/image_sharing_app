"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import {
    Check,
    Clipboard,
    FileText,
    Home,
    Lock,
    Timer
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SharedTextData {
  id: string;
  content: string;
  isPasswordProtected: boolean; // derived from isPasswordProtected
  burnAfterReading: boolean;
  title?: string;
  createdAt: string;
}

const ViewSharedText = () => {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const [textData, setTextData] = useState<SharedTextData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const res = await axios.get(`/api/cloud/textshare/${slug}`);
        if (res.status !== 200) throw new Error("Failed to fetch text");

        const raw = res.data;

        const data: SharedTextData = {
          id: raw.id,
          content: raw.content,
          isPasswordProtected: raw.isPasswordProtected,
          burnAfterReading: raw.burnAfterReading,
          title: raw.title || "Shared Text",
          createdAt: raw.createdAt,
        };

        setTextData(data);
      } catch (error) {
        console.error("Failed to fetch text:", error);
        setTextData(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchText();
  }, [slug]);

  const handleCopy = async () => {
    if (!textData) return;

    try {
      await navigator.clipboard.writeText(textData.content);
      setCopied(true);
      toast.success("Text copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy text. Please try again.");
    }
  };

  const handleDownload = () => {
    if (!textData) return;

    const blob = new Blob([textData.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shared-text-${textData.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Text downloaded successfully!");
  };

  const handleHome = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-coral-50">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-lg mb-6"></div>
              <Card className="bg-white shadow-cus rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!textData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-coral-50">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Text Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The shared text you're looking for doesn't exist or has burned.
            </p>
            <Button
              onClick={handleHome}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
            >
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-coral-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center flex-1">
              Your Shared Text
            </h1>
            <div className="w-20"></div> {/* Spacer for center alignment */}
          </div>

          {/* Content Card */}
          <Card className="bg-white shadow-cus rounded-2xl animate-fade-in border-0">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {textData.title || "Shared Text"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Shared on{" "}
                    {new Date(textData.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {textData.isPasswordProtected && (
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-800 border-amber-200"
                    >
                      <Lock className="h-3 w-3 mr-1" />
                      Protected
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <pre className="font-mono text-sm leading-relaxed text-gray-800 whitespace-pre-wrap break-words">
                  {textData.content}
                </pre>
              </div>

              {textData.burnAfterReading && (
                <div className="flex items-center justify-center text-xs text-gray-500 mb-4">
                  <Timer className="h-3 w-3 mr-1" />
                  One-time view • This text will be deleted after you leave
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="group relative overflow-hidden border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {copied ? (
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                  ) : (
                    <Clipboard className="h-4 w-4 mr-2 group-hover:text-teal-600 transition-colors" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleDownload}
                  className="group border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300"
                >
                  <FileText className="h-4 w-4 mr-2 group-hover:text-teal-600 transition-colors" />
                  Download
                </Button>

                <Button
                  variant="outline"
                  onClick={handleHome}
                  className="group border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300"
                >
                  <Home className="h-4 w-4 mr-2 group-hover:text-teal-600 transition-colors" />
                  Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ViewSharedText;
