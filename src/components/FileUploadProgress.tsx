import React from "react";
import { Check, Loader, File } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FileUploadProgressProps {
  fileName: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  fileSize: string;
}

const FileUploadProgress: React.FC<FileUploadProgressProps> = ({
  fileName,
  progress,
  status,
  fileSize,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            status === "completed"
              ? "bg-green-100"
              : status === "error"
              ? "bg-red-100"
              : "bg-blue-100"
          }`}
        >
          {status === "completed" ? (
            <Check className="h-5 w-5 text-green-600 animate-scale-in" />
          ) : status === "error" ? (
            <File className="h-5 w-5 text-red-600" />
          ) : (
            <Loader className="h-5 w-5 text-blue-600 animate-spin" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {fileName}
            </p>
            <span className="text-xs text-gray-500 ml-2">{fileSize}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Progress value={progress} className="flex-1 h-2" />
            <span className="text-xs font-medium text-gray-600 min-w-[3rem]">
              {status === "completed" ? "Done!" : `${Math.round(progress)}%`}
            </span>
          </div>

          {status === "completed" && (
            <p className="text-xs text-green-600 mt-1 animate-fade-in">
              Upload successful! File is ready to share.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadProgress;
