"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Clock,
  Copy,
  FileText,
  Globe,
  Link2,
  Loader,
  Lock,
  MessageSquare,
  QrCode,
  Share,
  Shield,
  TextIcon,
} from "lucide-react";
import { useState } from "react";
import CTA from "../Image/CTA";
import ProTips from "./ProTips";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

interface SharedText {
  id: string;
  content: string;
  createdAt: Date;
  isPasswordProtected: boolean;
  burnAfterReading: boolean;
  shareCount: number;
  shareUrl: string;
}

const TextShare: React.FC<SharedText> = () => {
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [burnAfterReading, setBurnAfterReading] = useState(false);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentShareUrl, setCurrentShareUrl] = useState("");

  const handleInputChange = (value: string) => {
    setTextContent(value);
    setIsTyping(value.length > 0);
  };

  const createShare = async () => {
    if (!textContent.trim()) {
      toast.error("Text content cannot be empty");
      return;
    }
    if (passwordProtected && !password.trim()) {
      toast.error("Password is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/cloud/textshare", {
        content: textContent,
        password: passwordProtected ? password : undefined,
        burnAfterReading,
      });
      const { slug } = res.data;
      const url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/share/text/view/${slug}`;
      setCurrentShareUrl(url);
      toast.success("Link created!");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to create share");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type: "copy" | "share" | "qr") => {
    if (!currentShareUrl) return;
    switch (type) {
      case "copy":
        await navigator.clipboard.writeText(currentShareUrl);
        toast.success("Link copied!");
        break;
      case "share":
        if (navigator.share) {
          await navigator.share({ title: "Shared Text", url: currentShareUrl });
        } else {
          await navigator.clipboard.writeText(currentShareUrl);
          toast.success("Link copied!");
        }
        break;
      case "qr":
        setShowQRModal(true);
        break;
    }
  };
  const hasActions = Boolean(currentShareUrl);
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-cus">
            <TextIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Share Text
            <span className="bg-gradient-to-r from-teal-600 to-coral-500 bg-clip-text text-transparent block">
              Securely & Instantly
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Easily upload and share your text snippets—code snippets, notes, or
            documents—with end‑to‑end encryption. Perfect for developers,
            writers, and teams who need <strong>secure text sharing</strong>,
            <strong>private pastebin</strong>, and{" "}
            <strong>instant text collaboration</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div id="text-share-section" className="lg:col-span-2 space-y-6">
            <Card className="border-gray-200 shadow-cus">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <MessageSquare
                    className={`h-5 w-5 ${
                      isTyping ? "text-teal-600" : "text-gray-400"
                    }`}
                  />
                  Share Your Text
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="content">Your Text</Label>
                  <Textarea
                    id="content"
                    placeholder="Type or paste your text here..."
                    value={textContent}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="min-h-[200px] border-gray-200 focus:border-teal-400 focus:ring-teal-400 resize-none"
                    aria-label="Text content input"
                  />
                </div>

                <div className="flex flex-wrap gap-4 p-4 bg-teal-50/50 rounded-lg border border-teal-100">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="burn"
                      checked={burnAfterReading}
                      onChange={(e) => setBurnAfterReading(e.target.checked)}
                      className="rounded border-teal-300 text-teal-600 focus:ring-teal-500"
                    />
                    <Label
                      htmlFor="burn"
                      className="flex items-center gap-1 text-sm"
                    >
                      <Clock className="h-4 w-4 text-teal-600" />
                      Delete after reading
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="password"
                      checked={passwordProtected}
                      onChange={(e) => setPasswordProtected(e.target.checked)}
                      className="rounded border-teal-300 text-teal-600 focus:ring-teal-500"
                    />
                    <Label
                      htmlFor="password"
                      className="flex items-center gap-1 text-sm"
                    >
                      <Lock className="h-4 w-4 text-teal-600" />
                      Password protect
                    </Label>
                  </div>
                </div>

                {passwordProtected && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="passwordInput">Set Password</Label>
                    <Input
                      id="passwordInput"
                      type="password"
                      placeholder="Enter password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-gray-200 focus:border-teal-400 focus:ring-teal-400"
                      aria-label="Password for protected text"
                    />
                  </div>
                )}
                <div
                  className={`grid gap-3 pt-4 ${
                    hasActions ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1"
                  }`}
                >
                  {!hasActions && (
                    <Button
                      onClick={createShare}
                      disabled={loading}
                      className="bg-gradient-primary hover:from-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all"
                      aria-label="Create shareable link"
                    >
                      {loading ? (
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Link2 className="h-4 w-4 mr-2" />
                      )}
                      Create Link
                    </Button>
                  )}

                  {currentShareUrl && (
                    <>
                      <Button
                        onClick={() => handleAction("copy")}
                        variant="outline"
                        disabled={loading}
                        className="border-gray-200 hover:bg-teal-50 hover:border-teal-300 group"
                        aria-label="Copy share link"
                      >
                        <Copy className="h-4 w-4 mr-2 group-hover:text-teal-600" />
                        Copy Link
                      </Button>

                      <Button
                        onClick={() => handleAction("share")}
                        disabled={loading}
                        variant="outline"
                        className="border-gray-200 hover:bg-teal-50 hover:border-teal-300 group"
                        aria-label="Share via native share"
                      >
                        <Share className="h-4 w-4 mr-2 group-hover:text-teal-600" />
                        Share
                      </Button>

                      <Button
                        onClick={() => handleAction("qr")}
                        disabled={loading}
                        variant="outline"
                        className="border-gray-200 hover:bg-teal-50 hover:border-teal-300 group"
                        aria-label="Generate QR code"
                      >
                        <QrCode className="h-4 w-4 mr-2 group-hover:text-teal-600" />
                        QR Code
                      </Button>
                    </>
                  )}
                </div>

                {currentShareUrl && (
                  <div className="mt-4 p-2 bg-gray-50 rounded-lg flex items-center gap-2">
                    <code className="text-xs text-gray-700 flex-1 truncate">
                      {currentShareUrl}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(currentShareUrl);
                        // Note: Add toast like "URL copied"
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-gray-200 shadow-cus bg-gradient-to-br from-teal-50 to-coral-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Pro Tips
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Use "Delete after reading" for sensitive info</li>
                      <li>• Password protect confidential content</li>
                      <li>• Share QR codes for easy mobile access</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-cus">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <FileText className="h-5 w-5" />
                  Export Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-200 hover:bg-teal-50 justify-start"
                    onClick={() => {
                      const blob = new Blob([textContent], {
                        type: "text/plain",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "shared-text.txt";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Save as TXT
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-200 hover:bg-teal-50 justify-start"
                    disabled // Placeholder: PDF export requires additional setup
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-cus border border-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How to Share Text Online Safely & Instantly
                </h2>
                <p className="text-xl text-gray-600">
                  PicShare's text sharing tool makes it easy to share snippets,
                  notes, and messages securely
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    1. Paste Your Text
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Simply paste or type your text into the text box above.
                    Perfect for sharing quotes, notes, code snippets, or any
                    text content.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    2. Choose Security
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Add password protection for sensitive content or enable
                    "delete after reading" for one-time sharing.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    3. Share Instantly
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Get a shareable link, generate QR codes, or use native
                    sharing to send your text to anyone, anywhere.
                  </p>
                </div>
              </div>

              <ProTips />

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Perfect for sharing meeting notes, code snippets, quotes,
                  temporary passwords, or any text content that needs quick,
                  secure distribution.
                </p>
                <Button
                  className="bg-gradient-primary hover:from-teal-600 hover:to-teal-700"
                  onClick={() =>
                    document
                      .getElementById("text-share-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  aria-label="Scroll to text share section"
                >
                  Start Sharing Text Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        <CTA
          title="Ready to Share Your Thoughts?"
          description="Writers and bloggers love TextShare for its simple and elegant publishing experience."
          primary={{
            label: "Start Writing Now",
            icon: FileText,
            onClick: () => {
              document
                .getElementById("text-share-section")
                ?.scrollIntoView({ behavior: "smooth" });
            },
          }}
          secondary={{
            label: "Explore Blogs",
            icon: BookOpen,
            href: "/blogs",
          }}
        />

        <Dialog
          open={showQRModal}
          onOpenChange={(open) => {
            setShowQRModal(open);
            if (!open) setCurrentShareUrl(""); // Reset URL when closing modal
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-center justify-center">
                <QrCode className="h-5 w-5 text-teal-600" />
                Share via QR Code
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-6 py-6">
              <div className="bg-white p-6 rounded-2xl shadow-cus border-2 border-teal-100">
                {currentShareUrl ? (
                  <QRCodeSVG
                    value={currentShareUrl}
                    size={192}
                    level="H"
                    includeMargin={true}
                    aria-label="QR code for shared text link"
                  />
                ) : (
                  <p className="text-gray-500">Generating QR code...</p>
                )}
              </div>

              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Scan this QR code with any device to access your shared text
                </p>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 w-full max-w-xs overflow-hidden">
                  <code className="text-xs text-gray-700 flex-1 break-all">
                    {currentShareUrl || "No link generated"}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (currentShareUrl) {
                        navigator.clipboard.writeText(currentShareUrl);
                        // Note: Add toast like "URL copied"
                      }
                    }}
                    disabled={!currentShareUrl}
                    aria-label="Copy QR code link"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TextShare;
