import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";
import { useUpload } from "@/components/UploadProvider";
import { toast } from "sonner";
import axios from "axios";

const UploadButton: React.FC = () => {
  const {
    uploadFile,
    setUploadFile,
    metadata,
    permission,
    isUploading,
    setIsUploading,
    setShareableLink,
    password,
  } = useUpload();

  const canUpload = uploadFile && metadata.title.trim() && !isUploading;

  const handleUpload = async () => {
    if (!uploadFile) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadFile.file);
      formData.append("title", metadata.title);
      formData.append("description", metadata.description || "");
      formData.append("isPublic", permission === "public" ? "true" : "false");
      formData.append("expiresIn", metadata.expiresIn?.toString() || "86400");
      formData.append("password", password || "");

      const response = await axios.post(`/api/cloud/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 50) / (progressEvent.total || 1)
          );
          setUploadFile({
            ...uploadFile,
            progress: percentCompleted,
          });
        },
      });

      const data = response.data;

      setUploadFile({
        ...uploadFile,
        progress: 100,
      });
      if (data.success) {
        setShareableLink(`${process.env.NEXT_PUBLIC_VERCEL_URl}${data.downloadLink}`);
        toast("Upload successful!", {
          description: "Your image has been uploaded and is ready to share.",
        });
      } else {
        throw new Error("Upload failed on server.");
      }
    } catch (error) {
      setUploadFile({
        ...uploadFile,
        error: "Upload failed. Please try again.",
      });

      toast("Upload failed", {
        description:
          "There was an error uploading your image. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800">
            Ready to Upload?
          </h3>
          {uploadFile && metadata.title.trim() && (
            <Check className="w-5 h-5 text-green-500" />
          )}
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Image selected:</span>
            <span className={uploadFile ? "text-green-600" : "text-slate-400"}>
              {uploadFile ? "✓" : "○"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Title provided:</span>
            <span
              className={
                metadata.title.trim() ? "text-green-600" : "text-slate-400"
              }
            >
              {metadata.title.trim() ? "✓" : "○"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Permission set:</span>
            <span className="text-green-600 capitalize">{permission}</span>
          </div>
        </div>

        <Button
          onClick={handleUpload}
          disabled={!canUpload}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500 rounded-lg py-3 text-base font-medium transition-all duration-200"
        >
          {isUploading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Uploading...
            </div>
          ) : (
            <div className="flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Upload Now
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadButton;
