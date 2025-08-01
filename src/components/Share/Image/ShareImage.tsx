'use client'
import FileDropzone from '@/components/FileDropzone';
import FileUploadProgress from '@/components/FileUploadProgress';
import ShareableLink from '@/components/ShareableLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    ArrowRight,
    Eye,
    Image as ImageIcon,
    Lock,
    Share,
    Upload
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import FeatureCards from './FeatureCards';
import HowToShareImage from './HowToShareImage';
import CTA from './CTA';

const ImageShare = () => {
    // Updated type to include 'processing' status
    const [uploadedFiles, setUploadedFiles] = useState<Array<{
        file: File;
        progress: number;
        status: 'uploading' | 'processing' | 'completed' | 'error';
        shareableUrl?: string;
    }>>([]);
    const [shareableUrl, setShareableUrl] = useState<string | null>(null);
    const [passwordProtected, setPasswordProtected] = useState(false);
    const [password, setPassword] = useState('');

    const handleFileDrop = async (files: File[]) => {
        // Filter for image files only
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        // Create initial upload objects
        const newUploads = imageFiles.map(file => ({
            file,
            progress: 0,
            status: 'uploading' as const
        }));

        setUploadedFiles(newUploads);

        // Flag to set shareableUrl only for the first completed upload
        let firstUrlSet = false;

        // Define the progress steps for upload phase (0-90%)
        const steps = [20, 40, 60, 80];

        // Create an array of upload promises
        const uploadPromises = imageFiles.map(file => {
            const formData = new FormData();
            formData.append('file', file);

            return axios.post('/api/cloud/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const realProgress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        // Map real progress to steps, scaling to 0-90%
                        const stepProgress = steps.filter(step => step <= realProgress).pop() || 0;
                        const scaledProgress = (stepProgress / 100) * 90;
                        setUploadedFiles(prev =>
                            prev.map(item =>
                                item.file === file
                                    ? { ...item, progress: scaledProgress }
                                    : item
                            )
                        );
                    }
                }
            })
                .then(response => {
                    // Upload complete, switch to processing stage
                    setUploadedFiles(prev =>
                        prev.map(item =>
                            item.file === file
                                ? { ...item, progress: 90, status: 'processing' }
                                : item
                        )
                    );

                    // Simulate processing delay (remove if API handles this)
                    // For demonstration, assuming API response includes processing
                    const shareableUrl = response.data.downloadLink;

                    if (!firstUrlSet) {
                        setShareableUrl(`${process.env.NEXT_PUBLIC_HOST_URL}${shareableUrl}`);
                        firstUrlSet = true;
                    }

                    // Processing complete, set to 100%
                    setUploadedFiles(prev =>
                        prev.map(item =>
                            item.file === file
                                ? { ...item, progress: 100, status: 'completed', shareableUrl }
                                : item
                        )
                    );
                    return shareableUrl;
                })
                .catch(error => {
                    console.error('Upload failed:', error);
                    setUploadedFiles(prev =>
                        prev.map(item =>
                            item.file === file
                                ? { ...item, status: 'error' }
                                : item
                        )
                    );
                    throw error;
                });
        });

        // Wait for all uploads to complete
        try {
            await Promise.all(uploadPromises);
        } catch (error) {
            console.error('One or more uploads failed:', error);
        }
    };

    const handleUploadAnother = () => {
        setUploadedFiles([]);
        setShareableUrl(null);
    };

    const handleViewImage = () => {
        if (shareableUrl) {
            window.open(shareableUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-cus">
                        <ImageIcon className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Share Images
                        <span className="bg-gradient-to-r from-teal-600 to-coral-500 bg-clip-text text-transparent block">
                            Securely & Instantly
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Upload your images and get shareable links instantly. Perfect for photographers, designers,
                        and anyone who needs to share high-quality images quickly and securely.
                    </p>
                </div>

                {/* Main Upload Section */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    <div className="lg:col-span-2">
                        <Card className="shadow-cus border-0 overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-teal-50 to-coral-50 border-b border-gray-100">
                                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                                    <Upload className="h-6 w-6 mr-3 text-teal-600" />
                                    Upload Your Images
                                </CardTitle>
                                <p className="text-gray-600 mt-2">
                                    Drag and drop your images or click to browse. Supports JPG, PNG, GIF, WebP and more.
                                </p>
                            </CardHeader>
                            <CardContent className="p-8">
                                {!shareableUrl ? (
                                    <div className="space-y-6">
                                        <FileDropzone onFileDrop={handleFileDrop} />

                                        {uploadedFiles.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-gray-900">Upload Progress</h3>
                                                {uploadedFiles.map((upload, index) => (
                                                    <FileUploadProgress
                                                        key={index}
                                                        fileName={upload.file.name}
                                                        progress={upload.progress}
                                                        status={upload.status}
                                                        fileSize={`${(upload.file.size / 1024 / 1024).toFixed(2)} MB`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <ShareableLink
                                        shareableUrl={shareableUrl}
                                        onUploadAnother={handleUploadAnother}
                                        onViewImage={handleViewImage}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Feature Cards */}
                    <FeatureCards />
                </div>

                {/* How to Share Images Section */}
                <HowToShareImage />

                {/* CTA Section */}
                <CTA
                    title="Ready to Share Your Images?"
                    description="Join thousands of photographers, designers, and content creators who trust PicShare for their image sharing needs."
                    primary={{
                        label: 'Start Sharing Images',
                        icon: ImageIcon,
                        onClick: () => {
                            document.querySelector('.file-dropzone')?.scrollIntoView({ behavior: 'smooth' })
                        },
                    }}
                    secondary={{
                        label: 'View All Services',
                        icon: Eye,
                        href: '/services',
                    }}
                />
            </div>
        </div>
    );
};

export default ImageShare;