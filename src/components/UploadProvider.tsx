import React, { createContext, useContext, useState, ReactNode } from "react";

interface UploadFile {
  file: File;
  preview: string;
  progress: number;
  error?: string;
}

interface UploadContextType {
  uploadFile: UploadFile | null;
  setUploadFile: (file: UploadFile | null) => void;
  metadata: {
    title: string;
    description: string;
    tags: string[];
    expiresIn?: number; // in seconds
    password?: string;
  };
  setMetadata: (metadata: any) => void;
  permission: "public" | "private" | "restricted";
  setPermission: (permission: "public" | "private" | "restricted") => void;
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
  shareableLink: string | null;
  password: string;
  setPassword: (password: string) => void;
  setShareableLink: (link: string | null) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within UploadProvider");
  }
  return context;
};

interface UploadProviderProps {
  children: ReactNode;
}

const UploadProvider: React.FC<UploadProviderProps> = ({ children }) => {
  const [uploadFile, setUploadFile] = useState<UploadFile | null>(null);
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    tags: [],
  });
  const [permission, setPermission] = useState<
    "public" | "private" | "restricted"
  >("public");
  const [isUploading, setIsUploading] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [shareableLink, setShareableLink] = useState<string | null>(null);

  return (
    <UploadContext.Provider
      value={{
        uploadFile,
        password,
        setPassword,
        setUploadFile,
        metadata,
        setMetadata,
        permission,
        setPermission,
        isUploading,
        setIsUploading,
        shareableLink,
        setShareableLink,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadProvider;
