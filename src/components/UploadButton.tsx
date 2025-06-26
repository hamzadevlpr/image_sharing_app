import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, Circle, Loader2 } from "lucide-react";
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
      console.log("Uploading file:", formData); 
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
        setShareableLink(
          `${process.env.NEXT_PUBLIC_VERCEL_URl}${data.downloadLink}`
        );
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
  const borderProgress = uploadFile?.progress || 0;
  return (
    <div
      className="bg-white rounded-2xl p-6 border relative shadow-sm space-y-5"
      style={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderImageSource: `conic-gradient(#3b82f6 ${borderProgress}%, #e2e8f0 ${borderProgress}%)`,
        borderImageSlice: 1,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-slate-800">
          Final Step: Upload Your Image
        </h3>
        {uploadFile && metadata.title.trim() && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        <StatusRow label="Image selected" success={!!uploadFile} />
        <StatusRow label="Title provided" success={!!metadata.title.trim()} />
        <StatusRow
          label="Permission set"
          success={!!permission}
          value={permission}
        />
      </div>

      <Button
        onClick={handleUpload}
        disabled={!canUpload}
        variant="primary"
        className="w-full"
      >
        {isUploading ? (
          <div className="flex items-center">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
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
  );
};

const StatusRow = ({
  label,
  success,
  value,
}: {
  label: string;
  success: boolean;
  value?: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <span>{label}:</span>
      {success ? (
        <span className="flex items-center space-x-1 text-green-600">
          <CheckCircle className="w-4 h-4" />
          {value && <span className="capitalize">{value}</span>}
        </span>
      ) : (
        <span className="flex items-center space-x-1 text-slate-400">
          <Circle className="w-3 h-3" />
          <span>Pending</span>
        </span>
      )}
    </div>
  );
};

export default UploadButton;
