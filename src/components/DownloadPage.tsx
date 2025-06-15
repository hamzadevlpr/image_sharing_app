"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Lock, Eye, Calendar, HardDrive, Users } from "lucide-react";
import Image from "next/image";
import { humanSize } from "@/helper/HumanSize";
import ClipLoader from "react-spinners/ClipLoader";

interface FileMetadataResponse {
  success: boolean;
  data: {
    originalName: string;
    size: number;
    downloadCount: number;
    createdAt: string;
    expiresAt: string;
    permission: "public" | "private";
  };
}

interface FileDataResponse {
  success: boolean;
  data: {
    originalName: string;
    size: number;
    downloadCount: number;
    storedName: string;
    createdAt: string;
    expiresAt: string;
    url: string;
  };
}

const DownloadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [metadata, setMetadata] = useState<FileMetadataResponse["data"] | null>(
    null
  );
  const [fileData, setFileData] = useState<FileDataResponse["data"] | null>(
    null
  );
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accessLoading, setAccessLoading] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await axios.get(
          `/api/cloud/file/${id}/metadata`
        );
        setMetadata(res.data.data);
        if (res.data.data.permission === "public") {
          // directly fetch file data for public files
          fetchFileData();
        }
      } catch (err) {
        toast.error("File not found");
      }
    };
    fetchMetadata();
  }, [id]);

  const fetchFileData = async (enteredPassword?: string) => {
    try {
      setAccessLoading(true);
      const res = await axios.get(
        `/api/cloud/file/${id}`,
        {
          params: { password: enteredPassword },
        }
      );
      setFileData(res.data);
      setIsPasswordVerified(true);
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error("Incorrect password");
      } else {
        toast.error("Failed to fetch file");
      }
    } finally {
      setAccessLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFileData(password);
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/api/cloud/download/${id}`,
        {
          responseType: "blob",
          params: { password: password || undefined },
        }
      );
      const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileData?.originalName || "file");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      toast.error("Failed to download file.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!metadata)
    return <div className="text-center mt-20 text-lg">Loading...</div>;

  const showPasswordPrompt =
    metadata.permission === "private" && !isPasswordVerified;
  const imageUrl = fileData?.url || "/placeholder.svg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-0">
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden mb-6 shadow-inner">
              <Image
                src={imageUrl || '/placeholder.svg'}
                alt="File preview"
                className="w-full h-full object-cover"
                width={640}
                height={360}
                onError={() => console.log("Image failed to load")}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold text-slate-800 break-all">
                {metadata.originalName}
              </h1>
              <p className="text-slate-500">Ready for download</p>
            </div>

            {!isPasswordVerified && showPasswordPrompt ? (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-medium text-slate-700 mb-2">
                    This file is password protected
                  </h2>
                  <p className="text-slate-500">
                    Enter the password to access the file
                  </p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-700">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {
                      accessLoading ? (
                        <span className="flex items-center space-x-2">
                          <ClipLoader
                            size={20}
                            color="#ffffff"
                          />
                        </span>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Access File
                        </>
                      )}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center space-x-3">
                    <HardDrive className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-500">File Size</p>
                      <p className="font-medium text-slate-800">
                        {humanSize(fileData?.size || metadata.size)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 flex items-center space-x-3">
                    <Users className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-500">Downloads</p>
                      <p className="font-medium text-slate-800">
                        {fileData?.downloadCount || metadata.downloadCount}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-500">Uploaded</p>
                      <p className="font-medium text-slate-800">
                        {fileData?.createdAt
                          ? new Date(fileData.createdAt).toLocaleString()
                          : new Date(metadata.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-slate-500">Expires</p>
                      <p className="font-medium text-slate-800">
                        {fileData?.expiresAt
                          ? new Date(fileData.expiresAt).toLocaleString()
                          : new Date(metadata.expiresAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleDownload}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {
                    isLoading ? (
                      <span className="flex items-center space-x-2">
                        <ClipLoader
                          size={20}
                          color="#ffffff"
                        />
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <Download className="w-5 h-5" />
                        <span>Download File</span>
                      </span>
                    )
                  }
                </Button>

                <div className="text-center text-sm text-slate-500 bg-slate-50 rounded-lg p-4">
                  <p>
                    This download link will expire on{" "}
                    {fileData?.expiresAt
                      ? new Date(fileData.expiresAt).toLocaleString()
                      : new Date(metadata.expiresAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by PixPort - Secure File Sharing</p>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
