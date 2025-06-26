'use client';
import UploadArea from "@/components/UploadArea";
import UploadHeader from "@/components/UploadHeader";
import UploadProvider from "@/components/UploadProvider";

export default function page() {
  return (
    <UploadProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <UploadHeader />
        <main className="container mx-auto px-4 py-8">
          <UploadArea />
        </main>
      </div>
    </UploadProvider>
  );
}
