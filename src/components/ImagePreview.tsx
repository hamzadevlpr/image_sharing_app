import React from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { useUpload } from "@/components/UploadProvider";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { humanSize } from "@/helper/HumanSize";

const ImagePreview: React.FC = () => {
  const { uploadFile, setUploadFile, isUploading } = useUpload();

  if (!uploadFile) return null;

  const handleRemove = () => {
    if (uploadFile.preview) {
      URL.revokeObjectURL(uploadFile.preview);
    }
    setUploadFile(null);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-slate-800 flex items-center">
          <ImageIcon className="w-5 h-5 mr-2" />
          Image Preview
        </h3>
        {!isUploading && (
          <button
            onClick={handleRemove}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center w-full">
          <Image
            src={uploadFile.preview}
            alt="Preview"
            className="max-w-full max-h-full object-cover"
            width={300}
            height={600}
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

        {isUploading && (
          <div className="space-y-2">
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
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{uploadFile.error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
