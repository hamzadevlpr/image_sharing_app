import React, { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import ImagePreview from "@/components/ImagePreview";
import MetadataForm from "@/components/MetadataForm";
import PermissionSelector from "@/components/PermissionSelector";
import UploadButton from "@/components/UploadButton";
import ShareableLink from "@/components/ShareableLink";
import { useUpload } from "@/components/UploadProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const UploadArea: React.FC = () => {
  const { uploadFile, shareableLink } = useUpload();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Upload Your Image
        </h2>
        <p className="text-slate-600">
          Share your high-resolution images with the world
        </p>
      </div>

      <div className="mb-6">
        {/* Simple Stepper Indicator */}
        <div className="flex justify-center space-x-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                s === step
                  ? "bg-blue-600 text-white"
                  : "border-slate-300 text-slate-500"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`grid ${
          shareableLink ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        } gap-8`}
      >
        {/* Left Column */}
        <div className="space-y-6">
          {shareableLink ? (
            <>
              <ShareableLink />
            </>
          ) : !uploadFile ? (
            <FileDropzone />
          ) : (
            <ImagePreview />
          )}
        </div>

        {/* Right Column */}
        {!shareableLink && (
          <div className="space-y-6 relative">
            {step === 1 && <MetadataForm />}
            {step === 2 && <PermissionSelector />}
            {step === 3 && <UploadButton />}

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              {step > 1 && (
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 "
                  size="lg"
                >
                  <ArrowLeft className="inline-block" size={16} />{" "}
                  <span>Back</span>
                </Button>
              )}
              {step < 3 && (
                <Button
                  onClick={nextStep}
                  disabled={step === 1 && !uploadFile}
                  variant="outline"
                  size="lg"
                  className="bg-blue-600 !text-white hover:bg-blue-700 flex-1"
                >
                  <span>Next</span>
                  <ArrowRight className="inline-block" size={16} />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadArea;
