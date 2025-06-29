"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, ExternalLink, CheckCircle, Upload, Eye } from "lucide-react";
import { useUpload } from "@/components/UploadProvider";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";

const ShareableLink: React.FC = () => {
  const { shareableLink, setStep, resetUpload } = useUpload();
  const [copied, setCopied] = useState(false);

  if (!shareableLink) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast("Link copied!", {
        description: "The shareable link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast("Copy failed", {
        description: "Unable to copy link to clipboard.",
      });
    }
  };

  const openLink = () => {
    window.open(shareableLink, "_blank");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg border border-gray-100 rounded-2xl overflow-hidden">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-teal-50 to-green-50 px-6 py-6 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Upload Successful!
            </h2>
            <p className="text-sm text-gray-600">
              Your image has been uploaded and is ready to share
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Shareable Link Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Shareable Link
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                value={shareableLink}
                readOnly
                className="pr-4 py-3 bg-gray-50 border-gray-200 text-sm font-mono text-gray-700 focus:border-teal-500 focus:ring-teal-500 rounded-lg"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className={`px-4 py-3 transition-all duration-200 ${copied
                ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                : 'hover:bg-teal-50 hover:border-teal-200 border-gray-200'
                }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openLink}
              className="px-4 py-3 hover:bg-blue-50 hover:border-blue-200 border-gray-200 transition-all duration-200"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <Button
            onClick={resetUpload}
            className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Another
          </Button>
          <Button
            variant="outline"
            onClick={openLink}
            className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-50 py-3 rounded-lg font-medium transition-all duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Image
          </Button>
        </div>
      </CardContent>

      {/* Success Animation */}
      {copied && (
        <div className="absolute top-4 right-4 animate-fade-in">
          <div className="bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium">
            Link copied to clipboard!
          </div>
        </div>
      )}
    </Card>
  );
};

export default ShareableLink;