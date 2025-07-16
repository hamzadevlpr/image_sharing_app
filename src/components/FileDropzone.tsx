
import React, { useState, useRef } from 'react';
import { Upload, File, Image, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileDropzoneProps {
  onFileDrop: (files: File[]) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileDrop }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileDrop(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileDrop(files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${isDragOver
          ? 'border-teal-400 bg-teal-50 scale-105'
          : 'border-gray-300 bg-gray-50 hover:border-teal-300 hover:bg-teal-25'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        accept="*/*"
      />

      <div className="space-y-4">
        {/* Animated Upload Icon */}
        <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-teal-100 flex items-center justify-center transition-transform duration-300 ${isDragOver ? 'scale-110 rotate-6' : 'hover:scale-105'
          }`}>
          <Upload className={`h-8 w-8 text-teal-600 transition-transform duration-500 ${isDragOver ? 'animate-bounce' : ''
            }`} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isDragOver ? 'Drop your files here!' : 'Drag & drop your files'}
          </h3>
          <p className="text-gray-600 mb-4">
            or <button onClick={openFileDialog} className="text-teal-600 hover:text-blue-700 font-medium underline">browse from your device</button>
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-4">
          <div className="flex items-center space-x-2 text-gray-500">
            <FileText className="h-5 w-5" />
            <span className="text-sm">Documents</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Image className="h-5 w-5" />
            <span className="text-sm">Images</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <File className="h-5 w-5" />
            <span className="text-sm">Any file</span>
          </div>
        </div>

        <Button
          onClick={openFileDialog}
          className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Upload className="h-4 w-4 mr-2" />
          Choose Files
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          Maximum file size: 100MB • Supported formats: All file types
        </p>
      </div>

      {/* Subtle animation overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-100/50 rounded-2xl border-2 border-blue-400 animate-pulse"></div>
      )}
    </div>
  );
};

export default FileDropzone;