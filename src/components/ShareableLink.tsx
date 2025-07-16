"use client";

import React, { useState } from 'react';
import { CheckCircle, Copy, ExternalLink, Upload, Eye, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {QRCodeCanvas} from 'qrcode.react';

interface ShareableLinkProps {
  shareableUrl: string;
  onUploadAnother: () => void;
  onViewImage: () => void;
}

const ShareableLink: React.FC<ShareableLinkProps> = ({
  shareableUrl,
  onUploadAnother,
  onViewImage,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleOpenLink = () => {
    window.open(shareableUrl, '_blank', 'noopener,noreferrer');
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
            Scan to Share
          </label>
          <div className="flex justify-center">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <QRCodeCanvas
                value={shareableUrl}
                size={160}
                level="H"
                includeMargin={true}
                className="animate-fade-in"
                aria-label="QR code for shareable link"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Scan this QR code with your phone to access the image.
          </p>
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Shareable Link
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                value={shareableUrl}
                readOnly
                className="pr-4 py-3 bg-gray-50 border-gray-200 text-sm font-mono text-gray-700 focus:border-teal-500 focus:ring-teal-500 rounded-lg"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
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
              onClick={handleOpenLink}
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
            onClick={onUploadAnother}
            className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Another
          </Button>
          <Button
            variant="outline"
            onClick={onViewImage}
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