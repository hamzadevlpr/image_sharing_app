import React, { createContext, useContext, useState, ReactNode } from "react";

interface UploadFile {
  file: File;
  preview: string;
  progress: number;
  error?: string;
}

interface UploadContextType {
  step: number;
  setStep: (step: number) => void;
  uploadFile: UploadFile | null;
  setUploadFile: (file: UploadFile | null) => void;
  metadata: {
    category: string | undefined;
    title: string;
    description: string;
    tags: string[];
    expiresIn?: number;
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
  allowedEmails: string[];
  setAllowedEmails: (emails: string[]) => void;
  allowLinkAccess: boolean;
  setAllowLinkAccess: (allow: boolean) => void;
  resetUpload: () => void;
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
    category: undefined,
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
  const [allowedEmails, setAllowedEmails] = useState<string[]>([]);
  const [allowLinkAccess, setAllowLinkAccess] = useState<boolean>(false);
  const [step, setStep] = useState(1);

  const resetUpload = () => {
    setUploadFile(null);
    setShareableLink(null);
    setAllowedEmails([]);
    setAllowLinkAccess(false);
    setPassword("");
    setStep(1);
  };

  return (
    <UploadContext.Provider
      value={{
        step,
        setStep,
        uploadFile,
        setUploadFile,
        metadata,
        setMetadata,
        permission,
        setPermission,
        isUploading,
        setIsUploading,
        shareableLink,
        setShareableLink,
        password,
        setPassword,
        allowedEmails,
        setAllowedEmails,
        allowLinkAccess,
        setAllowLinkAccess,
        resetUpload,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadProvider;
