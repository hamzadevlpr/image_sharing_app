import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
}

const VideoModal = ({ isOpen, onClose, videoId }: VideoModalProps) => {
    // Stop video when modal closes
    useEffect(() => {
        if (!isOpen) {
            // Small delay to ensure smooth close animation
            const timer = setTimeout(() => {
                const iframe = document.querySelector('#youtube-player') as HTMLIFrameElement;
                if (iframe) {
                    iframe.src = iframe.src; // This stops the video
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl w-full p-0 bg-black border-0 animate-scale-in">
                <DialogTitle className="sr-only"> PicShare Demo Video</DialogTitle>
                <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white p-2 transition-colors">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close video</span>
                </DialogClose>

                <div className="relative aspect-video w-full">
                    <iframe
                        id="youtube-player"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                        title="PicShare Demo Video"
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VideoModal;