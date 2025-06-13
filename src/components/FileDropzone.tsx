import React, { useCallback, useState } from "react";
import { Upload, Image } from "lucide-react";
import { useUpload } from "@/components/UploadProvider";
import { toast } from "sonner";

const FileDropzone: React.FC = () => {
  const { setUploadFile } = useUpload();
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      toast("Invalid file type. Please upload an image.", {
        description: "Supported formats: JPG, PNG, GIF, WebP",
      });
      return null;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast("File size exceeds 5MB limit.", {
        description: "Please upload a smaller image.",
      });
      return null;
    }
    return null;
  };

  const handleFile = useCallback(
    (file: File) => {
      const error = validateFile(file);
      if (error) {
        console.error("File validation error:", error);
        return;
      }

      const preview = URL.createObjectURL(file);
      setUploadFile({
        file,
        preview,
        progress: 0,
        error: undefined,
      });
    },
    [setUploadFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
        isDragging
          ? "border-blue-400 bg-blue-50"
          : "border-slate-300 bg-white hover:border-blue-300 hover:bg-slate-50"
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isDragging ? "bg-blue-100" : "bg-slate-100"
          }`}
        >
          {isDragging ? (
            <Image className="w-8 h-8 text-blue-500" />
          ) : (
            <Upload className="w-8 h-8 text-slate-500" />
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-1">
            {isDragging ? "Drop your image here" : "Drag & drop your image"}
          </h3>
          <p className="text-slate-500 mb-4">or click to browse files</p>

          <label className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>

        <div className="text-xs text-slate-400 space-y-1">
          <p>Supported formats: JPG, PNG, GIF, WebP</p>
          <p>Maximum file size: 5MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileDropzone;
