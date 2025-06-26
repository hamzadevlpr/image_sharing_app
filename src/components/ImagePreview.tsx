import React, { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { useUpload } from "@/components/UploadProvider";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { humanSize } from "@/helper/HumanSize";
import { Button } from "./ui/button";
import AdvertiseBanner from "./AdvertiseBanner";

const ImagePreview: React.FC = () => {
  const { uploadFile, setUploadFile, isUploading } = useUpload();
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!uploadFile) return null;

  const handleRemove = () => {
    setUploadFile(null);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 h-full flex flex-col justify-between">
      {isUploading && (
        <div className="space-y-2 mb-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Upload progress:</span>
            <span className="text-slate-800 font-medium">
              {uploadFile.progress}%
            </span>
          </div>
          <Progress value={uploadFile.progress} className="h-2" />
        </div>
      )}

      {uploadFile.error && (
        <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{uploadFile.error}</p>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-slate-800 flex items-center">
            <ImageIcon className="w-5 h-5 mr-2" />
            Image Preview
          </h3>
          {!isUploading && (
            <Button
              variant="ghost"
              onClick={handleRemove}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden mb-6 shadow-inner relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}
            <Image
              src={uploadFile.preview}
              alt="Preview"
              className="w-full h-full object-cover"
              width={300}
              height={600}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">File name:</span>
              <span className="text-slate-800 font-medium truncate ml-2">
                {uploadFile.file.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">File size:</span>
              <span className="text-slate-800 font-medium">
                {humanSize(uploadFile.file.size)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 space-y-2 text-sm text-slate-600 mt-4">
        <h4 className="font-medium text-slate-800">Image Info</h4>
        <div className="flex justify-between">
          <span>Type:</span>
          <span>{uploadFile.file.type}</span>
        </div>
        <div className="flex justify-between">
          <span>Uploaded:</span>
          <span>
            {(() => {
              const date = new Date();
              const now = new Date();
              const isToday =
                date.getDate() === now.getDate() &&
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear();

              const hours = date.getHours();
              const minutes = date.getMinutes().toString().padStart(2, "0");
              const ampm = hours >= 12 ? "pm" : "am";
              const hour12 = hours % 12 === 0 ? 12 : hours % 12;

              return isToday
                ? `Today at ${hour12}:${minutes} ${ampm}`
                : `${date.toLocaleDateString()} at ${hour12}:${minutes} ${ampm}`;
            })()}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemove}
          className="mt-2 w-full"
        >
          Replace Image
        </Button>
      </div>
      <AdvertiseBanner />
    </div>
  );
};

export default ImagePreview;
