"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import {
  Check,
  Clipboard,
  FileText,
  Home,
  Lock,
  RefreshCcw,
  Save,
  Timer
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TextNotFound from "./TextNotFound";
import Skeleton from "./Skeleton";
import ExportOptions from "./ExportOptions";

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
  const [textContent, setTextContent] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [hasTriedPassword, setHasTriedPassword] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);


  const handleInputChange = (value: string) => {
    setTextContent(value);
    setIsTyping(value.length > 0);

    if (debounceTimer) clearTimeout(debounceTimer);

    const newTimer = setTimeout(() => {
      handleSave(); // Auto-save after 10 seconds
    }, 3000); // 10 seconds

    setDebounceTimer(newTimer);
  };

  const handleSave = async () => {
    if (!slug || !textContent || textContent === textData?.content) return;

    setIsSaving(true);
    try {
      await axios.patch(`/api/cloud/textshare/${slug}`, {
        content: textContent,
      });
    } catch (error) {
      toast.error("Failed to save text.");
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const fetchText = async (providedPassword?: string) => {
    try {
      const url = `/api/cloud/textshare/${slug}${providedPassword ? `?password=${providedPassword}` : ""}`;
      const res = await axios.get(url);

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
      setTextContent(data.content);
      setShowPasswordPrompt(false);
    } catch (error: any) {
      console.log(error?.response?.data?.error)
      if (error?.response?.data?.error === "Password required") {
        setShowPasswordPrompt(true);
      } else {
        console.error("Failed to fetch text:", error);
        setTextData(null);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

    if (slug) fetchText();
  }, [slug]);

  const handleCopy = async (type: string) => {

    setCopied(true);
    await navigator.clipboard.writeText(textData?.content || "");
    toast.success("Text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleHome = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <Skeleton />
    );
  }

  // if (!textData) {
  //   return (
  //     <TextNotFound handleHome={handleHome} />
  //   );
  // }

  if (showPasswordPrompt && !textData) {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center">
        <Card className="p-6 w-full max-w-md shadow-lg">
          <CardHeader className="mb-4">
            <h2 className="text-lg font-semibold text-center text-gray-900">
              Password Required
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="password">Enter password to view this text</Label>
            <input
              type="password"
              id="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-full"
              onClick={() => {
                setHasTriedPassword(true);
                fetchText(password);
              }}
            >
              Submit
            </Button>
            {hasTriedPassword && !textData && (
              <p className="text-red-500 text-sm">Incorrect password. Try again.</p>
            )}
          </CardContent>
        </Card>
      </section>
    );
  }


  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-coral-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Shared Text</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 h-[550px]">
            <div id="text-share-section" className="lg:col-span-2 space-y-6">
              <Card className="bg-white rounded-2xl shadow-cus animate-fade-in p-6">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{textData?.title || "Shared Text"}</h2>
                      <p className="text-sm text-gray-500">Shared on {new Date(textData?.createdAt || "").toLocaleDateString()}</p>
                    </div>
                    {textData?.isPasswordProtected && (
                      <Badge className="bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Lock className="h-3 w-3" /> Protected
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Textarea with Copy */}
                  <div className="relative mb-4">
                    <Label htmlFor="content" className="block mb-1">Your Text</Label>
                    <Textarea
                      id="content"
                      value={textContent || textData?.content}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Type or paste your text here..."
                      className="min-h-[200px] w-full pr-10 resize-none border-gray-200 focus:border-teal-400 focus:ring-teal-400"
                    />
                    <span
                      onClick={() => handleCopy("text")}
                      title="Copy Text"
                      className="absolute top-10 right-5 p-1 border-2 border-gray-200 rounded-md hover:border-teal-500 hover:bg-teal-50"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Clipboard className="h-4 w-4 text-gray-500" />}
                    </span>
                    <span
                      onClick={async () => {
                        setIsRefreshing(true);
                        await fetchText(password);
                        setTimeout(() => setIsRefreshing(false), 100);
                      }}
                      title="Refresh Text"
                      className="absolute top-10 right-16 p-1 border-2 border-gray-200 rounded-md hover:border-teal-500 hover:bg-teal-50 cursor-pointer transition-transform"
                    >
                      <RefreshCcw className={`h-4 w-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </span>
                  </div>

                  {/* One-Time View Notice */}
                  {textData?.burnAfterReading && (
                    <div className="flex items-center justify-center text-xs text-red-500 mt-2">
                      <Timer className="h-3 w-3 mr-1" />
                      One-time view • This text will be deleted after you leave
                    </div>
                  )}

                  {/* Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="group border-2 hover:border-teal-500 hover:bg-teal-50"
                    >
                      <Save className="h-4 w-4 mr-2 group-hover:text-teal-600" />
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                    <Button variant="outline" onClick={handleHome} className="group border-2 hover:border-teal-500 hover:bg-teal-50">
                      <Home className="h-4 w-4 mr-2 group-hover:text-teal-600" /> Home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col space-y-6">
              <Card className="border border-gray-200 shadow-md hover:shadow-lg transition bg-gradient-to-br from-white to-teal-50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-gray-900 text-base font-semibold">
                    <FileText className="h-5 w-5 text-teal-600" />
                    Export Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ExportOptions content={textContent || ""} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </section>

  );
};

export default ViewSharedText;
