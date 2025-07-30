
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

interface QRModalProps {
    open: boolean;
    url: string;
    onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ open, url, onClose }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {  
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    }
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center flex items-center gap-2">
                        <QrCode /> Share via QR Code
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-6 py-6">
                    <div className="bg-white p-6 rounded-2xl shadow-cus border-2 border-teal-100">
                        {url ? (
                            <QRCodeSVG value={url} size={192} level="H" includeMargin />
                        ) : (
                            <p className="text-gray-500">No link available</p>
                        )}
                    </div>

                    {url && (
                        <div className="flex items-start w-full bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 gap-2">
                            <code className="text-sm text-gray-700 break-all flex-1">{url}</code>
                            <Button
                                size="icon"
                                variant="outline"
                                className="mt-1"
                                onClick={handleCopy}
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-600 animate-pulse" />
                                ) : (
                                    <Copy className="h-4 w-4 group-hover:text-teal-600" />
                                )}
                            </Button>
                        </div>

                    )}

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QRModal;
