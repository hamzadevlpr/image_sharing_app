'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Lock, Eye, Calendar, HardDrive, Users, FileText, Clock, Shield } from 'lucide-react';
import Image from 'next/image';
import { humanSize } from '@/helper/HumanSize';
import ClipLoader from 'react-spinners/ClipLoader';
import { DownloadPageSkeleton } from './Skeleton/DownloadPageSkeleton';

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
  const [metadata, setMetadata] = useState<FileMetadataResponse['data'] | null>(null);
  const [fileData, setFileData] = useState<FileDataResponse['data'] | null>(null);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await axios.get(`/api/cloud/file/${id}/metadata`);
        setMetadata(res.data.data);
        if (res.data.data.permission === "public") {
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
      const res = await axios.get(`/api/cloud/file/${id}`, {
        params: { password: enteredPassword },
      });
      setFileData(res.data);
      setIsPasswordVerified(true);
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Incorrect password');
      } else {
        toast.error('Failed to fetch file');
      }
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFileData(password);
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/cloud/download/${id}`, {
        responseType: "blob",
        params: { password: password || undefined },
      });
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

  if (!metadata) {
    return "Loading...";
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const showPasswordPrompt = metadata.permission === 'private' && !isPasswordVerified;
  const imageUrl = fileData?.url || '/placeholder.svg';

  const isExpired = fileData?.expiresAt && new Date(fileData.expiresAt) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* File Preview */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt="File preview"
                      className="w-full h-full object-cover"
                      width={400}
                      height={400}
                      onError={() => console.log("Image failed to load")}
                    />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 text-center truncate">
                  {fileData?.originalName}
                </h2>
              </CardContent>
            </Card>

            {/* File Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white border border-gray-100 shadow-sm rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Downloads</p>
                      <p className="text-lg font-semibold text-gray-900">{fileData?.downloadCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-100 shadow-sm rounded-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Size</p>
                      <p className="text-lg font-semibold text-gray-900">{formatFileSize(fileData?.size || 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* File Details & Actions */}
          <div className="space-y-6">
            {/* File Information */}
            <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">File Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Upload Date</span>
                    <span className="text-sm font-medium text-gray-900">
                      {fileData?.createdAt ? formatDate(new Date(fileData.createdAt)) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">File Type</span>
                    <span className="text-sm font-medium text-gray-900">{fileData?.storedName}</span>
                  </div>
                  {fileData?.expiresAt && (
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-gray-600">Expires</span>
                      <span className={`text-sm font-medium ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatDate(new Date(fileData?.expiresAt))}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Password Protection */}
            {showPasswordPrompt && !isPasswordVerified && (
              <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Password Required</h3>
                      <p className="text-sm text-gray-600">This file is password protected</p>
                    </div>
                  </div>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-3 rounded-lg transition-all duration-200"
                    >
                      Access File
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Download Section */}
            {(!showPasswordPrompt || isPasswordVerified) && !isExpired && (
              <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto">
                      <Download className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Download</h3>
                      <p className="text-sm text-gray-600">Click the button below to download your file</p>
                    </div>
                    <Button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Preparing Download...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download File
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Expiration Notice */}
            {isExpired && (
              <Card className="bg-red-50 border border-red-200 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-900">File Expired</h3>
                      <p className="text-sm text-red-700">This file has expired and is no longer available for download.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer Branding */}
        <div className="text-center py-8 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <FileText className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900">PicShare</span>
          </div>
          <p className="text-xs text-gray-500">Secure file sharing made simple</p>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
