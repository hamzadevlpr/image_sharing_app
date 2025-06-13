"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useUpload } from "@/components/UploadProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ShareableLink: React.FC = () => {
  const { shareableLink } = useUpload();
  const [copied, setCopied] = useState(false);
  const router = useRouter();

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
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
      <div className="space-y-4">
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="text-lg font-medium text-slate-800">
            Upload Complete!
          </h3>
        </div>

        <p className="text-slate-600">
          Your image has been uploaded successfully. Share it with others using
          the link below:
        </p>

        <div className="flex gap-2">
          <Input
            value={shareableLink}
            readOnly
            className="flex-1 bg-white border-slate-200 rounded-lg"
          />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="px-3 border-slate-200 hover:bg-slate-50"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
          <Button
            onClick={openLink}
            variant="outline"
            className="px-3 border-slate-200 hover:bg-slate-50"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => {
              router.push("/");
            }}
            variant="outline"
            className="flex-1"
          >
            Upload Another
          </Button>
          <Button
            onClick={openLink}
            className="flex-1 bg-blue-500 hover:bg-blue-600"
          >
            View Image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareableLink;
